import React, { useEffect } from 'react';

const StartDiscussionModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative animate-fadeIn max-h-[80vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Start New Discussion</h2>

        {/* Title */}
        <label className="text-sm font-medium">Discussion Title</label>
        <input
          type="text"
          placeholder="What would you like to discuss?"
          className="w-full border rounded-md px-3 py-2 mt-1 mb-4 text-sm focus:outline-primary"
        />

        {/* Content */}
        <label className="text-sm font-medium">Initial Question or Topic</label>
        <textarea
          placeholder="Share your question or topic to start the discussion..."
          rows={4}
          className="w-full border rounded-md px-3 py-2 mt-1 mb-4 text-sm"
        ></textarea>

        {/* Categories */}
        <div className="mb-4">
          <label className="text-sm font-medium">Category</label>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-3 py-1 bg-[#e9d5ff] text-[#7c3aed] rounded-full text-xs font-medium">Technology</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Creative Arts</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Health & Fitness</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Languages</span>
            <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-medium hover:bg-gray-300">+ Add Category</button>
          </div>
        </div>

        {/* Discussion Type */}
        <div className="mb-4">
          <label className="text-sm font-medium">Discussion Type</label>
          <div className="flex flex-wrap gap-4 mt-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="radio" name="type" defaultChecked /> Question
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="type" /> Debate
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="type" /> General
            </label>
          </div>
        </div>

        {/* Visibility */}
        <div className="mb-6">
          <label className="text-sm font-medium">Visibility</label>
          <div className="flex items-center gap-6 mt-2 text-sm">
            <label><input type="radio" name="visibility" defaultChecked className="mr-1" /> Public</label>
            <label><input type="radio" name="visibility" className="mr-1" /> Members Only</label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100 text-sm">
            Cancel
          </button>
          <button className="px-4 py-2 rounded-md bg-[#7c3aed] text-white hover:bg-[#6b21a8] text-sm">
            Start Discussion
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartDiscussionModal;