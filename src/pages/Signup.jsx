import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../supabaseClient';

const Signup = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // ✅ Step 1: Signup via Supabase Auth (password automatically secure)
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        if (error.message.toLowerCase().includes('email')) {
          setErrorMsg('This email is already registered. Please log in instead.');
        } else {
          setErrorMsg('Signup failed: ' + error.message);
        }
        setIsSubmitting(false);
        return;
      }

      // ✅ Step 2: Add user info to 'profiles' table (no password stored here)
      const userId = data?.user?.id;
      if (userId) {
        const { error: profileError } = await supabase.from('profiles').upsert([
          {
            id: userId,
            user_id: userId, // foreign key
            full_name: name,
            email: email,
          },
        ]);

        if (profileError) {
          setErrorMsg('Profile creation failed: ' + profileError.message);
          setIsSubmitting(false);
          return;
        }

        setSuccessMsg('✅ Signup successful. Please log in.');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (err) {
      setErrorMsg('Something went wrong: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 👉 Full Page Render (if `isOpen` is undefined)
  if (isOpen === undefined) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 flex flex-col justify-center bg-gray-100 px-4">
          <div className="flex-grow flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-md mb-12">
              <h1 className="text-2xl font-bold text-center text-[#7c3aed] mb-4">Sign Up</h1>

              {errorMsg && <div className="text-red-600 text-sm text-center mb-2">{errorMsg}</div>}
              {successMsg && <div className="text-green-600 text-sm text-center mb-2">{successMsg}</div>}

              <form onSubmit={handleSignup} className="space-y-4">
                <input name="name" type="text" placeholder="Name" className="w-full border p-2 rounded" required />
                <input name="email" type="email" placeholder="Email" className="w-full border p-2 rounded" required />
                <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded" required />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 rounded transition ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-[#7c3aed] hover:bg-[#6d28d9] text-white'
                  }`}
                >
                  {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
              </form>

              <p className="text-center text-sm mt-4 text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-[#7c3aed] hover:underline font-medium">
                  Log in
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
        <h2 className="text-xl font-bold mb-4 text-[#7c3aed]">Sign Up</h2>

        {errorMsg && <div className="text-red-600 text-sm text-center mb-2">{errorMsg}</div>}
        {successMsg && <div className="text-green-600 text-sm text-center mb-2">{successMsg}</div>}

        <form onSubmit={handleSignup} className="space-y-4">
          <input name="name" type="text" placeholder="Name" className="w-full border p-2 rounded" required />
          <input name="email" type="email" placeholder="Email" className="w-full border p-2 rounded" required />
          <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded" required />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded transition ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-[#7c3aed] hover:bg-[#6d28d9] text-white'
            }`}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
