import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProfileSummary = () => {
  const [profile, setProfile] = useState({ full_name: '', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        setProfile({
          full_name: data?.full_name || '',
          email: user.email || '',
        });
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const handleDelete = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (window.confirm('Are you sure you want to delete your account?')) {
      await supabase.from('profiles').delete().eq('id', user.id);
      await supabase.auth.admin.deleteUser(user.id); // Note: Needs elevated role
      window.location.href = '/signup';
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-28 px-4 bg-gray-50 pb-16">
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow relative">
          <h2 className="text-2xl font-bold text-[#7c3aed] mb-6 text-center">Profile Summary</h2>

          <div className="space-y-4">
            <div><strong>Name:</strong> {profile.full_name}</div>
            <div><strong>Email:</strong> {profile.email}</div>
          </div>

          {/* 3-dot menu */}
          <div className="absolute top-4 right-4 group">
            <button className="text-xl">&#8942;</button>
            <div className="hidden group-hover:flex flex-col absolute right-0 top-6 bg-white border shadow rounded text-sm w-40 z-10">
              <a href="/profile" className="px-4 py-2 hover:bg-gray-100">Edit Profile</a>
              <button onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100">Logout</button>
              <button onClick={handleDelete} className="px-4 py-2 text-red-500 hover:bg-red-50">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileSummary;
