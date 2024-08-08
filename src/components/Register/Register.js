import React, { useState } from 'react';
import './Register.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import validator from 'validator';
import axios from 'axios';
import Footer from '../footer/Footer';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [zipcodeError, setZipcodeError] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validator.isEmail(newEmail)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    if (!/^\d+$/.test(newPhone)) {
      setPhoneError('Mobile number must be an integer');
    } else {
      setPhoneError('');
    }
  };

  const handleZipcodeChange = (e) => {
    const newZipcode = e.target.value;
    setZipcode(newZipcode);
    if (!/^\d+$/.test(newZipcode)) {
      setZipcodeError('Zipcode must be an integer');
    } else {
      setZipcodeError('');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    
    const passwordRegex = /^(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError('Weak Password');
    } else if (confirmPassword && newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (password && newConfirmPassword !== password) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setCountry(newCountry);

    const validCountries = ['United States', 'Canada', 'Australia', 'India']; 
    if (!validCountries.includes(newCountry)) {
      setCountryError('Service not available in the entered country');
    } else {
      setCountryError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password || !confirmPassword || !country || !state || !zipcode) {
      setFormError('All fields are required');
      return;
    }

    if (emailError || passwordError || countryError || phoneError || zipcodeError) {
      setFormError('Please fix the errors before submitting');
      return;
    }

    try {
      const emailCheckResponse = await axios.get(`http://localhost:8080/users?email=${email}`);
      console.log(emailCheckResponse);
      if (emailCheckResponse.data.length>0) {
        setFormError('Email already exists');
        return;
      }

      const response = await axios.post('http://localhost:8080/users', {
        name,
        email,
        phone,
        password,
        country,
        state,
        zipcode,
      });
      console.log('User registered successfully:', response.data);
      navigate('/');
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
      setCountry('');
      setState('');
      setZipcode('');
      setFormError('');
    } catch (error) {
      console.error('Error registering user:', error);
      setFormError('Error registering user. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <center>
        <p className='registitle'>Enter your details to create an account</p>
        <p className='registlog'>
          <NavLink to="/login" style={{ textDecoration: 'none' }}>
            {"Already have an account!"}
          </NavLink>
        </p>
      </center>
      <form onSubmit={handleSubmit}>
        <div className='Regisplit'>
          <div>
            <TextField
              id="name"
              label="Name"
              variant="filled"
              style={{ width: '150%' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br /><br />
            <TextField
              id="email"
              label="E-Mail"
              variant="filled"
              style={{ width: '150%' }}
              value={email}
              onChange={handleEmailChange}
              helperText={emailError}
              error={!!emailError}
            />
            <br /><br />
            <TextField
              id="phone"
              label="Mobile Number"
              variant="filled"
              style={{ width: '150%' }}
              value={phone}
              onChange={handlePhoneChange}
              helperText={phoneError}
              error={!!phoneError}
            />
            <br /><br />
            <TextField
              id="password"
              label="Password"
              variant="filled"
              style={{ width: '150%' }}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              helperText={passwordError}
              error={!!passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <br /><br />
          </div>
          <div>
            <TextField
              id="country"
              label="Country"
              variant="filled"
              style={{ width: '150%' }}
              value={country}
              onChange={handleCountryChange}
              helperText={countryError}
              error={!!countryError}
            />
            <br /><br />
            <TextField
              id="state"
              label="State"
              variant="filled"
              style={{ width: '150%' }}
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <br /><br />
            <TextField
              id="zipcode"
              label="Zipcode"
              variant="filled"
              style={{ width: '150%' }}
              value={zipcode}
              onChange={handleZipcodeChange}
              helperText={zipcodeError}
              error={!!zipcodeError}
            />
            <br /><br />
            <TextField
              id="confirmpassword"
              label="Confirm Password"
              variant="filled"
              style={{ width: '150%' }}
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              helperText={passwordError}
              error={!!passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        {formError && <center><p style={{ color: 'red' }}>{formError}</p></center>}
        <center>
          <Button variant="contained" size="large" type="submit">Register</Button>
        </center>
      </form>
      <Footer/>
    </div>
  );
};

export default Register;