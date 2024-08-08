import React, { useState, useContext } from 'react';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UserContext from '../Context/UserContext';
import axios from 'axios';
import validator from 'validator';
import Header from '../Header/Header';
import Footer from '../footer/Footer';

const Login = () => {
  const { user, login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTracklogin = () => {
    if (!orderId) {
      setError('Order ID is required');
      return;
    }
    setError('');
    navigate('/tracker', { state: { orderId } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const emailValue = email.trim();
    const passwordValue = password.trim();
  
    if (emailValue === '') {
      setEmailError('Please enter your email address');
      return;
    }
    if (passwordValue === '') {
      setPasswordError('Please enter your password');
      return;
    }
  
    try {
      const response = await axios.get(
        `http://localhost:8080/users?email=${emailValue}`
      );
  
      if (response.data.length > 0) {
        const user = response.data[0];
  
        if (user.password === passwordValue) {
          console.log('Login successful');
          login(user);
          if(user.name === 'Admin'){
            navigate('/admin');
          } else {
            navigate('/home');
          }
        } else {
          setPasswordError('Invalid password');
        }
      } else {
        setEmailError('No account found with this email');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setEmailError('Error during login');
      setPasswordError('Error during login');
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validateEmail = (value) => {
    if (validator.isEmail(value)) {
      setEmailError('');
    } else {
      setEmailError('Invalid email address');
    }
  };

  const validatePassword = (value) => {
    if (value.trim() !== '') {
      setPasswordError('');
    } else {
      setPasswordError('Password is required');
    }
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <div className="proverb-section">
          <p className="proverb">"A journey of a thousand miles begins with a single step."</p>
        </div>
        <div className="login-content">
          <center>
            <p className="logintitle">Enter your user ID and password to log in</p>
            <p className="logindont">
              <NavLink to="/register" style={{ textDecoration: 'none' }}>
                {"Don't have an account?"}
              </NavLink>
            </p>
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
            
            <form onSubmit={handleSubmit}>
              <TextField
                id="email"
                label="E-Mail"
                variant="filled"
                style={{ width: '50%' }}
                value={email}
                onChange={handleEmailChange}
              />
              <br /><br />
              <TextField
                id="password"
                label="Password"
                variant="filled"
                type="password"
                style={{ width: '50%' }}
                value={password}
                onChange={handlePasswordChange}
              />
              <br /><br />
              <Button variant="contained" size="large" type="submit">Login</Button>
            </form>
            <br /><br />
            <p className='loginTrack'>
              Just track the order
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <TextField
                  id="orderId"
                  label="Order ID"
                  variant="outlined"
                  style={{ width: '50%' }}
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  error={!!error}
                  helperText={error}
                />
              </div>
              <br />
              <div>
                <Button variant="contained" size="large" onClick={handleTracklogin}>
                  Track
                </Button>
              </div>
            </form>
          </center>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default Login;
