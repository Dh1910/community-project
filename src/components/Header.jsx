import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import LogoImage from '../assets/icons/logo.png';


// Helper to get initials
function getInitials(name) {
  if (!name) return '';
  const names = name.trim().split(' ');
  return names.length === 1
    ? names[0][0].toUpperCase()
    : (names[0][0] + names[names.length - 1][0]).toUpperCase();
}

function Header() {
  const [session, setSession] = useState(null);
  const [userProfileExists, setUserProfileExists] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [fullName, setFullName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user?.id) {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('id, avatar_url, full_name')
          .eq('id', session.user.id)
          .maybeSingle();

        const hasProfile = !error && !!profileData;
        setUserProfileExists(hasProfile);
        setAvatarUrl(
          profileData?.avatar_url ||
          'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
        );
        setFullName(profileData?.full_name || 'User');

        if (!hasProfile && location.pathname === '/profile-summary') {
          navigate('/#how-it-works');
        }
      } else {
        setUserProfileExists(false);
        setAvatarUrl('');
        setFullName('');
        if (location.pathname === '/profile-summary' || location.pathname === '/profile') {
          navigate('/#how-it-works');
        }
      }
    };

    fetchSessionAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      fetchSessionAndProfile();
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [location, navigate]);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-17 grid grid-cols-3 items-center">

        {/* Left - Logo */}
       <div className="flex flex-col items-start justify-start">
  <Link to="/" className="transform transition-transform duration-300 hover:scale-105">
    <img
      src={LogoImage}
      alt="Grow With Me Logo"
      className="h-25 w-auto object-contain ml-10 -mt-3"
    />
  </Link>
  
</div>



        {/* Center - Navigation */}
      <div className="flex justify-center items-center h-17 -mt-5">
  <nav className="flex items-center space-x-10 h-full text-base leading-none">
    <a href="/#how-it-works" className="text-gray-700 hover:text-[#7c3aed] whitespace-nowrap">How It Works</a>
    <Link to="/explore" className="text-gray-700 hover:text-[#7c3aed] whitespace-nowrap">Explore Skills</Link>
    <Link to="/community" className="text-gray-700 hover:text-[#7c3aed]">Community</Link>
    <Link to="/about" className="text-gray-700 hover:text-[#7c3aed]">About</Link>
  </nav>
</div>




        {/* Right - Login/Signup/Profile */}
        <div className="flex justify-end items-center space-x-3 -mt-5">
          {session && userProfileExists ? (
            <Link
              to="/profile-summary"
              className="flex items-center bg-[#7c3aed] border border-[#7c3aed] text-white px-4 py-2 rounded-md hover:bg-white hover:text-[#7c3aed] hover:border hover:border-[#7c3aed]"
            >
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-6 h-6 rounded-full object-cover mr-2"
              />
              <span className="font-semibold text-sm">
                {getInitials(fullName)}
              </span>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-[#7c3aed] text-white px-5 py-2 rounded-md hover:bg-white hover:text-[#7c3aed] hover:border hover:border-[#7c3aed]"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-[#7c3aed] text-white px-5 py-2 rounded-md hover:bg-white hover:text-[#7c3aed] hover:border hover:border-[#7c3aed]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
