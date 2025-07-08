// File: src/pages/Profile.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  const [profile, setProfile] = useState({ full_name: '', email: '', age: '', contact: '', birthdate: '' });
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id);

      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile({
          full_name: data?.full_name || '',
          email: user.email || '',
          age: data?.age || '',
          contact: data?.contact || '',
          birthdate: data?.birthdate || '',
        });
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    console.log("Button clicked");
    const { error } = await supabase.from('profiles').upsert([{ id: userId, ...profile }]);
    if (!error) {
      console.log("Data saved, redirecting...");
      navigate('/profile-summary');
    } else {
      console.error("Save error:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleDelete = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (window.confirm('Are you sure you want to delete your account?')) {
      await supabase.from('profiles').delete().eq('id', user.id);
      await supabase.auth.admin.deleteUser(user.id);
      navigate('/signup');
    }
  };

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  return (
    <>
      <Header />
      <div className="min-h-screen pt-28 px-4 bg-gray-50 pb-16">
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow relative">
          <h2 className="text-2xl font-bold text-[#7c3aed] mb-6 text-center">Profile</h2>

          <form className="space-y-4">
            <input name="full_name" value={profile.full_name} onChange={handleChange} placeholder="Full Name" className="w-full border px-3 py-2 rounded" />
            <input name="email" value={profile.email} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
            <input name="age" value={profile.age} onChange={handleChange} placeholder="Age" className="w-full border px-3 py-2 rounded" />
            <input name="contact" value={profile.contact} onChange={handleChange} placeholder="Contact Number" className="w-full border px-3 py-2 rounded" />
            <input name="birthdate" type="date" value={profile.birthdate} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
            <button type="button" onClick={handleSave} className="w-full bg-[#7c3aed] text-white py-2 rounded hover:bg-[#6d28d9] transition">
              Save & Continue
            </button>
          </form>

          <div className="flex justify-between mt-6">
            <button onClick={handleLogout} className="text-sm text-white bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition">
              Logout
            </button>
            <button onClick={handleDelete} className="text-sm text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition">
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
