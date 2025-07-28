import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CreatePostModal from './CreatePostModal';
import SendIcon from '../assets/icons/send.png';
import LikeIcon from '../assets/icons/like.png';
import LikeFilledIcon from '../assets/icons/like-filled.png';
import CommentIcon from '../assets/icons/comment.png';
import SaveIcon from '../assets/icons/save.png';
import SaveFilledIcon from '../assets/icons/save-filled.png';

const ProfileSummary = () => {
  const [profile, setProfile] = useState({ full_name: '', email: '', avatar_url: '' });
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [createdCommunities, setCreatedCommunities] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [savedPostIds, setSavedPostIds] = useState([]);
  const [likes, setLikes] = useState({});
  const [likeAnimation, setLikeAnimation] = useState({});
  const [userId, setUserId] = useState(null);
  const [comments, setComments] = useState({});
  const [showCommentBox, setShowCommentBox] = useState({});
  const [newComment, setNewComment] = useState({});
  const [editingComment, setEditingComment] = useState({});
  const [commentMenu, setCommentMenu] = useState({});
  const [editedMessage, setEditedMessage] = useState('');
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) return;
      setUserId(user?.id);

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

      const { data: created } = await supabase
        .from('communities')
        .select(`
          *,
          profiles:created_by (full_name, avatar_url)
        `)
        .eq('created_by', user.id);

      setCreatedCommunities(created || []);

      const { data: saved } = await supabase
        .from('saved_posts')
        .select('post_id')
        .eq('user_id', user.id);

      const savedIds = saved?.map(item => item.post_id) || [];
      setSavedPostIds(savedIds);

      if (savedIds.length > 0) {
        const { data: postsData } = await supabase
          .from('posts')
          .select('*, profiles(full_name, avatar_url)')
          .in('id', savedIds);
        setSavedPosts(postsData || []);
      }

      const { data: likesData } = await supabase
        .from('likes')
        .select('post_id, user_id');

      const likeMap = {};
      likesData?.forEach(({ post_id, user_id }) => {
        if (!likeMap[post_id]) likeMap[post_id] = { count: 0, liked: false };
        likeMap[post_id].count += 1;
        if (user_id === user?.id) likeMap[post_id].liked = true;
      });
      setLikes(likeMap);

      const { data: commentData } = await supabase
        .from('comments')
        .select('*, profiles(full_name, avatar_url)')
        .order('created_at', { ascending: true });

      const commentMap = {};
      commentData?.forEach(comment => {
        if (!commentMap[comment.post_id]) commentMap[comment.post_id] = [];
        commentMap[comment.post_id].push(comment);
      });
      setComments(commentMap);
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setCommentMenu({});
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const toggleLike = async (postId) => {
    if (!userId) return;
    const isLiked = likes[postId]?.liked;
    if (isLiked) {
      await supabase.from('likes').delete().match({ post_id: postId, user_id: userId });
      setLikes(prev => ({ ...prev, [postId]: { count: prev[postId].count - 1, liked: false } }));
    } else {
      await supabase.from('likes').insert({ post_id: postId, user_id: userId });
      setLikes(prev => ({ ...prev, [postId]: { count: (prev[postId]?.count || 0) + 1, liked: true } }));
      setLikeAnimation(prev => ({ ...prev, [postId]: true }));
      setTimeout(() => setLikeAnimation(prev => ({ ...prev, [postId]: false })), 300);
    }
  };

  const toggleSave = async (postId) => {
    if (!userId) return;
    const isSaved = savedPostIds.includes(postId);
    if (isSaved) {
      await supabase.from('saved_posts').delete().match({ post_id: postId, user_id: userId });
      setSavedPostIds(prev => prev.filter(id => id !== postId));
      setSavedPosts(prev => prev.filter(post => post.id !== postId));
    } else {
      await supabase.from('saved_posts').insert({ post_id: postId, user_id: userId });
      setSavedPostIds(prev => [...prev, postId]);
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!newComment[postId] || !userId) return;
    const { error, data } = await supabase.from('comments')
      .insert({ post_id: postId, user_id: userId, content: newComment[postId] })
      .select('*, profiles(full_name, avatar_url)').single();
    if (!error && data) {
      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), data]
      }));
      setNewComment(prev => ({ ...prev, [postId]: '' }));
    }
  };

  const handleCommentDelete = async (commentId, postId) => {
    await supabase.from('comments').delete().match({ id: commentId });
    setComments(prev => ({ ...prev, [postId]: prev[postId].filter(c => c.id !== commentId) }));
  };

  const handleCommentEdit = async (commentId, postId) => {
    const content = editingComment[commentId];
    if (!content) return;
    const { error } = await supabase.from('comments').update({ content }).match({ id: commentId });
    if (!error) {
      setComments(prev => ({ ...prev, [postId]: prev[postId].map(c => c.id === commentId ? { ...c, content } : c) }));
      setEditingComment(prev => ({ ...prev, [commentId]: undefined }));
      setCommentMenu(prev => ({ ...prev, [commentId]: false }));
      setEditedMessage('Edited successfully!');
      setTimeout(() => setEditedMessage(''), 3000);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 px-4 pb-16 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-lg"></div>
          <div className="max-w-7xl mx-auto bg-white p-4 rounded-b-lg shadow-md flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center ml-8">
                <div className="w-25 h-25 rounded-full overflow-hidden border-2 border-[#7c3aed] -mt-10">
                  <img
                    src={profile.avatar_url}
                    alt="Profile"
                    className="w-full h-full object-cover "
                  />
                </div>
                <div className="text-center mt-2">
                  <h2 className="text-xl font-bold text-[#333]">{profile.full_name}</h2>
                  <p className="text-sm text-gray-500">{profile.email}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href="/profile"
                className="px-3 py-1 text-sm text-white bg-[#7c3aed] rounded hover:bg-[#6b21a8] transition-colors"
              >
                Edit Profile
              </a>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 px-4">
          <h3 className="text-xl font-bold mb-4 text-[#7c3aed]">📌 Your Posts</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              {posts.length === 0 ? (
                <p className="text-gray-600">You haven't posted anything yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {posts.map(post => (
                    <div key={post.id} className="bg-white border rounded-lg shadow p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <img src={profile.avatar_url} className="w-8 h-8 rounded-full" alt="Avatar" />
                          <span className="font-medium text-sm">{profile.full_name}</span>
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
            <div className="col-span-1 bg-white border rounded-lg shadow p-4">
              <h4 className="text-lg font-semibold text-[#7c3aed]">Joined Communities</h4>
              {joinedCommunities.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {joinedCommunities.map((community, index) => (
                    <li key={index} className="text-sm text-gray-600">🧩 {community}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No communities joined yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 px-4">
          <h3 className="text-xl font-bold mb-4 text-[#7c3aed]">🔖 Saved Posts</h3>
          {editedMessage && <div className="mb-4 text-green-600 font-semibold text-sm">{editedMessage}</div>}
          {savedPosts.length === 0 ? (
            <p className="text-gray-600">You haven’t saved any posts yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPosts.map(post => (
                <div key={post.id} className="bg-white border rounded-lg shadow p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={post.profiles?.avatar_url || ''} className="w-8 h-8 rounded-full" alt="user" />
                    <span className="font-medium text-sm">{post.profiles?.full_name}</span>
                  </div>
                  {post.image_url ? (
                    <img src={post.image_url} alt="Post" className="h-40 w-full object-cover rounded" />
                  ) : (
                    <div className="h-40 flex items-center justify-center bg-gray-100 text-gray-400">No Image</div>
                  )}
                  <h4 className="mt-3 text-lg font-semibold">{post.title}</h4>
                  <p className="text-sm text-gray-600">{post.caption}</p>
                  <p className="text-xs text-gray-500 mt-1">🎯 {post.skill} | 🕒 {post.duration} min | 😄 {post.mood}</p>
                  <div className="flex justify-between items-center text-lg mt-3">
                    <div className="flex gap-6">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1 transition-transform ${likeAnimation[post.id] ? 'scale-125' : ''}`}
                      >
                        <img
                          src={likes[post.id]?.liked ? LikeFilledIcon : LikeIcon}
                          alt="Like"
                          className="w-5 h-5"
                          style={{ filter: likes[post.id]?.liked ? 'brightness(0) saturate(100%) invert(28%) sepia(95%) saturate(7483%) hue-rotate(356deg) brightness(101%) contrast(105%)' : 'none' }}
                        />
                        <span className="text-sm">{likes[post.id]?.count || 0}</span>
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setShowCommentBox(prev => ({ ...prev, [post.id]: !prev[post.id] })) }} className="flex items-center gap-1">
                        <img src={CommentIcon} alt="Comment" className="w-5 h-5" />
                        <span className="text-sm">{comments[post.id]?.length || 0}</span>
                      </button>
                    </div>
                    <button onClick={() => toggleSave(post.id)}>
                      <img
                        src={savedPostIds.includes(post.id) ? SaveFilledIcon : SaveIcon}
                        className="w-5 h-5"
                        alt="Save"
                      />
                    </button>
                  </div>

                  {showCommentBox[post.id] && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 w-full mb-2">
                        <textarea
                          rows="1"
                          className="w-full border p-1 rounded text-sm"
                          placeholder="Write a comment..."
                          value={newComment[post.id] || ''}
                          onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                        ></textarea>
                        <button
                          onClick={() => handleCommentSubmit(post.id)}
                          className="transition-transform hover:scale-110"
                        >
                          <img src={SendIcon} alt="Send" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(35%) sepia(80%) saturate(7483%) hue-rotate(200deg) brightness(95%) contrast(105%)' }} />
                        </button>
                      </div>
                      {(comments[post.id] || []).map((comment, i) => (
                        <div key={i} className="mt-2 flex gap-2 items-start">
                          <img src={comment.profiles?.avatar_url || ''} className="w-6 h-6 rounded-full" alt="user" />
                          <div className="w-full">
                            <div className="flex justify-between items-start">
                              <p className="text-xs font-semibold">{comment.profiles?.full_name}</p>
                              {comment.user_id === userId && (
                                <div className="relative" onClick={e => e.stopPropagation()}>
                                  <button
                                    className="text-xs text-gray-600"
                                    onClick={() => setCommentMenu(prev => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                                  >⋮</button>
                                  {commentMenu[comment.id] && (
                                    <div className="absolute right-0 bg-white border rounded shadow text-xs z-10">
                                      <button
                                        className="block w-full px-2 py-1 text-left hover:bg-gray-100"
                                        onClick={() => setEditingComment(prev => ({ ...prev, [comment.id]: comment.content }))}
                                      >Edit</button>
                                      <button
                                        className="block w-full px-2 py-1 text-left hover:bg-red-50 text-red-600"
                                        onClick={() => handleCommentDelete(comment.id, post.id)}
                                      >Delete</button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            {editingComment[comment.id] !== undefined ? (
                              <div className="mt-1">
                                <textarea
                                  className="w-full border text-sm p-1 rounded"
                                  rows="2"
                                  value={editingComment[comment.id]}
                                  onChange={(e) => setEditingComment(prev => ({ ...prev, [comment.id]: e.target.value }))}
                                ></textarea>
                                <button
                                  onClick={() => handleCommentEdit(comment.id, post.id)}
                                  className="text-xs bg-green-500 text-white px-2 py-1 mt-1 rounded"
                                >Save</button>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-700">{comment.content}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto mt-10 px-4">
          <h3 className="text-xl font-bold mb-4 text-[#7c3aed]">🌟 Created Communities</h3>
          {createdCommunities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdCommunities.map((community) => (
                <div key={community.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={community.profiles?.avatar_url || 'https://via.placeholder.com/40'}
                        alt={community.profiles?.full_name || 'User'}
                        className="w-10 h-10 rounded-full object-cover"
                      ></img>
                      <span className="text-sm font-semibold text-gray-800">{community.profiles?.full_name || 'Unknown User'}</span>
                    </div>
                    <CommunityMenu community={community} setCreatedCommunities={setCreatedCommunities} />
                  </div>
                  <h3 className="font-semibold text-gray-700">{community.name}</h3>
                  {community.image_url && (
                    <img
                      src={community.image_url}
                      alt={community.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <p className="text-sm text-gray-500 mb-4">{community.description}</p>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Created</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No communities joined yet.</p>
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
  const menuRef = useRef();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    const { error } = await supabase.delete().from('posts').eq('id', post.id);
    if (error) {
      console.error('Error deleting post:', error);
      alert("❌ Failed to delete post.");
    } else {
      alert("✅ Post deleted successfully.");
      window.location.reload(true);
    }
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      };
    };

    if (open) {
      document.addEventListener("mousedown", handleClick);
    };

    return () => {
      document.removeEventListener("mousedown", handleDelete);
    };
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setOpen(!open)} className="text-lg text-gray-600 hover:text-[#7e3aed]">⋮</button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg border rounded-lg z-10">
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
            onClick={() => handleDelete}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

const CommunityMenu = ({ community, setCreatedCommunities }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this community?");
    if (!confirmDelete) return;

    // Delete related records in user_communities first
    const { error: userCommunityError } = await supabase
      .from('user_communities')
      .delete()
      .eq('community_id', community.id);

    if (userCommunityError) {
      console.error('Error deleting user_communities:', userCommunityError);
      alert('❌ Failed to delete community due to related records.');
      return;
    }

    // Delete the community
    const { error: communityError } = await supabase
      .from('communities')
      .delete()
      .eq('id', community.id);

    if (communityError) {
      console.error('Error deleting community:', communityError);
      alert('❌ Failed to delete community.');
    } else {
      alert('✅ Community deleted successfully.');
      setCreatedCommunities(prev => prev.filter(c => c.id !== community.id));
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setOpen(!open)} className="text-lg text-gray-600 hover:text-[#7c3aed]">⋮</button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg border rounded-lg z-10">
          <button
            onClick={() => {
              navigate(`/edit-community/${community.id}`);
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Edit Community
          </button>
          <button
            onClick={handleDelete}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Delete Community
          </button>
        </div>
      )}
    </div>
  );
};