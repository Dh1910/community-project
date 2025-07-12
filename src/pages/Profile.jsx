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
    avatar_url: '',
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
        avatar_url: profileData?.avatar_url || '',
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
      avatar_url: profile.avatar_url || null,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setPasswordMessage('❌ ' + error.message);
    } else {
      setPasswordMessage('✅ Password updated successfully!');
      setNewPassword('');
    }

    setTimeout(() => setPasswordMessage(''), 3000);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-28 px-4 bg-gray-50 pb-16">
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow relative">
          <h2 className="text-2xl font-bold text-[#7c3aed] mb-6 text-center">Profile</h2>

          {alertMessage && (
            <div className={`mb-4 text-center px-4 py-2 rounded font-medium ${
              alertMessage.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {alertMessage}
            </div>
          )}

          {/* Profile Image and URL Input */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#7c3aed] mb-4">
              <img
                src={profile.avatar_url || 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              name="avatar_url"
              value={profile.avatar_url}
              onChange={handleChange}
              placeholder="Image URL (e.g., https://...)"
              className="w-full border px-3 py-2 rounded text-sm"
            />
          </div>

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

          <hr className="my-6 border-gray-200" />

          {/* Password Change Section */}
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <h3 className="text-lg font-semibold text-[#7c3aed]">Change Password</h3>
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
              <div className={`text-center text-sm font-medium ${
                passwordMessage.startsWith('✅') ? 'text-green-600' : 'text-red-600'
              }`}>
                {passwordMessage}
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
