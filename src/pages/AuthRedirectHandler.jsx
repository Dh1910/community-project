import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserProfile = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        return navigate('/login');
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!profile || profileError) {
        navigate('/create-profile');
      } else {
        navigate('/profile');
      }
    };

    checkUserProfile();
  }, [navigate]);

  return null;
};

export default AuthRedirectHandler;
