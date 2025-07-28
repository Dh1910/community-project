import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CreatePostModal from './CreatePostModal';
import customIcon from '../assets/icons/custom.png';

function Community() {
  const [allPosts, setAllPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const navigate = useNavigate();
  const postSectionRef = useRef(null);

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

        // Get all communities with creator info
        const { data: allCommunities } = await supabase
          .from('communities')
          .select(`
            *,
            profiles:created_by (full_name, avatar_url)
          `);

        // Get only the ones user has joined
        const { data: joined } = await supabase
          .from('user_communities')
          .select('community_id')
          .eq('user_id', user.id);

        setCommunities(allCommunities || []);
        setJoinedCommunities(joined?.map((j) => j.community_id) || []);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleJoinCommunity = async (communityId) => {
    if (!user) return alert('Please login to join communities');

    const { error } = await supabase.from('user_communities').insert([
      {
        user_id: user.id,
        community_id: communityId,
      },
    ]);

    if (error) {
      console.error('Error joining community:', error);
      alert('❌ Failed to join community.');
    } else {
      setJoinedCommunities((prev) => [...prev, communityId]);
      alert('✅ Successfully joined community.');
    }
  };

  const handleLeaveCommunity = async (communityId) => {
    if (!user) return alert('Please login to leave communities');

    const { error } = await supabase
      .from('user_communities')
      .delete()
      .match({ user_id: user.id, community_id: communityId });

    if (error) {
      console.error('Error leaving community:', error);
      alert('❌ Failed to leave community.');
    } else {
      setJoinedCommunities((prev) => prev.filter((id) => id !== communityId));
      alert('✅ Successfully left community.');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (postSectionRef.current) {
      postSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setSearch('');
  };

  // Merge all posts and your posts, remove duplicates, and sort by time
  const allCombinedPosts = [...(allPosts || []), ...(myPosts || [])];
  const uniquePostsMap = new Map();
  allCombinedPosts.forEach(post => uniquePostsMap.set(post.id, post));
  const mergedPosts = [...uniquePostsMap.values()].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const filteredPosts = mergedPosts.filter((post) =>
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
              <p className="text-lg text-gray-600 mb-8">
                Connect with fellow learners, share your journey, and join communities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button
                  className="bg-[#7c3aed] text-white px-5 py-3 rounded-md hover:bg-[#6b21a8] flex items-center"
                  onClick={() => setIsPostModalOpen(true)}
                >
                  <img src={customIcon} alt="custom" className="w-5 h-5 mr-2 invert" />
                  Create Post
                </button>

                <button
                  onClick={() => navigate('/create-community')}
                  className="bg-[#7c3aed] text-white px-5 py-3 rounded-md hover:bg-[#6b21a8] flex items-center"
                >
                  <i className="ri-group-line mr-2"></i>+ Create Community
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-2/5">
              <div className="bg-white rounded-lg shadow-md p-4">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by skill..."
                    className="pl-4 pr-4 py-3 w-full rounded-md border border-gray-200 focus:ring-2 focus:ring-primary/20 text-sm"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Your Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
              <div key={community.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md p-6">
                {/* Creator Profile */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={community.profiles?.avatar_url || 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'}
                    alt={community.profiles?.full_name || 'User'}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {community.profiles?.full_name || 'Unknown User'}
                  </span>
                </div>

                {/* Community Name & Image */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{community.name}</h3>
                {community.image_url && (
                  <img
                    src={community.image_url}
                    alt={community.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}

                {/* Description */}
                <p className="text-sm text-gray-500 mb-4">{community.description}</p>

                {/* Join/Leave Button */}
                {joinedCommunities.includes(community.id) ? (
                  <button
                    className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full w-full"
                    onClick={() => handleLeaveCommunity(community.id)}
                  >
                    view community
                  </button>
                ) : (
                  <button
                    className="text-xs px-3 py-1 border w-full bg-[#7c3aed] text-white rounded-md"
                    onClick={() => handleJoinCommunity(community.id)}
                  >
                    Join community
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Thriving Community</h2>
        <p className="max-w-2xl mx-auto text-lg mb-6">
          Connect with fellow learners, share your progress, and accelerate your skill development.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/signup"
            className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#7c3aed]"
          >
            Create Your Account
          </a>
          <a
            href="/community"
            className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#7c3aed]"
          >
            Explore Community
          </a>
        </div>
      </section>

      {/* Post Modal */}
      {isPostModalOpen && (
        <CreatePostModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
      )}

      <Footer />
    </>
  );
}

export default Community;