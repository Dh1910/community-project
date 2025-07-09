// src/components/Header.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Header() {
  const [session, setSession] = useState(null);
  const [userProfileExists, setUserProfileExists] = useState(false);

  useEffect(() => {
    const checkAuthAndProfile = async (currentSession) => {
      setSession(currentSession);

      if (currentSession) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentSession.user.id)
          .single();

        setUserProfileExists(!error && !!data);
      } else {
        setUserProfileExists(false);
      }
    };

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      checkAuthAndProfile(session);
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAuthAndProfile(session);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-[Pacifico] text-[#7c3aed] transform transition-transform duration-300 hover:scale-110"
        >
          Grow With Me
        </Link>

        {/* Navigation + Auth Buttons */}
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 items-center">
            <a
              href="/#how-it-works"
              className="text-gray-700 hover:text-[#7c3aed] transition-all duration-300 hover:scale-105"
            >
              How It Works
            </a>
            <Link
              to="/explore"
              className="text-gray-700 hover:text-[#7c3aed] transition-all duration-300 hover:scale-105"
            >
              Explore Skills
            </Link>
            <Link
              to="/community"
              className="text-gray-700 hover:text-[#7c3aed] transition-all duration-300 hover:scale-105"
            >
              Community
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-[#7c3aed] transition-all duration-300 hover:scale-105"
            >
              About
            </Link>
          </nav>

          {/* Auth Buttons / Profile */}
          <div className="flex space-x-3">
            {session && userProfileExists ? (
              // ✅ Only show Profile when logged in AND profile exists
              <Link
                to="/profile"
                className="bg-white border border-[#7c3aed] text-[#7c3aed] px-5 py-2 rounded-md 
                  hover:bg-[#f3e8ff] transition-all duration-300"
              >
                Profile
              </Link>
            ) : (
              // ❌ Show Login and Signup when logged out or profile missing
              <>
                <Link
                  to="/login"
                  className="bg-[#7c3aed] text-white px-5 py-2 rounded-md 
                    transition-all duration-300 
                    hover:bg-white hover:text-[#7c3aed] hover:border hover:border-[#7c3aed]"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#7c3aed] text-white px-5 py-2 rounded-md 
                    transition-all duration-300 
                    hover:bg-white hover:text-[#7c3aed] hover:border hover:border-[#7c3aed]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu icon (optional) */}
        <button className="md:hidden w-10 h-10 flex items-center justify-center transition-transform duration-300 hover:rotate-90">
          <i className="ri-menu-line ri-lg"></i>
        </button>
      </div>
    </header>
  );
}

export default Header;
