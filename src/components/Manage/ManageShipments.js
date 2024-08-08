import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import UserContext from '../Context/UserContext';
import axios from 'axios';
import './ManageShipments.css'; 
import Footer from '../footer/Footer';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const ManageShipments = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pickup');
        const userOrders = response.data.filter(order => order.userId === user.id);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Error fetching orders. Please try again later.');
      }
    };

    fetchOrders();
  }, [user.id]);

  const handleDelete = async (orderId, pickUpTime) => {
    if (isPastPickupTime(pickUpTime)) {
      alert('Cannot delete the shipment. Pickup time has passed.');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/pickup/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
      setError('Error deleting order. Please try again later.');
    }
  };

  const isPastPickupTime = (pickUpTime) => {
    const now = new Date();
    const [hours, minutes] = pickUpTime.split(':');
    const pickupDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)

    if (pickupDateTime<now){
      return  true;
    }else{
      return false;
    }
  };

  return (
    <div>
      <Header />
      <h1>Manage Shipments</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {orders.length === 0 ? (
        <p>No shipments found.</p>
      ) : (
        <div className="orders-container">
          {orders.map(order => (
            <div className="order-box" key={order.id} style={{ position: 'relative' }}>
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Item:</strong> {order.item}</p>
              <p><strong>Weight:</strong> {order.weight} kg</p>
              <p><strong>Pick Up Time:</strong> {order.pickUpTime}</p>
              <p><strong>Drop Address:</strong> {order.dropAddress}</p>
              <IconButton 
                onClick={() => handleDelete(order.id, order.pickUpTime)}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                }}
                aria-label="delete"
              >
                <DeleteIcon style={{ color: 'red' }} />
              </IconButton>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ManageShipments;
