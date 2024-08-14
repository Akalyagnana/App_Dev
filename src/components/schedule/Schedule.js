import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Schedule.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import Footer from '../footer/Footer';
import { TokenContext } from '../Context/TokenProvider';

const Schedule = () => {
  const [item, setItem] = useState('');
  const [weight, setWeight] = useState('');
  const [pickUpTime, setPickUpTime] = useState('');
  const [dropAddress, setDropAddress] = useState('');
  const [formError, setFormError] = useState('');
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.000000`;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!item || !weight || !pickUpTime || !dropAddress) {
      setFormError('All fields are required');
      return;
    }
  
    if (isNaN(weight) || weight <= 0) {
      setFormError('Please enter a valid weight greater than zero');
      return;
    }

    const currentDateTime = new Date();
    const selectedDateTime = new Date(pickUpTime);

    if (selectedDateTime < currentDateTime) {
      setFormError('Pick-up time cannot be in the past');
      return;
    }
  
    const formattedPickUpTime = formatDateTime(pickUpTime);
  
    try {
      const response = await axios.post('http://localhost:8000/pickups/', {
        item,
        weight,
        pickuptime: formattedPickUpTime,
        dropaddress: dropAddress,
        user: user.id
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const pickupId = response.data.id;
  
      alert(`Pickup scheduled successfully! Your pickup ID is ${pickupId}.`);
  
      setItem('');
      setWeight('');
      setPickUpTime('');
      setDropAddress('');
      setFormError('');
  
      navigate('/home');
  
    } catch (error) {
      console.error('Error scheduling pickup:', error.response?.data || error.message);
      setFormError('Error scheduling pickup. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <div className='schedulecss'>
        <p className='scheduletext'>Enter the details to schedule your pick up</p>
        <form onSubmit={handleSubmit}>
          <TextField
            id="item"
            label="Item"
            variant="filled"
            placeholder='Enter the type of item to be picked up'
            style={{ width: '50%' }}
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <br/><br/>
          <TextField
            id="weight"
            label="Weight (kg)"
            variant="filled"
            type="number"
            placeholder='Enter the weight of the object in kg'
            style={{ width: '50%' }}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <br/><br/>
          <TextField
            id="pickuptime"
            label="Pick Up Time"
            variant="filled"
            type="datetime-local"
            placeholder='Select the pick-up date and time'
            style={{ width: '50%' }}
            value={pickUpTime}
            onChange={(e) => setPickUpTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br/><br/>
          <TextField
            id="dropaddress"
            label="Address"
            variant="filled"
            placeholder='Enter the place where the parcel should be dropped'
            style={{ width: '50%' }}
            value={dropAddress}
            onChange={(e) => setDropAddress(e.target.value)}
          />
          <br/><br/>
          {formError && <p style={{ color: 'red' }}>{formError}</p>}
          <Button variant="contained" size="large" type="submit">Schedule Pick up</Button>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default Schedule;
