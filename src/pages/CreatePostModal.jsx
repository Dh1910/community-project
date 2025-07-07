import React, { useEffect } from 'react';

const CreatePostModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md max-h-[80vh] overflow-y-auto rounded-lg shadow-lg p-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-base font-semibold mb-3">Create New Post</h2>

        {/* Title */}
        <label className="text-sm font-medium">Title</label>
        <input
          type="text"
          placeholder="Enter post title"
          className="w-full border rounded-md px-3 py-1.5 mt-1 mb-3 text-sm focus:outline-primary"
        />

        {/* Content */}
        <label className="text-sm font-medium">Content</label>
        <textarea
          placeholder="Write post content..."
          rows={3}
          className="w-full border rounded-md px-3 py-1.5 mt-1 mb-3 text-sm"
        ></textarea>

        {/* Tags */}
        <div className="mb-3">
          <label className="text-sm font-medium">Category & Tags</label>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-1 bg-[#e9d5ff] text-[#7c3aed] rounded-full text-xs font-medium">Technology</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Creative</span>
            <button className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-medium hover:bg-gray-300">+ Add</button>
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label className="text-sm font-medium">Add Image</label>
          <div className="border-2 border-dashed rounded-md p-3 text-center text-sm text-gray-500 mt-1 cursor-pointer hover:border-primary/60">
            <i className="ri-image-add-line text-xl mb-1 inline-block" />
            <p className="text-xs">Click or drag to upload</p>
          </div>
        </div>

        {/* Visibility */}
        <div className="mb-4">
          <label className="text-sm font-medium">Visibility</label>
          <div className="flex items-center gap-4 mt-2 text-sm">
            <label><input type="radio" name="visibility" defaultChecked className="mr-1" /> Public</label>
            <label><input type="radio" name="visibility" className="mr-1" /> Private</label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-3 py-1.5 rounded-md border text-gray-600 hover:bg-gray-100 text-sm">
            Cancel
          </button>
          <button className="px-3 py-1.5 rounded-md bg-[#7c3aed] text-white hover:bg-[#6b21a8] text-sm">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
