// ✨ Explore.jsx Save Button + Comments Logic Combined
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SendIcon from '../assets/icons/send.png';
import LikeIcon from '../assets/icons/like.png';
import LikeFilledIcon from '../assets/icons/like-filled.png';
import CommentIcon from '../assets/icons/comment.png';
import SaveIcon from '../assets/icons/save.png';
import SaveFilledIcon from '../assets/icons/save-filled.png';

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [likeAnimation, setLikeAnimation] = useState({});
  const [userId, setUserId] = useState(null);
  const [savedPostIds, setSavedPostIds] = useState([]);
  const [comments, setComments] = useState({});
  const [showCommentBox, setShowCommentBox] = useState({});
  const [newComment, setNewComment] = useState({});
  const [editingComment, setEditingComment] = useState({});
  const [commentMenu, setCommentMenu] = useState({});
  const [editedMessage, setEditedMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id);

      const { data: postsData } = await supabase
        .from('posts')
        .select('*, profiles(full_name, avatar_url)')
        .order('created_at', { ascending: false });
      setPosts(postsData || []);

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

      const { data: saved } = await supabase
        .from('saved_posts')
        .select('post_id')
        .eq('user_id', user?.id);
      setSavedPostIds(saved?.map(s => s.post_id) || []);

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

    fetchData();

    const handleClickOutside = () => setCommentMenu({});
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

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

  const filteredPosts = activeCategory === 'All' ? posts : posts.filter(post => post.skill === activeCategory);

  return (
    <>
      <Header />
      <section className="pt-24 pb-20 px-6 bg-white">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-6">Explore Skills</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {["All", "Cooking", "Design", "Photography", "Music", "Fitness", "Coding", "Languages"].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm ${activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
              >{cat}</button>
            ))}
          </div>

          {editedMessage && <div className="mb-4 text-green-600 font-semibold text-sm">{editedMessage}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white border rounded shadow">
                {post.image_url && <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover" />}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={post.profiles?.avatar_url || ''} className="w-8 h-8 rounded-full" alt="user" />
                    <span className="font-medium">{post.profiles?.full_name}</span>
                  </div>
                  <h2 className="font-bold text-lg mb-1">{post.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">{post.caption}</p>
                  <div className="text-xs text-gray-500 mb-2">🎯 {post.skill} | 🕒 {post.duration} min | 😄 {post.mood}</div>
                  <div className="flex justify-between items-center text-lg">
                    <div className="flex gap-6">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1 transition-transform ${likeAnimation[post.id] ? 'scale-125' : ''}`}
                      >
                        <img
                          src={likes[post.id]?.liked ? LikeFilledIcon : LikeIcon}
                          alt="Like"
                          className="w-6 h-6"
                          style={{ filter: likes[post.id]?.liked ? 'brightness(0) saturate(100%) invert(28%) sepia(95%) saturate(7483%) hue-rotate(356deg) brightness(101%) contrast(105%)' : 'none' }}
                        />
                        {likes[post.id]?.count || 0}
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setShowCommentBox(prev => ({ ...prev, [post.id]: !prev[post.id] })) }} className="flex items-center gap-1">
                        <img src={CommentIcon} alt="Comment" className="w-6 h-6" /> {comments[post.id]?.length || 0}
                      </button>
                    </div>
                    <button onClick={() => toggleSave(post.id)}>
                      <img
                        src={savedPostIds.includes(post.id) ? SaveFilledIcon : SaveIcon}
                        className="w-6 h-6"
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
                          <img src={SendIcon} alt="Send" className="w-6 h-6" style={{ filter: 'brightness(0) saturate(100%) invert(35%) sepia(80%) saturate(7483%) hue-rotate(200deg) brightness(95%) contrast(105%)' }} />
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
                                        className="block w-full px-2 py-1 text-left hover:bg-gray-100 text-red-600"
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
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Explore;
