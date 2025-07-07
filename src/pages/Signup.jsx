import { Link } from 'react-router-dom';
import Header from '../components/Header'; // ✅ adjust the path if needed
import Footer from '../components/Footer'; // ✅ adjust the path if needed

const Signup = ({ isOpen, onClose }) => {
  // 👉 Full page version (used via route `/signup`)
  if (isOpen === undefined) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 flex flex-col justify-center bg-gray-100 px-4">
          <div className="flex-grow flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-md mb-12">
              <h1 className="text-2xl font-bold text-center text-[#7c3aed] mb-4">Sign Up</h1>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#7c3aed] text-white py-2 rounded hover:bg-[#6d28d9] transition"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-center text-sm mt-4 text-gray-600">
                Already have an account?{" "}
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

  // ❌ Modal version closed
  if (!isOpen) return null;

  // 👉 Modal version
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-[#7c3aed]">Sign Up</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-[#7c3aed] text-white py-2 rounded hover:bg-[#6d28d9] transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
