import { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProfileSummary = () => {
  const [profile, setProfile] = useState({ full_name: '', email: '' });
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

  // 👉 Close dropdown if clicked outside
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

          <div className="mb-6 space-y-2">
            <p className="text-lg font-semibold">👤 Full Name: {profile.full_name}</p>
            <p className="text-md text-gray-600">📧 Email: {profile.email}</p>
            {joinedCommunities.length > 0 && (
              <p className="text-md text-gray-600">
                🧩 Joined Communities: {joinedCommunities.join(', ')}
              </p>
            )}
          </div>

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
        <div className="max-w-3xl mx-auto mt-8">
          <h3 className="text-xl font-semibold mb-4">📌 Your Posts</h3>
          {posts.length === 0 ? (
            <p className="text-gray-600">You haven't posted anything yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {posts.map(post => (
                <div key={post.id} className="bg-white p-4 rounded-lg shadow">
                  <h4 className="text-lg font-semibold mb-1">{post.caption}</h4>
                  <p className="text-sm text-gray-700 mb-2">{post.description}</p>
                  {post.media_url && (
                    <img
                      src={post.media_url}
                      alt="Post"
                      className="w-full h-48 object-cover rounded mb-2"
                    />
                  )}
                  <div className="text-xs text-gray-500">
                    <p><strong>Skill:</strong> {post.skill}</p>
                    <p><strong>Mood:</strong> {post.mood}</p>
                    <p><strong>Duration:</strong> {post.duration}</p>
                    <p>{new Date(post.created_at).toLocaleString()}</p>
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
