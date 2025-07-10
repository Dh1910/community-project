// src/pages/Profile.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    age: '',
    contact: '',
    birthdate: '',
  });

  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) return;

      setUserId(user.id);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile({
        full_name: profileData?.full_name || '',
        email: user.email || '',
        age: profileData?.age || '',
        contact: profileData?.contact || '',
        birthdate: profileData?.birthdate || '',
      });
    };

    fetchData();
  }, []);

  const calculateAge = (birthdate) => {
    if (!birthdate) return '';
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 0 ? age : '';
  };

  const handleSave = async () => {
    if (!userId) {
      setAlertMessage('❌ User not found. Please log in again.');
      return;
    }

    const calculatedAge = calculateAge(profile.birthdate);

    const { error } = await supabase.from('profiles').upsert([{
      id: userId,
      full_name: profile.full_name,
      age: calculatedAge || null,
      contact: profile.contact || null,
      birthdate: profile.birthdate || null,
    }]);

    if (!error) {
      setAlertMessage('✅ Profile updated successfully!');
      setTimeout(() => {
        navigate('/profile-summary');
      }, 1500);
    } else {
      setAlertMessage('❌ Failed to update profile.');
      console.error("Supabase Save Error:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleDelete = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user && window.confirm('Are you sure you want to delete your account?')) {
      await supabase.from('profiles').delete().eq('id', user.id);
      await supabase.auth.admin.deleteUser(user.id); // Requires service role token
      navigate('/signup');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setPasswordMessage('❌ Failed to update password: ' + error.message);
    } else {
      setPasswordMessage('✅ Password updated successfully!');
      setNewPassword('');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-28 px-4 bg-gray-50 pb-16">
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow relative">
          <h2 className="text-2xl font-bold text-[#7c3aed] mb-6 text-center">Profile</h2>

          {alertMessage && (
            <div className="mb-4 text-center text-green-600 font-semibold">{alertMessage}</div>
          )}

          <form className="space-y-4">
            <input
              name="full_name"
              value={profile.full_name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="email"
              value={profile.email}
              disabled
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
            <input
              name="age"
              value={calculateAge(profile.birthdate)}
              disabled
              placeholder="Age"
              className="w-full border px-3 py-2 rounded bg-gray-100"
              type="number"
            />
            <input
              name="contact"
              value={profile.contact}
              onChange={handleChange}
              placeholder="Contact Number"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="birthdate"
              type="date"
              value={profile.birthdate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <button
              type="button"
              onClick={handleSave}
              className="w-full bg-[#7c3aed] text-white py-2 rounded hover:bg-[#6d28d9] transition"
            >
              Save & Continue
            </button>
          </form>

          <hr className="my-6 border-gray-300" />

          {/* ✅ Change Password Section */}
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#7c3aed] text-white py-2 rounded hover:bg-[#6d28d9] transition"
            >
              Update Password
            </button>
            {passwordMessage && (
              <div className="text-center text-sm text-gray-600">{passwordMessage}</div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
