import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login({ isOpen }) {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (!error) {
      // 🔐 Mark as logged in before
      localStorage.setItem('hasLoggedInBefore', 'true');

      // 🔁 Go to Home and refresh to update Header
      navigate('/');
      window.location.reload();
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  if (isOpen === undefined) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 flex flex-col justify-center bg-gray-100 px-4">
          <div className="flex-grow flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-12">
              <h1 className="text-2xl font-bold mb-4 text-center text-[#7c3aed]">Login</h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-[#7c3aed]"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-[#7c3aed]"
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
                <a href="/signup" className="text-[#7c3aed] hover:underline font-medium">
                  Create Account
                </a>
              </p>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return null;
}

export default Login;
