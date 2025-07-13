import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Inbox = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const currentUser = authData?.user;
      setUser(currentUser);

      if (!currentUser) return;

      const { data, error } = await supabase
        .from('messages')
        .select(`id, content, created_at, sender_id, profiles:sender_id(full_name)`)
        .eq('receiver_id', currentUser.id)
        .order('created_at', { ascending: false });

      if (!error) {
        setMessages(data);
      }
    };

    fetchMessages();
  }, []);

  return (
    <>
      <Header />
      <div className="pt-28 min-h-screen px-6 pb-20 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">📬 Inbox</h2>

          {messages.length === 0 ? (
            <p className="text-gray-600">No messages received yet.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="border rounded p-4 bg-gray-50">
                  <p className="text-sm text-gray-700">
                    <strong>From:</strong> {msg.profiles?.full_name || msg.sender_id}
                  </p>
                  <p className="text-gray-800 mt-2">{msg.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Inbox;
