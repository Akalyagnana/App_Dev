import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';
import DeleteIcon from '@mui/icons-material/Delete';
import UserContext from '../Context/UserContext'; 

const Admin = () => {
  const { user } = useContext(UserContext); 
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users');
        const nonAdminUsers = response.data.filter(user => user.name !== 'Admin'); // Filter out admin user
        setUsers(nonAdminUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user. Please try again later.');
    }
  };

  useEffect(() => {
    if (selectedUserId !== null) {
      const fetchShipments = async () => {
        try {
          const response = await axios.get('http://localhost:8080/pickup');
          const userShipments = response.data.filter(shipment => shipment.userId === selectedUserId);
          setShipments(userShipments);
        } catch (error) {
          console.error('Error fetching shipments:', error);
          setError('Error fetching shipments. Please try again later.');
        }
      };

      fetchShipments();
    }
  }, [selectedUserId]);

  if (!user || user.name !== 'Admin') { 
    return <p className="access-denied">Access Denied</p>;
}

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-header">Admin Dashboard</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="users-section">
        <h2 className="section-title">Users</h2>
        <ul className="user-list">
          {users.map(user => (
            <li 
              key={user.id} 
              className="user-item"
            >
              <span 
                className="user-name"
                onClick={() => setSelectedUserId(user.id)}
              >
                {user.name}
              </span>
              <DeleteIcon 
                className="delete-icon" 
                onClick={() => handleDeleteUser(user.id)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="shipments-section">
        <h2 className="section-title">
          Shipments ({selectedUserId !== null ? shipments.length : 0})
        </h2>
        {selectedUserId === null ? (
          <p className="default-message">Select a user to view their shipments.</p>
        ) : (
          <ul className="shipment-list">
            {shipments.map(shipment => (
              <li key={shipment.id} className="shipment-item">
                <div className="shipment-details">
                  <p><strong>Order ID:</strong> {shipment.id}</p>
                  <p><strong>Item:</strong> {shipment.item}</p>
                  <p><strong>Weight:</strong> {shipment.weight} kg</p>
                  <p><strong>Pick Up Time:</strong> {shipment.pickUpTime}</p>
                  <p><strong>Drop Address:</strong> {shipment.dropAddress}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Admin;
