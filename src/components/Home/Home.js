import React, { useContext, useState } from 'react';
import './Home.css';
import UserContext from '../Context/UserContext';
import Header from '../Header/Header';
import { Button, TextField } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';

const Home = () => {
  const { user } = useContext(UserContext);
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTrack = () => {
    if (!orderId) {
      setError('Order ID is required');
      return;
    }
    setError('');
    navigate('/tracker', { state: { orderId } });
  };

  return (
    <div>
      <Header />
      <p className='usrnme'>Welcome {user.name}</p>
      <div className='trackerhome'>
        <center>
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
              <Button variant="contained" size="large" onClick={handleTrack}>
                Track
              </Button>
            </div>
          </form>
        </center>
      </div>
      <p className='manageship'>Manage your shipments</p>
      <div className='homemangefet'>
        <div className='pickupshe'>
          <p className='pickupshetex'>
            <NavLink to="/schepic" style={{ textDecoration: 'none', color: "rgb(118, 118, 159)",fontSize:"20px" }}>
              Schedule Pickup
            </NavLink>
          </p>
        </div>
        <div className='findloc'>
          <p className='pickupshetex'>
            <NavLink to="/findloc" style={{ textDecoration: 'none', color: "rgb(118, 118, 159)" }}>
              Find location
            </NavLink>
          </p>
        </div>
        <div className='fulesurchage'>
          <p className='pickupshetex'>
            <NavLink to="/fuelsurch" style={{ textDecoration: 'none', color: "rgb(118, 118, 159)" }}>
              Fuel Surcharge
            </NavLink>
          </p>
        </div>
        <div className='FAQ'>
          <p className='pickupshetex'>
            <NavLink to="/FAQ" style={{ textDecoration: 'none', color: "rgb(118, 118, 159)" }}>
              FAQ
            </NavLink>
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
