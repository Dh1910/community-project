import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login({ isOpen }) {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        const errorText = error.message.toLowerCase();
        if (errorText.includes('user not found')) {
          setErrorMsg('❌ Account not found. Please sign up first.');
        } else if (errorText.includes('invalid login credentials')) {
          setErrorMsg('❌ Incorrect password. Please try again.');
        } else {
          setErrorMsg('❌ Login failed. Please check your credentials.');
        }
      } else {
        setSuccessMsg('✅ Login successful!');
        localStorage.setItem('hasLoggedInBefore', 'true');
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      setErrorMsg('❌ Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt('🔐 Enter your email to reset your password:');
    if (!email) return;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://yourwebsite.vercel.app/update-password', // ✅ Make sure this route exists
    });

    if (error) {
      setSuccessMsg('');
      setErrorMsg('❌ Failed to send reset email. Please try again.');
    } else {
      setErrorMsg('');
      setSuccessMsg('📩 Password reset link has been sent to your email.');
    }
  };

  // 👉 Full Page Render
  if (isOpen === undefined) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 flex flex-col justify-center bg-gray-100 px-4">
          <div className="flex-grow flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-12">
              <h1 className="text-2xl font-bold mb-4 text-center text-[#7c3aed]">Login</h1>

              {successMsg && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-center">
                  {successMsg}
                </div>
              )}

              {errorMsg && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
                  {errorMsg}
                </div>
              )}

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

                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-[#7c3aed] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 rounded text-white transition ${
                    isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#7c3aed] hover:bg-[#6d28d9]'
                  }`}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <p className="text-center text-sm mt-4 text-gray-600">
                Don’t have an account?{' '}
                <Link to="/signup" className="text-[#7c3aed] hover:underline font-medium">
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

  // 👉 Modal Render
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-4 text-gray-500 text-2xl">×</button>
        <h2 className="text-xl font-bold mb-4 text-[#7c3aed]">Login</h2>

        {successMsg && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-center">
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {errorMsg}
          </div>
        )}

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

          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-[#7c3aed] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded text-white transition ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#7c3aed] hover:bg-[#6d28d9]'
            }`}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
  