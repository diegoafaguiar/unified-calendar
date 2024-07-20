"use client";

import { supabase } from "../lib/supabaseClient";
import { Button } from "./ui/button";

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  return (
    <Button onClick={handleGoogleLogin} className="btn btn-primary m-2">
      Login with Google
    </Button>
  );
};

export default GoogleLoginButton;
