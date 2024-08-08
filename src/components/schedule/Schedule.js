import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Schedule.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import Footer from '../footer/Footer';

const Schedule = () => {
  const [item, setItem] = useState('');
  const [weight, setWeight] = useState('');
  const [pickUpTime, setPickUpTime] = useState('');
  const [dropAddress, setDropAddress] = useState('');
  const [formError, setFormError] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [cost, setCost] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const getShippingCost = async (details) => {
    // Mock API call to get shipping cost
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve((details.weight * 10) + (details.height * details.width * details.length * 0.01)); // Mock calculation
      }, 1000);
    });
  };

  const handleCalculateCost = async () => {
    if (!weight || !origin || !destination || !height || !width || !length) {
      setFormError('Please fill in weight, origin, destination, height, width, and length to calculate the cost.');
      return;
    }

    // Validate weight is a positive number
    if (isNaN(weight) || weight <= 0) {
      setFormError('Please enter a valid weight greater than zero');
      return;
    }

    try {
      const cost = await getShippingCost({ weight, height, width, length });
      setCost(cost);
      setFormError('');
    } catch (error) {
      console.error('Error calculating shipping cost:', error);
      setFormError('Error calculating shipping cost. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields are filled
    if (!item || !weight || !pickUpTime || !dropAddress || !origin || !destination || !height || !width || !length) {
      setFormError('All fields are required');
      return;
    }

    // Validate weight is a positive number
    if (isNaN(weight) || weight <= 0) {
      setFormError('Please enter a valid weight greater than zero');
      return;
    }

    try {
      const cost = await getShippingCost({ weight, height, width, length });
      setCost(cost);

      const response = await axios.post('http://localhost:8080/pickup', {
        item,
        weight,
        pickUpTime,
        dropAddress,
        userId: user.id,
        origin,
        destination,
        height,
        width,
        length,
        cost,
      });

      const pickupId = response.data.id;

      // Navigate to the payment page with cost and pickupId
      navigate('/payment', { state: { cost, pickupId } });

    } catch (error) {
      console.error('Error scheduling pickup:', error);
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
            type="time"
            placeholder='Select the pick-up time'
            style={{ width: '50%' }}
            value={pickUpTime}
            onChange={(e) => setPickUpTime(e.target.value)}
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
          <TextField
            id="origin"
            label="Origin"
            variant="filled"
            placeholder='Enter the origin city or ZIP code'
            style={{ width: '50%' }}
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <br/><br/>
          <TextField
            id="destination"
            label="Destination"
            variant="filled"
            placeholder='Enter the destination city or ZIP code'
            style={{ width: '50%' }}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <br/><br/>
          <TextField
            id="height"
            label="Height (cm)"
            variant="filled"
            type="number"
            placeholder='Enter the height of the package in cm'
            style={{ width: '50%' }}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <br/><br/>
          <TextField
            id="width"
            label="Width (cm)"
            variant="filled"
            type="number"
            placeholder='Enter the width of the package in cm'
            style={{ width: '50%' }}
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <br/><br/>
          <TextField
            id="length"
            label="Length (cm)"
            variant="filled"
            type="number"
            placeholder='Enter the length of the package in cm'
            style={{ width: '50%' }}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <br/><br/>
          <Button variant="contained" size="large" onClick={handleCalculateCost}>Calculate Cost</Button>
          <br/><br/>
          {formError && <p style={{ color: 'red' }}>{formError}</p>}
          {cost && <p>Estimated Cost: ₹{cost}</p>}
          <Button variant="contained" size="large" type="submit">Schedule Pick up</Button>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default Schedule;
