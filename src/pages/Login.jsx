import { Link } from 'react-router-dom';
import Header from '../components/Header'; // ✅ Update path if needed
import Footer from '../components/Footer'; // ✅ Update path if needed

function Login({ isOpen, onClose }) {
  // 👉 Full page version (used on /login route)
  if (isOpen === undefined) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 flex flex-col justify-center bg-gray-100 px-4">
          <div className="flex-grow flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-12">
              <h1 className="text-2xl font-bold mb-4 text-center text-[#7c3aed]">Login</h1>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#7c3aed] text-white py-2 rounded hover:bg-[#6d28d9] transition"
                >
                  Login
                </button>
              </form>
              <p className="text-center text-sm mt-4 text-gray-600">
                Don’t have an account?{' '}
                <Link
                  to="/signup"
                  className="text-[#7c3aed] hover:underline font-medium"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  // ❌ Modal closed
  if (!isOpen) return null;

  // 👉 Modal login (when triggered as modal)
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4 text-[#7c3aed]">Login</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <button
            type="submit"
            className="w-full bg-[#7c3aed] text-white py-2 rounded hover:bg-[#6d28d9] transition"
          >
            Login
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-[#7c3aed] hover:underline block text-center"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Login;
