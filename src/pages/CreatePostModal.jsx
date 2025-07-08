import React, { useEffect, useState } from 'react';

const CreatePostModal = ({ isOpen, onClose }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg mx-auto rounded-xl shadow-2xl p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
          📝 Create New Post
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Your post title..."
            className="w-full border rounded-lg px-4 py-2 mt-1 text-sm focus:ring-2 focus:ring-violet-300 focus:outline-none"
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Content</label>
          <textarea
            rows={3}
            placeholder="Share your thoughts..."
            className="w-full border rounded-lg px-4 py-2 mt-1 text-sm focus:ring-2 focus:ring-violet-300 focus:outline-none resize-none"
          ></textarea>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Tags</label>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-violet-100 text-violet-700">Coding</span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">Fitness</span>
            <button className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600">+ Add</button>
          </div>
        </div>

        {/* Image URL */}
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

        {/* Visibility */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">Visibility</label>
          <div className="flex gap-4 mt-2">
            <label className="text-sm text-gray-600">
              <input type="radio" name="visibility" defaultChecked className="mr-2 accent-violet-600" />
              Public
            </label>
            <label className="text-sm text-gray-600">
              <input type="radio" name="visibility" className="mr-2 accent-violet-600" />
              Private
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
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
