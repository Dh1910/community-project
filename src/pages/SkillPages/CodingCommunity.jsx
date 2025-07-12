import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import Header from '../../components/Header';
import Footer from '../../components/Footer';



const CodingCommunity = () => {
  const [members, setMembers] = useState([]);
  const [user, setUser] = useState(null);
  const [codingCommunityId, setCodingCommunityId] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchCodingCommunityId = async () => {
      const { data, error } = await supabase
        .from('communities')
        .select('id')
        .eq('name', 'Coding') // Make sure your Coding community name is exactly this
        .single();

      if (data?.id) {
        setCodingCommunityId(data.id);
      }
    };

    fetchCodingCommunityId();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!codingCommunityId) return;

      const { data, error } = await supabase
        .from('user_communities')
        .select('user_id, profiles(full_name, avatar_url)')
        .eq('community_id', codingCommunityId);

      if (data) setMembers(data);
    };

    fetchMembers();
  }, [codingCommunityId]);

  return (
    <>
      <Header />
      <div className="pt-28 px-6 pb-20 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-indigo-700">👨‍💻 Coding Community</h1>
          <p className="text-gray-700 mb-8">
            Welcome to the Coding Community! Connect, collaborate, and level up your skills with fellow coders.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">👥 Members</h2>
          {members.length === 0 ? (
            <p className="text-gray-500">No members found yet. Be the first to join!</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {members.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
                >
                  <img
                    src={m.profiles?.avatar_url || 'https://via.placeholder.com/100'}
                    alt="User"
                    className="w-20 h-20 rounded-full object-cover mb-2"
                  />
                  <h3 className="font-medium text-indigo-600">{m.profiles?.full_name || 'Unnamed User'}</h3>
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

export default CodingCommunity;
