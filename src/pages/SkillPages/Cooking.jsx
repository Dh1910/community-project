import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

function Cooking() {
  const [posts, setPosts] = useState([]);

  

  useEffect(() => {
    const fetchCookingPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('skill', 'Cooking')
        .order('created_at', { ascending: false });

      if (!error) setPosts(data || []);
    };

    fetchCookingPosts();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen pt-28 px-4 pb-16 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-[#f97316] mb-4">🍳 Discover the Chef in You</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Share your cooking experiences, learn new recipes, and connect with food lovers.
          </p>

          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No cooking posts available yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{post.caption}</h3>
                  <p className="text-sm text-gray-600 mb-2">{post.description}</p>
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt="Cooking"
                      className="w-full h-48 object-cover rounded mt-2"
                    />
                  )}
                  <div className="text-xs text-gray-500 mt-3">
                    <p><strong>Mood:</strong> {post.mood}</p>
                    <p><strong>Duration:</strong> {post.duration}</p>
                    <p><strong>Posted:</strong> {new Date(post.created_at).toLocaleString()}</p>
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
}

export default Cooking;
