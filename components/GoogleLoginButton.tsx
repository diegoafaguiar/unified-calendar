import { supabase } from '../lib/supabaseClient';

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      console.error('Error logging in with Google:', error.message);
    }
  };

  return (
    <button onClick={handleGoogleLogin} className="btn btn-primary">
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
