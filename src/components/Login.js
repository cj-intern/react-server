// src/components/Login.js
import React, { useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

function Login({ signOut, user }) {
  const navigate = useNavigate();
  navigate('/main');
  
  useEffect(() => {
    if (user) {
      navigate('/main'); // Redirect to the main page after login
    }
  }, []);

  return (
    <div>
      <h1>Welcome to the Skin Care App</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default withAuthenticator(Login);
