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
import cookingIcon from '../assets/icons/cooking.png';
import guitarIcon from '../assets/icons/guitar.png';
import codingIcon from '../assets/icons/coding.png';
import fitnessIcon from '../assets/icons/fitness.png';

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

      <section className="pt-16 pb-20 bg-gray-50">
  <div className="container mx-auto px-6">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Skill Path</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Select from popular skills or discover something new. Each path offers structured tracking and a supportive community.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Cooking */}
      <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:-translate-y-1">
        <div className="w-16 h-16 flex items-center justify-center bg-orange-100 rounded-full mb-6 mx-auto">
          <img src={cookingIcon} alt="cooking" className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Cooking</h3>
        <p className="text-gray-600 mb-4 text-center">Master culinary skills from basic techniques to gourmet recipes</p>
        <div className="flex items-center justify-center text-sm text-gray-500">
          <i className="ri-user-line mr-2"></i>
          <span>24,567 active learners</span>
        </div>
      </div>

      {/* Guitar */}
      <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:-translate-y-1">
        <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-6 mx-auto">
          <img src={guitarIcon} alt="guitar" className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Guitar</h3>
        <p className="text-gray-600 mb-4 text-center">From basic chords to advanced techniques and music theory</p>
        <div className="flex items-center justify-center text-sm text-gray-500">
          <i className="ri-user-line mr-2"></i>
          <span>18,923 active learners</span>
        </div>
      </div>

      {/* Coding */}
      <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:-translate-y-1">
        <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-6 mx-auto">
          <img src={codingIcon} alt="coding" className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Coding</h3>
        <p className="text-gray-600 mb-4 text-center">Learn programming languages and build real-world projects</p>
        <div className="flex items-center justify-center text-sm text-gray-500">
          <i className="ri-user-line mr-2"></i>
          <span>32,105 active learners</span>
        </div>
      </div>

      {/* Fitness */}
      <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:-translate-y-1">
        <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full mb-6 mx-auto">
          <img src={fitnessIcon} alt="fitness" className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Fitness</h3>
        <p className="text-gray-600 mb-4 text-center">Track workouts, nutrition, and achieve your health goals</p>
        <div className="flex items-center justify-center text-sm text-gray-500">
          <i className="ri-user-line mr-2"></i>
          <span>29,784 active learners</span>
        </div>
      </div>
    </div>

    <div className="text-center mt-12">
      <button className="text-primary font-medium flex items-center mx-auto hover:underline">
        Explore More Skills
        <i className="ri-arrow-right-line ml-2"></i>
      </button>
    </div>
  </div>
</section>

{/* //features creator */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-6">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Creators</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Meet members who are making impressive progress on their skill journeys
      </p>
    </div>
    <div className="flex overflow-x-auto pb-8 gap-6">
      {/* Creator Cards - just 2 examples */}
      <div className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md p-6 border">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
            <img src="https://readdy.ai/api/search-image?query=creator1" alt="Creator" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Emily Rodriguez</h3>
            <p className="text-sm text-gray-500">Guitar • 8 months</p>
          </div>
        </div>
        <div className="bg-blue-50 rounded p-3 mb-4">
          <p className="text-sm text-gray-700">Performed my first complete song at an open mic night!</p>
        </div>
        <p className="text-gray-600 italic text-sm">"Tracking helped me stay consistent."</p>
      </div>

      <div className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md p-6 border">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
            <img src="https://readdy.ai/api/search-image?query=creator2" alt="Creator" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Marcus Chen</h3>
            <p className="text-sm text-gray-500">Coding • 1 year</p>
          </div>
        </div>
        <div className="bg-green-50 rounded p-3 mb-4">
          <p className="text-sm text-gray-700">Launched my first app, 500+ users in 1 week!</p>
        </div>
        <p className="text-gray-600 italic text-sm">"Community feedback kept me going."</p>
      </div>
    </div>
  </div>
</section>


{/* our growng community */}
<section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Growing Community</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Join thousands of learners who are tracking their progress and celebrating their growth
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="ri-user-heart-line ri-2x text-primary"></i>
        </div>
        <h3 className="text-4xl font-bold text-gray-900 mb-2">248,763</h3>
        <p className="text-gray-600">Community Members</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="ri-lightbulb-line ri-2x text-secondary"></i>
        </div>
        <h3 className="text-4xl font-bold text-gray-900 mb-2">87</h3>
        <p className="text-gray-600">Skills Being Tracked</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="ri-trophy-line ri-2x text-green-500"></i>
        </div>
        <h3 className="text-4xl font-bold text-gray-900 mb-2">1,456,892</h3>
        <p className="text-gray-600">Milestones Achieved</p>
      </div>
    </div>
  </div>
</section>

{/* who our member say */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Members Say</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Real stories from people who transformed their skills with us
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg shadow-md p-6 border">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <img src="https://readdy.ai/api/search-image?query=test1" alt="Testimonial" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Olivia Parker</h3>
            <p className="text-sm text-gray-500">Painting • 1 year</p>
          </div>
        </div>
        <div className="flex mb-4 text-yellow-400">
          {[...Array(5)].map((_, i) => <i key={i} className="ri-star-fill" />)}
        </div>
        <p className="text-gray-700">"The weekly tracking and feedback helped me stay consistent. I've done more art in 1 year than past 5 combined!"</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <img src="https://readdy.ai/api/search-image?query=test2" alt="Testimonial" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Robert Johnson</h3>
            <p className="text-sm text-gray-500">Photography • 8 months</p>
          </div>
        </div>
        <div className="flex mb-4 text-yellow-400">
          {[...Array(4)].map((_, i) => <i key={i} className="ri-star-fill" />)}
          <i className="ri-star-half-fill" />
        </div>
        <p className="text-gray-700">"The structured path made it easy to focus and improve weekly."</p>
      </div>
    </div>
  </div>
</section>

      <Footer />
    </>
  );
};

export default Explore;
