import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProfileSummary = () => {
  const [profile, setProfile] = useState({ full_name: '', email: '' });
  const [posts, setPosts] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) return;

      // Get profile data
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile({
        full_name: profileData?.full_name || '',
        email: user.email || '',
      });

      // Get user posts
      const { data: userPosts } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setPosts(userPosts || []);

      // Get joined communities with names
      const { data: joined } = await supabase
        .from('user_communities')
        .select('community_id, communities(name)')
        .eq('user_id', user.id);

      const communityNames = joined?.map((c) => c.communities.name) || [];
      setJoinedCommunities(communityNames);
    };

    fetchProfileData();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen pt-28 px-4 pb-16 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold text-[#7c3aed] mb-6 text-center">Profile Summary</h2>

          <div className="mb-6 space-y-2">
            <p className="text-lg font-semibold">👤 Full Name: {profile.full_name}</p>
            <p className="text-md text-gray-600">📧 Email: {profile.email}</p>
          </div>

          {joinedCommunities.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#7c3aed] mb-2">🌐 Joined Communities</h3>
              <ul className="list-disc list-inside text-gray-700">
                {joinedCommunities.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>
          )}

          <hr className="my-6" />

          <h3 className="text-xl font-semibold text-[#7c3aed] mb-4">📝 My Posts</h3>
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded shadow-sm">
                  {post.media_url && (
                    <img
                      src={post.media_url}
                      alt="Post Media"
                      className="w-full h-60 object-cover rounded mb-3"
                    />
                  )}
                  <p className="text-sm text-gray-800 mb-1">{post.caption}</p>
                  <p className="text-xs text-gray-500">
                    📅 {new Date(post.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">You haven't posted anything yet.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileSummary;
