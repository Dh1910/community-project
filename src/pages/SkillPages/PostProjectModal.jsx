import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

const PostProjectModal = ({ isOpen, onClose, onProjectPosted }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skill, setSkill] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    // Get current user
    const { data: sessionData } = await supabase.auth.getUser();
    const userId = sessionData?.user?.id;

    if (!userId) {
      alert("You must be logged in.");
      setLoading(false);
      return;
    }

    if (!title || !description || !skill) {
      alert("All fields are required.");
      setLoading(false);
      return;
    }

    // Insert project
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .insert([
        {
          title,
          description,
          skill,
          creator_id: userId
        }
      ])
      .select()
      .single();

    if (projectError) {
      alert('Error posting project');
      console.error(projectError);
      setLoading(false);
      return;
    }

    // Auto-insert creator as team member
    const { error: memberError } = await supabase
      .from('project_members')
      .insert([
        {
          project_id: projectData.id,
          user_id: userId
        }
      ]);

    if (memberError) {
      console.error("Auto-join error:", memberError);
    }

    alert('Project posted successfully!');
    setLoading(false);
    onClose();
    onProjectPosted(); // Refresh project list
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">🚀 Post a New Project</h2>

        <input
          type="text"
          placeholder="Project Title"
          className="w-full p-2 border rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Short Description"
          className="w-full p-2 border rounded mb-3"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Skill Required (e.g., React, Python)"
          className="w-full p-2 border rounded mb-4"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostProjectModal;
