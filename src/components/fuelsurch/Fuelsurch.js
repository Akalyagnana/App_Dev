import React from 'react';
import Header from '../Header/Header';
import './Fuelsurch.css';
import Footer from '../footer/Footer';

const Fuelsurch = () => {
  const surchargeRates = [
    { region: 'North America', rate: '5%' },
    { region: 'Europe', rate: '4%' },
    { region: 'Asia', rate: '6%' },
    { region: 'Australia', rate: '5.5%' },
  ];

  return (
    <div>
      <Header />
      <div className="fuelsurch-container">
        <h1>Fuel Surcharge Rates</h1>
        <div className="fuelsurch-cards">
          {surchargeRates.map((surcharge, index) => (
            <div key={index} className="fuelsurch-card">
              <h2>{surcharge.region}</h2>
              <p>Rate: {surcharge.rate}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Fuelsurch;
