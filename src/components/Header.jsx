import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

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
  const [unreadCount, setUnreadCount] = useState(0);
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

        // Fetch unread message count
        const { data: unreadMessages } = await supabase
          .from('messages')
          .select('id')
          .eq('receiver_id', session.user.id)
          .is('is_read', false);

        if (unreadMessages) {
          setUnreadCount(unreadMessages.length);
        }
      } else {
        setUserProfileExists(false);
        setAvatarUrl('');
        setFullName('');
        setUnreadCount(0);

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
            {session && userProfileExists && (
              <Link to="/inbox" className="relative text-gray-700 hover:text-[#7c3aed]">
                📬 Inbox
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full text-xs px-1.5">
                    {unreadCount}
                  </span>
                )}
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-3">
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
      </div>
    </header>
  );
}

export default Header;
