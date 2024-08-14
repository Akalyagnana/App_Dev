import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import './Tracker.css';
import Footer from '../footer/Footer';
import { TokenContext } from '../Context/TokenProvider';

const Tracker = () => {
  const location = useLocation();
  const { token } = useContext(TokenContext);
  const { orderId } = location.state || {};
  const [pickupData, setPickupData] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [eta, setEta] = useState('');

  useEffect(() => {
    const fetchPickupData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/pickups/${orderId}/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.data) {
          setPickupData(response.data);
          checkPickupStatus(response.data.pickuptime); 
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
  }, [orderId, token]);

  const checkPickupStatus = (pickUpTime) => {
    const now = new Date();
    const pickupDateTime = new Date(pickUpTime);

    if (pickupDateTime <= now) {
      setStatus('Pickup made');
      const etaTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);
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
          <p className="tracker-info">
            <span className='TrackerSpan'>Order ID:</span> {orderId}
          </p>
          <p className="tracker-info">
            <span className='TrackerSpan'>Item:</span> {pickupData.item}
          </p>
          <p className="tracker-info">
            <span className='TrackerSpan'>Weight:</span> {pickupData.weight} kg
          </p>
          <p className="tracker-info">
            <span className='TrackerSpan'>Pick Up Time:</span> {new Date(pickupData.pickuptime).toLocaleString()}
          </p>
          <p className="tracker-info">
            <span className='TrackerSpan'>Drop Address:</span> {pickupData.dropaddress}
          </p>
          <p className={status === 'Pickup made' ? 'status-made' : 'status-not-made'}>
            Status: {status}
          </p>
          {eta && <p className="eta-info">Estimated Time of Arrival: {eta}</p>}
        </div>
      ) : !error ? (
        <p>Loading...</p>
      ) : null}
      <Footer />
    </div>
  );
}

export default Tracker;
