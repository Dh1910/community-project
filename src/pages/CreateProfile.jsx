import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const CreateProfile = () => {
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase.from('profiles').insert([
        {
          id: user.id,
          full_name: fullName,
          bio,
        },
      ]);

      if (error) {
        alert('Error creating profile: ' + error.message);
      } else {
        navigate('/profile');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-3 p-2 border rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <textarea
          placeholder="Bio"
          className="w-full mb-3 p-2 border rounded"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
