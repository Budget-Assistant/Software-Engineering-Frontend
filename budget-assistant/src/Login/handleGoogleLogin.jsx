export const handleGoogleLogin = () => {
    // Redirect to the backend's Google OAuth endpoint
    window.location.href = 'http://localhost:3001/auth/google';
  };