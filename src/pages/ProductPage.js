// src/pages/ProductPage.js
import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

function ProductPage() {
  const [products, setProducts] = useState([]);

  const [email, setemail] = useState('');
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();

        const response = await fetch('https://ecommerce.p-e.kr/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleOrder = async (productId) => {
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();
      const user = await Auth.currentAuthenticatedUser();
      
      const userId = user.attributes.sub; // Assuming 'sub' is the user ID

      const attributes = Auth.userAttributes(user);

      const orderData = {
        'id': email,
        'product_id': productId,
        'address': 'Incheon songdo'
      };

      console.log(attributes)
      attributes.then(result => {
          const emailAttribute = result.find(attribute => attribute.Name === 'email');
          setemail(emailAttribute['Value']);
          orderData['id'] = emailAttribute['Value']
      })
      
      console.log(orderData)
      const response = await fetch('http://intern-order-13953906.ap-northeast-2.elb.amazonaws.com/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="main-container">
      <h1>Product Page</h1>
      <div className="product-container">
        {products.map(product => (
          <div key={product.productId} className="product-item">
            <img src={product.link} alt={product.productName} />
            <h3>{product.productName}</h3>
            <p>{product.price}</p>
            <button onClick={() => handleOrder(product.productId)}>Order</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
