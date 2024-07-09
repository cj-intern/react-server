// src/App.js
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProductPage from './pages/ProductPage';
import Header from './components/Header';
import CustomSignUp from './components/CustomSignUp'
import './App.css';
import HealthCheck from './pages/healthCheck';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/health-check') {
      Auth.currentAuthenticatedUser()  
        .then(user => {
          setIsAuthenticated(true);
          const attributes = Auth.userAttributes(user);
          
          attributes.then(result => {
            const nameAttribute = result.find(attribute => attribute.Name === 'name');
            setUserName(nameAttribute['Value']);
          });
        })
        .catch(() => {
          setIsAuthenticated(false);
          navigate('/login');
        });
    }
  }, [navigate]);

  return (
    <div>
      {isAuthenticated && <Header userName={userName}/>}
      <Routes>
        <Route path="/health-check" element={<HealthCheck />}/>
        <Route path="/" element={<MainPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/login" element={<MainPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/sign-up' element={<CustomSignUp />}  />
      </Routes>
    </div>
  );
}


export default App;

