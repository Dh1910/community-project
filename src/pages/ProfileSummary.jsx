import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostProjectModal from '../pages/SkillPages/PostProjectModal';

const ProfileSummary = () => {
  const [profile, setProfile] = useState({ full_name: '', email: '', avatar_url: '' });
  const [posts, setPosts] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

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

      const { data: userProjects } = await supabase
        .from('projects')
        .select('*')
        .eq('creator_id', user.id);

      setProjects(userProjects || []);
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

  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
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
                    <PostMenu post={post} />
                  </div>
                  {post.image_url ? (
                    <img src={post.image_url} alt="Post" className="mt-2 h-40 w-full object-cover rounded" />
                  ) : (
                    <div className="h-40 flex items-center justify-center bg-gray-100 text-gray-400">No Image</div>
                  )}
                  <h4 className="mt-3 text-lg font-semibold">{post.caption}</h4>
                  <p className="text-sm text-gray-600">{post.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto mt-16 px-4">
          <h3 className="text-2xl font-bold mb-6 text-[#7c3aed]">📦 My Projects</h3>

          {projects.length === 0 ? (
            <p className="text-gray-600">You haven’t posted any projects yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <div key={project.id} className="bg-white rounded-xl p-4 shadow relative">
                  <h4 className="text-lg font-semibold text-indigo-700 mb-1">{project.title}</h4>
                  <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                  <p className="text-sm text-gray-600 mb-1">🔧 Skill: {project.skill}</p>
                  <p className="text-xs text-gray-500">Posted: {new Date(project.created_at).toLocaleString()}</p>

                  <div className="absolute top-3 right-3 space-x-2 flex">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <PostProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }}
        onProjectPosted={() => window.location.reload()}
        existingProject={editingProject}
      />
      <Footer />
    </>
  );
};

export default ProfileSummary;

const PostMenu = ({ post }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

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
            onClick={() => navigate('/create-post', { state: { postData: post } })}
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
