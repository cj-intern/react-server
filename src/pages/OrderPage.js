// src/pages/OrdersPage.js

import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import './OrdersPage.css';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [email, setEmail] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        Auth.currentAuthenticatedUser()
          .then(user => {
            setEmail(user.attributes.email);
            setIsAuthenticated(true)
          })
          .catch(() => setIsAuthenticated(false));
      }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const session = await Auth.currentSession();
                const token = session.getIdToken().getJwtToken();
                const response = await fetch(`http://intern-final-alb-724647037.ap-northeast-2.elb.amazonaws.com:3030/order/${email}` , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
        
                const data = await response.json();
                const orderMap = new Map();
                for (const order of data) {
                    const key = `${order.name}-${order.productName}-${order.price}-${order.address}`;
                    if (!orderMap.has(key)) {
                        orderMap.set(key, { ...order, number: 1 });
                    } else {
                        const existingOrder = orderMap.get(key);
                        orderMap.set(key, { ...order, number: existingOrder.number + 1 });
                    }
                }
                //console.log(Array.from(orderMap.values()))
                setOrders(Array.from(orderMap.values()));
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [email, isAuthenticated]);

    return (
        <div className="orders-page">
            <h1>Orders</h1>
            <ul className="orders-list">
                {orders.map((order, index) => (
                    <li key={index} className="order-item">
                        <img src={order.imageUrl} alt={order.productName} className="order-image" />
                        <div className="order-details">
                            <h2>{order.productName}</h2>
                            <p>Name: {order.name}</p>
                            <p>Price: {order.price} KRW</p>
                            <p>Address: {order.address}</p>
                            <p>Total: {order.number}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrdersPage;
