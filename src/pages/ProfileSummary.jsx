  import { useEffect, useRef, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { supabase } from '../supabaseClient';
  import Header from '../components/Header';
  import Footer from '../components/Footer';
  import CreatePostModal from './CreatePostModal';
  import SaveIcon from '../assets/icons/save.png';
  import SaveFilledIcon from '../assets/icons/save-filled.png';

  const ProfileSummary = () => {
    const [profile, setProfile] = useState({ full_name: '', email: '', avatar_url: '' });
    const [posts, setPosts] = useState([]);
    const [projects, setProjects] = useState([]);
    const [joinedCommunities, setJoinedCommunities] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [savedPostIds, setSavedPostIds] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

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

        const { data: userProjects } = await supabase
          .from('projects')
          .select('*')
          .eq('creator_id', user.id);

        setProjects(userProjects || []);

        const { data: joined } = await supabase
          .from('user_communities')
          .select('community_id, communities(name)')
          .eq('user_id', user.id);

        setJoinedCommunities(joined?.map(j => j.communities?.name) || []);

        const { data: savedData } = await supabase
          .from('saved_posts')
          .select('post_id, posts(*, profiles(full_name, avatar_url))')
          .eq('user_id', user.id);

        const savedList = savedData?.map(item => item.posts) || [];
        setSavedPosts(savedList);
        setSavedPostIds(savedData?.map(item => item.post_id) || []);
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

    const handleDeleteProject = async (projectId) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this project?');
      if (!confirmDelete) return;

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) {
        alert('❌ Failed to delete the project.');
        console.error(error);
      } else {
        alert('✅ Project deleted successfully.');
        setProjects(prev => prev.filter(p => p.id !== projectId));
      }
    };

    const handleEditPost = (post) => {
      setEditingPost(post);
      setIsModalOpen(true);
    };

    return (
      <>
        <Header />
        <div className="min-h-screen pt-28 px-4 pb-16 bg-gray-50">
          <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow relative">
            <h2 className="text-2xl font-bold text-[#7c3aed] mb-6 text-center">Profile Summary</h2>

            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#7c3aed]">
                <img
                  src={profile.avatar_url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

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

          <div className="max-w-7xl mx-auto mt-10 px-4">
            <h3 className="text-2xl font-bold mb-6 text-[#7c3aed]">📌 Your Posts</h3>
            {posts.length === 0 ? (
              <p className="text-gray-600">You haven't posted anything yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                  <div key={post.id} className="bg-white border rounded-xl shadow p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={profile.avatar_url} className="w-8 h-8 rounded-full" alt="Avatar" />
                        <span className="font-medium">{profile.full_name}</span>
                      </div>
                      <PostMenu post={post} onEditPost={handleEditPost} />
                    </div>
                    {post.image_url ? (
                      <img src={post.image_url} alt="Post" className="mt-2 h-40 w-full object-cover rounded" />
                    ) : (
                      <div className="h-40 flex items-center justify-center bg-gray-100 text-gray-400">No Image</div>
                    )}
                    <h4 className="mt-3 text-lg font-semibold">{post.title}</h4>
                    <p className="text-sm text-gray-600">{post.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="max-w-7xl mx-auto mt-16 px-4">
            <h3 className="text-2xl font-bold mb-6 text-[#7c3aed]">🔖 Saved Posts</h3>
            {savedPosts.length === 0 ? (
              <p className="text-gray-600">You haven’t saved any posts yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPosts.map(post => (
                  <div key={post.id} className="bg-white border rounded-xl shadow p-3">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={post.profiles?.avatar_url || ''} className="w-8 h-8 rounded-full" alt="user" />
                      <span className="font-medium">{post.profiles?.full_name}</span>
                    </div>
                    {post.image_url ? (
                      <img src={post.image_url} alt="Post" className="h-40 w-full object-cover rounded" />
                    ) : (
                      <div className="h-40 flex items-center justify-center bg-gray-100 text-gray-400">No Image</div>
                    )}
                    <h4 className="mt-3 text-lg font-semibold">{post.title}</h4>
                    <p className="text-sm text-gray-600">{post.caption}</p>
                    <p className="text-xs text-gray-500 mt-1">🎯 {post.skill} | 🕒 {post.duration} min | 😄 {post.mood}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Footer />

        <CreatePostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          existingPost={editingPost}
        />
      </>
    );
  };

  export default ProfileSummary;

  const PostMenu = ({ post, onEditPost }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const handleDelete = async () => {
      const confirmDelete = window.confirm("Are you sure you want to delete this post?");
      if (!confirmDelete) return;

      const { error } = await supabase.from('posts').delete().eq('id', post.id);
      if (error) {
        console.error('Delete error:', error);
        alert("❌ Failed to delete post.");
      } else {
        alert("✅ Post deleted.");
        window.location.reload();
      }
    };

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
          setOpen(false);
        }
      };

      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open]);

    return (
      <div className="relative" ref={menuRef}>
        <button onClick={() => setOpen(!open)} className="text-xl text-gray-600">⋮</button>
        {open && (
          <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg border rounded-md z-10">
            <button
              onClick={() => {
                onEditPost(post);
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Edit Post
            </button>
            <button
              onClick={handleDelete}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Delete Post
            </button>
          </div>
        )}
      </div>
    );
  };
