// src/pages/UpdatePassword.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function UpdatePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      const params = new URLSearchParams(hash.substring(1));
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');

      supabase.auth.setSession({
        access_token,
        refresh_token,
      });
    }
  }, []);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setMessage('❌ Failed to update password');
    } else {
      setMessage('✅ Password updated successfully!');
      setTimeout(() => navigate('/'), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#7c3aed]">Reset Your Password</h2>

        {message && (
          <div
            className={`mb-4 px-4 py-2 rounded text-center ${
              message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-[#7c3aed] text-white py-2 rounded hover:bg-[#6d28d9] transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
