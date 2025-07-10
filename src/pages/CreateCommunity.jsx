// src/pages/CreateCommunity.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CreateCommunity = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.error('User not found:', error);
        return;
      }
      setUserId(data.user.id);
    };
    getUser();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) {
      alert('Please enter a community name.');
      return;
    }

    const { error } = await supabase.from('communities').insert([
      {
        name,
        description,
        created_by: userId,
      },
    ]);

    if (error) {
      console.error('Error creating community:', error.message);
      alert('❌ Failed to create community.');
    } else {
      alert('✅ Community created successfully!');
      navigate('/community');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-28 px-4 bg-gray-50 pb-16">
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#7c3aed]">Create a New Community</h2>

          <input
            type="text"
            placeholder="Community Name"
            className="w-full border px-3 py-2 mb-4 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Community Description"
            className="w-full border px-3 py-2 mb-4 rounded"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={handleCreate}
            className="w-full bg-[#7c3aed] text-white py-2 rounded hover:bg-[#6b21a8] transition"
          >
            Create Community
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateCommunity;
