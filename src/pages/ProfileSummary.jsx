import { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProfileSummary = () => {
  const [profile, setProfile] = useState({ full_name: '', email: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        console.log("User not found or error:", error);
        return;
      }
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile({
        full_name: data?.full_name || '',
        email: user.email || '',
      });
    };
    fetchUser();
  }, []);

  // 👉 Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error);
    } else {
      window.location.href = '/login';
    }
  };

  const handleDelete = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.log("User fetch error or not found:", userError);
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete your profile data?');
    if (!confirmDelete) return;

    try {
      console.log("Deleting profile data for user:", user.id);
      const { error: profileDeleteError } = await supabase.from('profiles').delete().eq('id', user.id);
      if (profileDeleteError) {
        console.error("Profile delete error:", profileDeleteError);
        alert('❌ Failed to delete profile data.');
        return;
      }

      alert('✅ Profile data deleted successfully. Redirecting to home...');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      console.error("Unexpected error during deletion:", error);
      alert('❌ An unexpected error occurred. Check console for details.');
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
          <div className="absolute top-4 right-4" ref={menuRef}>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl">
              ⋮
            </button>

            {menuOpen && (
              <div className="flex flex-col absolute right-0 top-6 bg-white border shadow rounded text-sm w-40 z-10 text-left">
                <a href="/profile" className="px-4 py-2 pl-4 hover:bg-gray-100">Edit Profile</a>
                <button onClick={handleLogout} className="px-4 py-2 pl-4 text-left hover:bg-gray-100">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileSummary;