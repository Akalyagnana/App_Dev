import React, { useState } from 'react';
import './Info.css';
import Header from '../Header/Header';
import Footer from '../footer/Footer';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import deliveryImage from '../../img/delivery-image.jpg';
import trackingIcon from '../../img/track.png';
import inventoryIcon from '../../img/inventry.png';
import schedulingIcon from '../../img/auto_schedule.png';

const Info = () => {
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleTracklogin = () => {
    if (!orderId) {
      setError('Order ID is required');
      return;
    }
    setError('');
    navigate('/tracker', { state: { orderId } });
  };

  return (
    <div>
      <Header />

      <div className="info-container">
        <div className="text-image-container">
          <div className="text-section">
            <h1>Welcome to LMS Solutions</h1>
            <p>Discover our services and manage your logistics effortlessly with our platform.</p>
            <Button 
              variant="contained" 
              size="large" 
              onClick={handleLoginClick}
              className="login-button"
            >
              Login
            </Button>
          </div>
          <div className="image-section">
            <img src={deliveryImage} alt="Delivery" />
          </div>
        </div>
      </div>

      
      <div className="boxed-columns-container">
        <div className="boxed-column">
          <img src={trackingIcon} alt="Tracking Icon" className="column-icon" />
          <div className="column-text">
            <h3>Real-Time Tracking</h3>
            <p>Keep track of your shipments and deliveries in real-time. Monitor the exact location of your vehicles and cargo with our advanced GPS and tracking technology.</p>
          </div>
        </div>
        <div className="boxed-column">
          <img src={inventoryIcon} alt="Inventory Icon" className="column-icon" />
          <div className="column-text">
            <h3>Inventory Management</h3>
            <p>Manage your inventory efficiently with our comprehensive tools. Track stock levels, manage orders, and forecast demand to ensure you never run out of essential items.</p>
          </div>
        </div>
        <div className="boxed-column">
          <img src={schedulingIcon} alt="Scheduling Icon" className="column-icon" />
          <div className="column-text">
            <h3>Automated Scheduling</h3>
            <p>Optimize your logistics operations with automated scheduling. Our system helps you plan routes, manage delivery times, and allocate resources effectively.</p>
          </div>
        </div>
      </div>

      {/* Order Tracking Section */}
      <div className="additional-container">
        <div className="order-tracking-left">
          <img src={trackingIcon} alt="Track Icon" className="order-tracking-icon" />
          <div className="order-tracking-text">
            <h2>Track Your Order</h2>
            <p>Don't want to sign up? Just track your order.</p>
          </div>
        </div>
        <div className="order-tracking-right">
          <form onSubmit={handleTracklogin}>
            <div>
              <TextField
                id="orderId"
                label="Order ID"
                variant="outlined"
                style={{ width: '100%', maxWidth: '500px' }}
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                error={!!error}
                helperText={error}
              />
            </div>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              style={{ marginTop: '10px' }}
            >
              Track Order
            </Button>
          </form>
        </div>
      </div>

      

      <Footer />
    </div>
  );
};

export default Info;