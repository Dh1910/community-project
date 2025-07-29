import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CreateCommunity = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageError, setImageError] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const debounceRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setError('Please log in to create a community.');
        navigate('/login');
        return;
      }
      setUserId(data.user.id);
    };
    fetchUser();
  }, [navigate]);

  // ✅ Live image URL validation with extension check & load fail fallback
  useEffect(() => {
    if (!imageUrl) {
      setImageError(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
      const isValidExtension = validExtensions.some(ext =>
        imageUrl.toLowerCase().includes(ext)
      );

      if (!isValidExtension) {
        setImageError(true);
        return;
      }

      const img = new Image();
      img.src = `${imageUrl}?t=${Date.now()}`; // 🔄 prevent cache
      img.onload = () => setImageError(false);
      img.onerror = () => setImageError(true);
    }, 500);
  }, [imageUrl]);

  const handleCreate = async () => {
    if (!name.trim()) {
      setError('Community name is required.');
      return;
    }

    if (!imageUrl.trim()) {
      setError('Community image URL is required.');
      return;
    }

    if (imageError) {
      setError('Please enter a valid image URL before creating.');
      return;
    }

    if (!userId) {
      setError('You must be logged in to create a community.');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('communities')
      .insert([
        {
          name,
          description,
          image_url: imageUrl,
          created_by: userId,
        },
      ])
      .select();

    if (error) {
      setError(`Failed to create community: ${error.message}`);
      setLoading(false);
      return;
    }

    const newCommunity = data[0];

    await supabase.from('user_communities').insert([
      {
        user_id: userId,
        community_id: newCommunity.id,
        joined_at: new Date(),
      },
    ]);

    setLoading(false);
    alert('Community created and joined successfully!');
    setName('');
    setDescription('');
    setImageUrl('');
    navigate('/community', { replace: true });
    window.location.reload();
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-28 px-4 bg-gray-50 pb-16">
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow relative">

          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl font-semibold transition"
            title="Close"
          >
            ×
          </button>

          <h2 className="text-2xl font-bold mb-6 text-center text-[#7c3aed]">
            Create a New Community
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
          )}

          <input
            type="text"
            placeholder="Community Name"
            className="w-full border px-3 py-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Community Description"
            className="w-full border px-3 py-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Image URL (required)"
            className="w-full border px-3 py-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          {/* ✅ Show preview if image URL is valid */}
          {imageUrl && !imageError && (
            <img
              src={`${imageUrl}?t=${Date.now()}`} // cache busting
              alt="Preview"
              className="w-full h-48 object-cover rounded mb-2"
            />
          )}

          {/* ❌ Show warning if image URL is invalid */}
          {imageError && (
            <p className="text-red-500 text-sm mb-4">
              ⚠️ Invalid image URL. Please enter a valid link ending in .jpg, .png, etc.
            </p>
          )}

          <button
            onClick={handleCreate}
            className="w-full bg-[#7c3aed] text-white py-2 rounded hover:bg-[#6b21a8] transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Community'}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateCommunity;
