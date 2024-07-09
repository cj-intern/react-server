// src/pages/MainPage.js
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

function MainPage({ signOut, user }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, [user]);

  const products = [
    { id: 1, imageUrl: 'image1.jpg', name: 'Product 1' },
    { id: 2, imageUrl: 'image2.jpg', name: 'Product 2' },
    { id: 3, imageUrl: 'image3.jpg', name: 'Product 3' },
    { id: 4, imageUrl: 'image4.jpg', name: 'Product 4' },
  ];

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to the Skin Care App</h1>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Main Page Content</h1>
      <div>
        <h2>Recommended Skin-Care Products</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {products.map(product => (
            <div key={product.id} style={{ margin: '0 20px' }}>
              <img src={product.imageUrl} alt={product.name} style={{ width: '200px', height: '200px' }} />
              <p>{product.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(MainPage);
