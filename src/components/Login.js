// src/components/Login.js
import React, { useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

function Login({ signOut, user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/'); // Redirect to the main page after login
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Welcome to the Skin Care App</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default withAuthenticator(Login);
