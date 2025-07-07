import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-['Pacifico'] text-primary transform transition-transform duration-300 hover:scale-110"
        >
          Grow With Me
        </Link>

        {/* Nav + Buttons */}
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              to="/#how-it-works"
              className="text-gray-700 hover:text-primary transition-all duration-300 hover:scale-105"
            >
              How It Works
            </Link>
            <Link
              to="/explore"
              className="text-gray-700 hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Explore Skills
            </Link>
            <Link
              to="/community"
              className="text-gray-700 hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Community
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary transition-all duration-300 hover:scale-105"
            >
              About
            </Link>
          </nav>

          {/* Buttons: Log In + Sign Up */}
          <div className="flex space-x-3">
            {/* Log In */}
            <Link
              to="/login"
              className="bg-[#7c3aed] text-white px-5 py-2 rounded-md 
                        transition-all duration-300 
                        hover:bg-white hover:text-[#7c3aed] hover:border hover:border-[#7c3aed]"
            >
              Log In
            </Link>

            {/* Sign Up */}
            <Link
              to="/signup"
              className="bg-[#7c3aed] text-white px-5 py-2 rounded-md 
                        transition-all duration-300 
                        hover:bg-white hover:text-[#7c3aed] hover:border hover:border-[#7c3aed]"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden w-10 h-10 flex items-center justify-center transition-transform duration-300 hover:rotate-90">
          <i className="ri-menu-line ri-lg"></i>
        </button>
      </div>
    </header>
  );
}

export default Header;
