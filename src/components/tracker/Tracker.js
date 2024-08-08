import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import './Tracker.css';
import Footer from '../footer/Footer';

const Tracker = () => {
  const location = useLocation();
  const { orderId } = location.state || {};
  const [pickupData, setPickupData] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [eta, setEta] = useState('');

  useEffect(() => {
    const fetchPickupData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/pickup/${orderId}`);
        if (response.data) {
          setPickupData(response.data);
          checkPickupStatus(response.data.pickUpTime);
        } else {
          setError('No information found for the provided order ID.');
        }
      } catch (error) {
        console.error('Error fetching pickup data:', error);
        setError('No information found for the provided order ID.');
      }
    };

    if (orderId) {
      fetchPickupData();
    } else {
      setError('No order ID provided.');
    }
  }, [orderId]);

  const checkPickupStatus = (pickUpTime) => {
    const now = new Date();
    const [hours, minutes] = pickUpTime.split(':');
    const pickupDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    if (pickupDateTime <= now) {
      setStatus('Pickup made');
      const etaTime = new Date(pickupDateTime.getTime() + 2 * 60 * 60 * 1000);
      setEta(etaTime.toLocaleString());
    } else {
      setStatus('Pickup not yet made');
      setEta('');
    }
  };

  return (
    <div>
      <Header />
      <h2>Tracking Information</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {pickupData ? (
        <div className="tracker-container">
          <p className="tracker-info">Order ID: {orderId}</p>
          <p className="tracker-info">Item: {pickupData.item}</p>
          <p className="tracker-info">Weight: {pickupData.weight} kg</p>
          <p className="tracker-info">Pick Up Time: {pickupData.pickUpTime}</p>
          <p className="tracker-info">Drop Address: {pickupData.dropAddress}</p>
          <p className={status === 'Pickup made' ? 'status-made' : 'status-not-made'}>
            Status: {status}
          </p>
          {eta && <p className="eta-info">Estimated Time of Arrival: {eta}</p>}
        </div>
      ) : !error ? (
        <p>Loading...</p>
      ) : null}

      <Footer/>
    </div>
  );
}

export default Tracker;
