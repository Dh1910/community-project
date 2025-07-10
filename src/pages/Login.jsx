import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login({ isOpen }) {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (!error) {
      setSuccessMsg('✅ Login successful!');
      setErrorMsg('');
      setTimeout(() => {
        localStorage.setItem('hasLoggedInBefore', 'true');
        navigate('/');
        window.location.reload();
      }, 1500);
    } else {
      setSuccessMsg('');
      const errorText = error.message.toLowerCase();

      if (errorText.includes('user not found')) {
        setErrorMsg('❌ Account not found. Please sign up first.');
      } else if (errorText.includes('invalid login credentials')) {
        setErrorMsg('❌ Incorrect password. Please try again.');
      } else {
        setErrorMsg('❌ Login failed. Please check your credentials.');
      }
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt('🔐 Enter your email to reset your password:');
    if (!email) return;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://yourwebsite.vercel.app/update-password',
 // ✅ Make sure this route exists
    });

    if (error) {
      setSuccessMsg('');
      setErrorMsg('❌ Failed to send reset email. Please try again.');
    } else {
      setErrorMsg('');
      setSuccessMsg('📩 Password reset link has been sent to your email.');
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

              {/* ✅ Success Message */}
              {successMsg && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-center">
                  {successMsg}
                </div>
              )}

              {/* ❌ Error Message */}
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
