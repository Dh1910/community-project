import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const CreatePostModal = ({ isOpen, onClose, existingPost = null, onPostUpdated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [userId, setUserId] = useState(null);
  const [skill, setSkill] = useState('');
  const [mood, setMood] = useState('');
  const [duration, setDuration] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title || '');
      setContent(existingPost.content || '');
      setImageUrl(existingPost.image_url || '');
      setVisibility(existingPost.visibility || 'public');
      setSkill(existingPost.skill || '');
      setMood(existingPost.mood || '');
      setDuration(existingPost.duration || '');
    } else {
      setTitle('');
      setContent('');
      setImageUrl('');
      setVisibility('public');
      setSkill('');
      setMood('');
      setDuration('');
    }
    setImageError(false);
  }, [existingPost]);

  const handlePublish = async () => {
    if (!userId) {
      alert("User not found. Please log in.");
      return;
    }

    if (!title || !content || !skill || !mood || !duration) {
      alert("Please fill all the fields.");
      return;
    }

    const postData = {
      user_id: userId,
      title,
      content,
      image_url: imageUrl,
      visibility,
      skill,
      mood,
      duration,
      created_at: new Date().toISOString()
    };

    let result;
    if (existingPost) {
      result = await supabase
        .from('posts')
        .update(postData)
        .eq('id', existingPost.id)
        .select('*')
        .single();
    } else {
      result = await supabase
        .from('posts')
        .insert([postData])
        .select('*')
        .single();
    }

    if (result.error) {
      alert("❌ Failed to publish post: " + result.error.message);
    } else {
      alert(existingPost ? "✅ Post updated!" : "✅ Post published!");
      onClose();
      if (onPostUpdated) onPostUpdated(result.data);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {existingPost ? '🛠 Edit Post' : '📝 Create New Post'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 text-2xl">×</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-sm"
              placeholder="Enter post title"
            />
          </div>

          {/* Content */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-sm resize-none"
              rows={4}
              placeholder="Share your thoughts..."
            />
          </div>

          {/* Skill */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Skill</label>
            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-sm"
            >
              <option value="">Select a skill</option>
              <option value="Cooking">Cooking</option>
              <option value="Design">Design</option>
              <option value="Photography">Photography</option>
              <option value="Music">Music</option>
              <option value="Fitness">Fitness</option>
              <option value="Coding">Coding</option>
              <option value="Languages">Languages</option>
            </select>
          </div>

          {/* Mood */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mood</label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-sm"
            >
              <option value="">Select mood</option>
              <option value="Motivated">Motivated</option>
              <option value="Focused">Focused</option>
              <option value="Tired">Tired</option>
              <option value="Excited">Excited</option>
              <option value="Calm">Calm</option>
              <option value="Confused">Confused</option>
            </select>
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (in minutes)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-sm"
              placeholder="How long did you practice?"
              min={1}
            />
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setImageError(false);
              }}
              className="w-full border rounded-lg px-4 py-2 text-sm"
              placeholder="Paste image URL here"
            />
            {imageUrl && !imageError && (
              <img
                src={imageUrl}
                alt="Preview"
                onError={() => setImageError(true)}
                className="mt-3 rounded-lg max-h-48 object-cover w-full border"
              />
            )}
            {imageError && (
              <p className="text-sm text-red-500 mt-1">⚠️ Invalid image URL</p>
            )}
          </div>

          {/* Visibility */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
            <div className="flex gap-4">
              <label className="flex items-center text-sm">
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
              <label className="flex items-center text-sm">
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
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-3 bg-white">
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
            {existingPost ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
