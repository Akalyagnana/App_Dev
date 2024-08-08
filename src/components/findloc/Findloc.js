import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Findloc.css';
import Header from '../Header/Header';

const Findloc = () => {
  const [place, setPlace] = useState('');
  const [message, setMessage] = useState('');
  const [statesData, setStatesData] = useState({});

  useEffect(() => {
    const fetchStatesData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/country');
        const data = response.data[0]; 
        console.log('Fetched data:', data); 

        const formattedData = {};
        for (const [country, states] of Object.entries(data)) {
          formattedData[country] = states;
        }

        setStatesData(formattedData);
      } catch (error) {
        console.error('Error fetching location data:', error);
        setMessage({ type: 'error', text: 'Failed to fetch location data.' });
      }
    };

    fetchStatesData();
  }, []);

  const checkLocation = () => {
    const normalizedPlace = place.trim().toLowerCase();

    let serviceAvailable = false;

    for (const [country, states] of Object.entries(statesData)) {
      console.log(`Checking country: ${country}, states:`, states); 

      if (Array.isArray(states)) {
        const normalizedStates = states.map(state => state.toLowerCase());

        if (normalizedStates.some(state => normalizedPlace.includes(state))) {
          serviceAvailable = true;
          break;
        }
      } else {
        console.warn(`Expected array for states but got: ${typeof states}`);
      }
    }

    if (serviceAvailable) {
      setMessage({ type: 'success', text: 'Service is available in this location.' });
    } else {
      setMessage({ type: 'error', text: 'Service is not available in this location.' });

      
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  const handleInputChange = (e) => {
    setPlace(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="location-checker-container">
        <div className="location-checker">
          <div className="location-checker-title">Location Checker</div>
          <input 
            type="text" 
            placeholder="Enter a place" 
            value={place} 
            onChange={handleInputChange} 
          />
          <button onClick={checkLocation}>Check</button>
          {message && (
            <div className={`location-checker-message ${message.type}`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Findloc;
