// File: src/components/Header.jsx
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Header() {
  const [session, setSession] = useState(null);
  const [userProfileExists, setUserProfileExists] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user?.id) {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', session.user.id)
          .maybeSingle();

        const hasProfile = !error && !!profileData;
        setUserProfileExists(hasProfile);

        if (!hasProfile && location.pathname === '/profile-summary') {
          navigate('/#how-it-works');
        }
      } else {
        setUserProfileExists(false);
        if (location.pathname === '/profile-summary' || location.pathname === '/profile') {
          navigate('/#how-it-works');
        }
      }
    };

    fetchSessionAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.id) {
        supabase
          .from('profiles')
          .select('id')
          .eq('id', session.user.id)
          .maybeSingle()
          .then(({ data, error }) => {
            const hasProfile = !error && !!data;
            setUserProfileExists(hasProfile);
            if (!hasProfile && (location.pathname === '/profile-summary' || location.pathname === '/profile')) {
              navigate('/#how-it-works');
            }
          });
      } else {
        setUserProfileExists(false);
        if (location.pathname === '/profile-summary' || location.pathname === '/profile') {
          navigate('/#how-it-works');
        }
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [location, navigate]);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-[Pacifico] text-[#7c3aed] transform transition-transform duration-300 hover:scale-110"
        >
          Grow With Me
        </Link>

        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-6 items-center">
            <a href="/#how-it-works" className="text-gray-700 hover:text-[#7c3aed]">How It Works</a>
            <Link to="/explore" className="text-gray-700 hover:text-[#7c3aed]">Explore Skills</Link>
            <Link to="/community" className="text-gray-700 hover:text-[#7c3aed]">Community</Link>
            <Link to="/about" className="text-gray-700 hover:text-[#7c3aed]">About</Link>
          </nav>

          <div className="flex space-x-3">
            {session && userProfileExists ? (
              <Link
                to="/profile-summary"
                className="bg-[#7c3aed] border border-[#7c3aed] text-white px-5 py-2 rounded-md hover:bg-white hover:text-[#7c3aed] hover:border hover:border-[#7c3aed]"
              >
                Profile
              </Link>
            ) : (
              <>
                <Link to="/login" className="bg-[#7c3aed] text-white px-5 py-2 rounded-md hover:bg-white hover:text-[#7c3aed] hover:border hover:border-[#7c3aed]">Log In</Link>
                <Link to="/signup" className="bg-[#7c3aed] text-white px-5 py-2 rounded-md hover:bg-white hover:text-[#7c3aed] hover:border hover:border-[#7c3aed]">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;