import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const CreatePostModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Prevent background scroll
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUser();
  }, []);

  const handlePublish = async () => {
    if (!userId) {
      alert("User not found. Please log in.");
      return;
    }

    if (!title || !content) {
      alert("Title and content are required.");
      return;
    }

    const { error } = await supabase.from('posts').insert([
      {
        user_id: userId,
        title,
        content,
        image_url: imageUrl,
        visibility,
        created_at: new Date().toISOString()
      }
    ]);

    if (error) {
      alert("Failed to publish post: " + error.message);
    } else {
      alert("✅ Post published!");
      onClose(); // Close modal
      // Optionally clear form
      setTitle('');
      setContent('');
      setImageUrl('');
      setVisibility('public');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg mx-auto rounded-xl shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
          📝 Create New Post
        </h2>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your post title..."
            className="w-full border rounded-lg px-4 py-2 mt-1 text-sm focus:ring-2 focus:ring-violet-300 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Content</label>
          <textarea
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full border rounded-lg px-4 py-2 mt-1 text-sm focus:ring-2 focus:ring-violet-300 focus:outline-none resize-none"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste image URL"
            className="w-full border rounded-lg px-4 py-2 mt-1 text-sm focus:ring-2 focus:ring-violet-300 focus:outline-none"
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="mt-3 rounded-lg max-h-48 object-cover w-full border"
            />
          )}
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">Visibility</label>
          <div className="flex gap-4 mt-2">
            <label className="text-sm text-gray-600">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={visibility === 'public'}
                onChange={() => setVisibility('public')}
                className="mr-2 accent-violet-600"
              />
              Public
            </label>
            <label className="text-sm text-gray-600">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={visibility === 'private'}
                onChange={() => setVisibility('private')}
                className="mr-2 accent-violet-600"
              />
              Private
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handlePublish}
            className="px-4 py-2 text-sm font-medium rounded-md bg-violet-600 text-white hover:bg-violet-700"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
