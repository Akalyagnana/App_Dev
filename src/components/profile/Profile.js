import React, { useContext, useState, useEffect } from 'react';
import Header from '../Header/Header';
import UserContext from '../Context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Footer from '../footer/Footer';

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (passwordError || successMessage) {
      const timer = setTimeout(() => {
        setPasswordError('');
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [passwordError, successMessage]);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/.test(password);
    const number = /[0-9]/.test(password);
    const specialChar = /[^A-Za-z0-9]/.test(password);
    const length = password.length >= 8;

    return uppercase && number && specialChar && length;
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError('All fields are required');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (!validatePassword(newPassword)) {
      setPasswordError('Password must contain at least 8 characters, including 1 uppercase letter, 1 number, and 1 special character');
      return;
    }

    if (newPassword === currentPassword) {
      setPasswordError('New password cannot be the same as the current password');
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:8080/users/${user.id}`, {
        password: newPassword
      });

      if (response.status === 200) {
        setSuccessMessage('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        setPasswordError('Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordError('Error changing password. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
        <div className="profile-box">
          <h1>User Details</h1>
          <p>Username: <span>{user.name}</span></p>
          <p>Email: <span>{user.email}</span></p>
          <p>Phone: <span>{user.phone}</span></p>
          <p>Country: <span>{user.country}</span></p>
          <p>State: <span>{user.state}</span></p>
          <p>Zipcode: <span>{user.zipcode}</span></p>

          <div className="change-password-container">
            <h2>Change Password</h2>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <IconButton onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <br />
            <button
              className="change-password-button"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>

          <div className="logout-container">
            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;
