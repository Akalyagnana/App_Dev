import React, { useState, useContext } from 'react';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import UserContext from '../Context/UserContext';
import axios from 'axios';
import validator from 'validator';
import Header from '../Header/Header';
import Footer from '../footer/Footer';
import { TokenContext } from '../Context/TokenProvider';

const Login = () => {
  const { user, login } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
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
      const response = await axios.get(`http://localhost:8000/users/${email}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.status === 200) {
        const user = response.data;
  
        if (user.passw === passwordValue) {
          console.log('Login successful');
          login(user);
          if (user.name === 'Admin') {
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

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };

  return (
    <div>
      <Header />
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
            type={showPassword ? 'text' : 'password'}
            style={{ width: '50%' }}
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br /><br />
          <Button variant="contained" size="large" type="submit">Login</Button>
        </form>
        <br /><br />
        <p className="loginTrack">Just track the order</p>
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
      <Footer />
    </div>
  );
};

export default Login;
