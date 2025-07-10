import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import customIcon from '../assets/icons/custom.png';

function Community({ openModal, openDiscussionModal }) {
  const [allPosts, setAllPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUser(user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data: all } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      setAllPosts(all || []);

      if (user) {
        const { data: mine } = await supabase
          .from('posts')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        setMyPosts(mine || []);

        const { data: joined } = await supabase
          .from('user_communities')
          .select('community_id, communities(name)')
          .eq('user_id', user.id);
        setJoinedCommunities(joined?.map(j => j.community_id) || []);
      }

      const { data: comms } = await supabase.from('communities').select('*');
      setCommunities(comms || []);
    };

    fetchData();
  }, [user]);

  const handleJoinCommunity = async (communityId) => {
    if (!user) return alert('Please login to join communities');

    const { error } = await supabase.from('user_communities').insert([
      { user_id: user.id, community_id: communityId }
    ]);

    if (!error) {
      setJoinedCommunities(prev => [...prev, communityId]);
    }
  };

  const combinedPosts = [...allPosts, ...myPosts];
  const uniquePostsMap = new Map();
  combinedPosts.forEach(post => uniquePostsMap.set(post.id, post));
  const filteredPosts = [...uniquePostsMap.values()].filter(post =>
    post.skill?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="pt-24 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <a href="/explore" className="flex items-center text-gray-600 hover:text-primary mb-4">
                <i className="ri-arrow-left-line mr-2"></i>Back to Skills
              </a>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Hub</h1>
              <p className="text-lg text-gray-600 mb-8">Connect with fellow learners, share your journey, and join communities.</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  className="bg-[#7c3aed] text-white px-5 py-3 rounded-md hover:bg-[#6b21a8] flex items-center"
                  onClick={openModal}
                >
                  <img src={customIcon} alt="custom" className="w-5 h-5 mr-2 invert" />Create Post
                </button>
                <button
                  onClick={openDiscussionModal}
                  className="bg-white text-[#7c3aed] border border-[#7c3aed] px-5 py-3 rounded-md hover:bg-[#f3e8ff]"
                >
                  <i className="ri-discuss-line mr-2"></i>Start Discussion
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-2/5">
              <div className="bg-white rounded-lg shadow-md p-4">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by skill..."
                  className="pl-4 pr-4 py-3 w-full rounded-md border border-gray-200 focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Community Forums</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
              <div key={community.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md p-6">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{community.name}</h3>
                  {joinedCommunities.includes(community.id) ? (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Joined</span>
                  ) : (
                    <button
                      className="text-xs px-2 py-1 border text-[#7c3aed] border-[#7c3aed] rounded-md"
                      onClick={() => handleJoinCommunity(community.id)}
                    >
                      Join
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-500">{community.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {search ? `Results for "${search}"` : 'All Skill Posts'}
          </h2>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white p-6 rounded-lg shadow">
                  <h4 className="text-lg font-semibold mb-1">{post.caption}</h4>
                  <p className="text-sm text-gray-700 mb-2">{post.description}</p>
                  {post.media_url && (
                    <img
                      src={post.media_url}
                      alt="Post"
                      className="w-full h-48 object-cover rounded-md mb-2"
                    />
                  )}
                  <div className="text-xs text-gray-500">
                    <p><strong>Skill:</strong> {post.skill}</p>
                    <p>{new Date(post.created_at).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No posts found for the selected skill.</p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Thriving Community</h2>
        <p className="max-w-2xl mx-auto text-lg mb-6">
          Connect with fellow learners, share your progress, and accelerate your skill development.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/signup" className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#7c3aed]">
            Create Your Account
          </a>
          <a href="/community" className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#7c3aed]">
            Explore Community
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Community;
