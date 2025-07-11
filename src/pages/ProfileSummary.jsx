import { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProfileSummary = () => {
  const [profile, setProfile] = useState({ full_name: '', email: '', avatar_url: '' });
  const [posts, setPosts] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) return;

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile({
        full_name: profileData?.full_name || '',
        email: user.email || '',
        avatar_url: profileData?.avatar_url || 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg',
      });

      const { data: userPosts } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setPosts(userPosts || []);

      const { data: joined } = await supabase
        .from('user_communities')
        .select('community_id, communities(name)')
        .eq('user_id', user.id);

      setJoinedCommunities(joined?.map(j => j.communities?.name) || []);
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) window.location.href = '/login';
  };

  const handleDelete = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) return;

    if (!window.confirm('Are you sure you want to delete your profile data?')) return;

    const { error: profileDeleteError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', user.id);

    if (profileDeleteError) {
      alert('❌ Failed to delete profile data.');
      return;
    }

    alert('✅ Profile deleted.');
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-28 px-4 pb-16 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow relative">
          <h2 className="text-2xl font-bold text-[#7c3aed] mb-6 text-center">Profile Summary</h2>

          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#7c3aed]">
              <img
                src={profile.avatar_url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Full Name & Email */}
          <div className="mb-6 text-center space-y-1">
            <p className="text-xl font-semibold text-[#333]">{profile.full_name}</p>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>

          {joinedCommunities.length > 0 && (
            <div className="mb-6 text-center">
              <p className="text-md text-gray-600">
                🧩 Joined Communities: {joinedCommunities.join(', ')}
              </p>
            </div>
          )}

          {/* 3-dot menu */}
          <div className="absolute top-4 right-4" ref={menuRef}>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl">⋮</button>
            {menuOpen && (
              <div className="flex flex-col absolute right-0 top-6 bg-white border shadow rounded text-sm w-40 z-10 text-left">
                <a href="/profile" className="px-4 py-2 pl-4 hover:bg-gray-100">Edit Profile</a>
                <button onClick={handleLogout} className="px-4 py-2 pl-4 text-left hover:bg-gray-100">Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* User Posts */}
        <div className="max-w-7xl mx-auto mt-10 px-4">
          <h3 className="text-2xl font-bold mb-6 text-[#7c3aed]">📌 Your Posts</h3>

          {posts.length === 0 ? (
            <p className="text-gray-600">You haven't posted anything yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <div
                  key={post.id}
                  className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Post Image */}
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt="Post"
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      No Image
                    </div>
                  )}

                  {/* Post Content */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">{post.caption}</h4>
                    <p className="text-sm text-gray-600 flex-grow">{post.description}</p>

                    <div className="mt-3 text-xs text-gray-500 space-y-1">
                      <p><strong>Skill:</strong> {post.skill}</p>
                      <p><strong>Mood:</strong> {post.mood}</p>
                      <p><strong>Duration:</strong> {post.duration}</p>
                      <p><strong>Posted:</strong> {new Date(post.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileSummary;
