import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';
import DeleteIcon from '@mui/icons-material/Delete';
import UserContext from '../Context/UserContext';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { TokenContext } from '../Context/TokenProvider';
import { useNavigate } from 'react-router-dom';
const Admin = () => {
  const { user } = useContext(UserContext);
  const {token}=useContext(TokenContext);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate=useNavigate()
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/',{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        });
        const nonAdminUsers = response.data.filter(user => user.name !== 'Admin');
        setUsers(nonAdminUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  const handlefeed=()=>{
    navigate('/adminfeed');
  }
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/users/${userId}/`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      });
      setUsers(users.filter(user => user.id !== userId));
      handleCloseDialog();
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user. Please try again later.');
    }
  };

  const handleOpenDialog = (user) => {
    setUserToDelete(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUserToDelete(null);
  };

  useEffect(() => {
    if (selectedUserId !== null) {
      const fetchShipments = async () => {
        try {
          const response = await axios.get('http://localhost:8000/pickups/',{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          });
          const userShipments = response.data.filter(shipment => shipment.user === selectedUserId);
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
      <div className='adminfeed'>
        <div>
        <h1 className="dashboard-header">Admin Dashboard</h1></div>
        <div>
        <Button variant="contained" size="small" onClick={handlefeed}>
          view Feedback
        </Button>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="users-section">
        <h2 className="section-title">Users</h2>
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id} className="user-item">
              <div className="user-details" onClick={() => setSelectedUserId(user.id)}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Country:</strong> {user.country}</p>
                <p><strong>State:</strong> {user.state}</p>
                <p><strong>Zipcode:</strong> {user.zipcode}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
              <DeleteIcon className="delete-icon" onClick={() => handleOpenDialog(user)} />
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
                  <p><strong>Pick Up Time:</strong> {shipment.pickuptime}</p>
                  <p><strong>Drop Address:</strong> {shipment.dropaddress}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the user <strong>{userToDelete?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDeleteUser(userToDelete.id)} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Admin;
