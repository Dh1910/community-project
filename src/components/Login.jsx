const Login = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-4 text-gray-500 text-2xl">&times;</button>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" placeholder="Email" className="w-full border p-2 mb-3 rounded" />
        <input type="password" placeholder="Password" className="w-full border p-2 mb-3 rounded" />
        <button className="w-full bg-[#7c3aed] text-white py-2 rounded">Login</button>
      </div>
    </div>
  );
};

export default Login;