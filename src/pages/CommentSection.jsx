// This is a modular CommentSection component for posts in React
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      const { data: user } = await supabase.auth.getUser();
      setUserId(user?.user?.id);

      const { data, error } = await supabase
        .from('comments')
        .select('*, profiles(full_name, avatar_url)')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) console.error('Error fetching comments:', error);
      else setComments(data);
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { error } = await supabase.from('comments').insert({
      post_id: postId,
      user_id: userId,
      text: newComment
    });

    if (error) {
      console.error('Error posting comment:', error);
    } else {
      setNewComment('');
      const { data: updatedComments } = await supabase
        .from('comments')
        .select('*, profiles(full_name, avatar_url)')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      setComments(updatedComments);
    }
  };

  return (
    <div className="mt-4 border-t pt-2">
      <h4 className="text-sm font-semibold mb-2 text-gray-700">Comments ({comments.length})</h4>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring"
        />
      </form>
      <div className="space-y-2">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-2 text-sm">
            <img
              src={comment.profiles?.avatar_url || 'https://via.placeholder.com/40'}
              alt="User"
              className="w-6 h-6 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-800">{comment.profiles?.full_name || 'User'}</p>
              <p className="text-gray-600 text-sm">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
