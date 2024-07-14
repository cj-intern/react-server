// src/pages/MainPage.js
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import './MainPage.css';

function MainPage({ user }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setIsAuthenticated(true);
        setEmail(user.attributes.email);
      })
      .catch(() => setIsAuthenticated(false));
  }, [user]);

  useEffect(() => {
    if (email) {
      const fetchUserInfo = async () => {
        try {
          const session = await Auth.currentSession();
          const token = session.getIdToken().getJwtToken();

          const response = await fetch(`https://ecommerce.p-e.kr/user/${email}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const data = await response.json();
          setUserInfo(data);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };

      const fetchRecommendedProducts = async () => {
        try {
          const session = await Auth.currentSession();
          const token = session.getIdToken().getJwtToken();

          const response = await fetch('https://ecommerce.p-e.kr/recommend', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ id: email })
          });

          const data = await response.json();
          console.log(data)
          setRecommendedProducts(data);
        } catch (error) {
          console.error('Error fetching recommended products:', error);
        }
      };

      fetchUserInfo();
      fetchRecommendedProducts();
    }
  }, [email]);

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to the Skin Care App</h1>
      </div>
    );
  }

  return (
    <div className="main-container">
      <h1>Main Page Content</h1>
      {userInfo && (
        <div className="user-info">
          <h2>User Information</h2>
          <p><strong>ID:</strong> {userInfo.userId}</p>
          <p><strong>Name:</strong> {userInfo.userName}</p>
          <p><strong>Gender:</strong> {userInfo.gender}</p>
          <p><strong>Skin Type:</strong> {userInfo.skinType}</p>
          <p><strong>Sensitive:</strong> {userInfo.sensitive}</p>
          <p><strong>Acne:</strong> {userInfo.acne}</p>
          <p><strong>Skin Tone:</strong> {userInfo.skinTone}</p>
          <p><strong>Age:</strong> {userInfo.age}</p>
        </div>
      )}
      <hr/>
      <div>
        <h1>Recommended Skin-Care Products</h1>
        <div className="product-container">
          {recommendedProducts.map(product => (
            <div key={product.productId} className="product-item">
              <img src={product.url} alt={product.product_name} />
              <h3>{product.productName}</h3>
              <p><strong>Price:</strong> {product.price} 원</p>
              <p><strong>Moisture:</strong> {product.moisture}</p>
              <p><strong>Sensitivity:</strong> {product.sensitivity}</p>
              <p><strong>Texture:</strong> {product.texture}</p>
              <p><strong>Acne Care:</strong> {product.acne}</p>
              <p><strong>Wrinkle Care:</strong> {product.wrinkle}</p>
              <p><strong>Whitening:</strong> {product.whitening}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Other Products</h2>
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
