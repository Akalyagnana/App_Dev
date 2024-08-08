import React, { useState } from 'react';
import './Payment.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cost, pickupId } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handlePayment = () => {
    // Handle payment logic based on selected payment method
    alert(`Payment successful via ${paymentMethod.toUpperCase()}!`);
    navigate('/');
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      <p>Pickup ID: {pickupId}</p>
      <p>Total Cost: ₹{cost}</p>

      <div className="payment-options">
        <label>
          <input 
            type="radio" 
            value="cod" 
            checked={paymentMethod === 'cod'} 
            onChange={(e) => setPaymentMethod(e.target.value)} 
          />
          Cash on Delivery
        </label>
        <label>
          <input 
            type="radio" 
            value="upi" 
            checked={paymentMethod === 'upi'} 
            onChange={(e) => setPaymentMethod(e.target.value)} 
          />
          UPI
        </label>
        <label>
          <input 
            type="radio" 
            value="paypal" 
            checked={paymentMethod === 'paypal'} 
            onChange={(e) => setPaymentMethod(e.target.value)} 
          />
          PayPal
        </label>
      </div>

      {paymentMethod === 'upi' && (
        <div className="upi-details">
          <p>Please use the following UPI ID to complete the payment:</p>
          <p><strong>your-upi-id@bank</strong></p>
        </div>
      )}

      {paymentMethod === 'paypal' && (
        <div className="paypal-details">
          <p>You will be redirected to PayPal to complete the payment.</p>
        </div>
      )}

      <button className="pay-button" onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Payment;
