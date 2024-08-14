import React, { useState } from 'react';
import './Findloc.css';
import Header from '../Header/Header';

const Findloc = () => {
  const [place, setPlace] = useState('');
  const [message, setMessage] = useState('');

  const statesData = {
    "United States": [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming"
    ],
    "Canada": [
      "Alberta",
      "British Columbia",
      "Manitoba",
      "New Brunswick",
      "Newfoundland and Labrador",
      "Northwest Territories",
      "Nova Scotia",
      "Nunavut",
      "Ontario",
      "Prince Edward Island",
      "Quebec",
      "Saskatchewan",
      "Yukon"
    ],
    "Australia": [
      "New South Wales",
      "Queensland",
      "South Australia",
      "Tasmania",
      "Victoria",
      "Western Australia"
    ],
    "India": [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal"
    ]
  };

  const checkLocation = () => {
    const normalizedPlace = place.trim().toLowerCase();
    let serviceAvailable = false;

    for (const [country, states] of Object.entries(statesData)) {
      const normalizedStates = states.map(state => state.toLowerCase());
      if (normalizedStates.some(state => normalizedPlace.includes(state))) {
        serviceAvailable = true;
        break;
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
