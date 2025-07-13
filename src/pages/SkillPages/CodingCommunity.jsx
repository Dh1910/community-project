import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PostProjectModal from './PostProjectModal';
import { useNavigate } from 'react-router-dom';

const CodingCommunity = () => {
  const [members, setMembers] = useState([]);
  const [user, setUser] = useState(null);
  const [codingCommunityId, setCodingCommunityId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [joinedProjects, setJoinedProjects] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [activeMessageProjectId, setActiveMessageProjectId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchCodingCommunityId = async () => {
      const { data, error } = await supabase
        .from('communities')
        .select('id')
        .eq('name', 'Coding')
        .single();

      if (data?.id) {
        setCodingCommunityId(data.id);
      } else {
        console.error("Coding community not found:", error);
      }
    };

    fetchCodingCommunityId();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!codingCommunityId) return;

      const { data, error } = await supabase
        .from('user_communities')
        .select('user_id, profiles(full_name, avatar_url)')
        .eq('community_id', codingCommunityId);

      if (error) {
        console.error("Error fetching members:", error);
      } else {
        setMembers(data);
      }
    };

    fetchMembers();
  }, [codingCommunityId]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        id,
        title,
        description,
        skill,
        created_at,
        creator_id,
        profiles(full_name),
        project_members(user_id)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching projects:', error);
    } else {
      setProjects(data);
    }
  };

  useEffect(() => {
    const fetchJoinedProjects = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (data?.id) {
        const profileId = data.id;

        const { data: joinedData, error: joinedError } = await supabase
          .from('project_members')
          .select('project_id')
          .eq('user_id', profileId);

        if (joinedData) {
          const ids = joinedData.map((item) => item.project_id);
          setJoinedProjects(ids);
        } else {
          console.error("❌ Error fetching joined projects:", joinedError);
        }
      } else {
        console.error("❌ Couldn't find profile ID for current user");
      }
    };

    fetchJoinedProjects();
  }, [user]);

  const handleProjectPosted = () => {
    fetchProjects();
  };

  const handleJoinProject = async (projectId) => {
    if (!user?.id) {
      console.error("❌ No user logged in.");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      console.error("❌ Error fetching profile ID:", profileError || "Profile not found");
      return;
    }

    const profileId = profile.id;
    console.log("✅ Profile ID found:", profileId);

    if (joinedProjects.includes(projectId)) {
      console.log("⚠️ Already joined project:", projectId);
      return;
    }

    const { error } = await supabase.from('project_members').insert([
      {
        project_id: projectId,
        user_id: profileId,
      },
    ]);

    if (error) {
      console.error("❌ Error inserting into project_members:", error);
    } else {
      console.log("✅ Successfully joined project:", projectId);
      setJoinedProjects((prev) => [...prev, projectId]);
      fetchProjects();
    }
  };

  const handleUnjoinProject = async (projectId) => {
    if (!user?.id) return;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) return;

    const profileId = profile.id;

    const { error: deleteError } = await supabase
      .from('project_members')
      .delete()
      .eq('project_id', projectId)
      .eq('user_id', profileId);

    if (!deleteError) {
      setJoinedProjects((prev) => prev.filter((id) => id !== projectId));
      fetchProjects();
    }
  };

  const handleSendMessage = async (creatorId) => {
    if (!messageText.trim()) return;

    const { error } = await supabase.from('messages').insert([
      {
        sender_id: user.id,
        receiver_id: creatorId,
        content: messageText.trim(),
      },
    ]);

    if (!error) {
      setMessageText('');
      setActiveMessageProjectId(null);
    }
  };

  return (
    <>
      <Header />
      <div className="pt-28 px-6 pb-20 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-indigo-700">👨‍💻 Coding Community</h1>
          <p className="text-gray-700 mb-8 text-lg">
            Welcome to the <span className="font-semibold">Coding Community</span>!<br />
            Connect, collaborate, and grow with fellow passionate coders. Share your journey, learn from others, and build something amazing together!
          </p>

          <div className="flex justify-start mb-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              + Post New Project
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">👥 Members</h2>

          {members.length === 0 ? (
            <p className="text-gray-500">No members found yet. Be the first to join!</p>
          ) : (
            <p className="text-gray-700 mb-6">Total members: <strong>{members.length}</strong></p>
          )}

          <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-4">💡 Project Ideas</h2>

          {projects.length === 0 ? (
            <p className="text-gray-500">No projects posted yet. Be the first to post an idea!</p>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-700 mb-1">{proj.title}</h3>
                    <p className="text-gray-700 mb-2">{proj.description}</p>
                    <span className="inline-block text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded mb-2">
                      {proj.skill}
                    </span>
                    <p className="text-xs text-gray-500 mb-2">
                      Posted by {proj.profiles?.full_name || 'Unknown'}
                    </p>

                    <div className="mt-2">
                      <h4 className="text-sm font-semibold text-gray-600 mb-1">👥 Team Members:</h4>
                      <p className="text-sm text-gray-800">
                        {proj.project_members?.length || 0} member(s)
                      </p>
                    </div>
                  </div>

                  {joinedProjects.includes(proj.id) ? (
                    <div className="mt-4 flex flex-col gap-2">
                      <button
                        onClick={() => handleUnjoinProject(proj.id)}
                        className="px-4 py-2 rounded text-sm bg-red-100 text-red-600 hover:bg-red-200"
                      >
                        ❌ Unjoin Project
                      </button>
                      <button
                        onClick={() => setActiveMessageProjectId(proj.id)}
                        className="text-sm text-indigo-700 underline text-left hover:text-indigo-900"
                      >
                        📩 Message the creator
                      </button>
                      {activeMessageProjectId === proj.id && (
                        <div className="mt-2">
                          <textarea
                            className="w-full border rounded p-2 text-sm"
                            rows={2}
                            placeholder="Type your message..."
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                          ></textarea>
                          <button
                            onClick={() => handleSendMessage(proj.creator_id)}
                            className="mt-1 px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                          >
                            Send Message
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleJoinProject(proj.id)}
                      className="mt-4 px-4 py-2 rounded text-sm bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      + Join Project
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <PostProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProjectPosted={handleProjectPosted}
      />

      <Footer />
    </>
  );
};

export default CodingCommunity;
