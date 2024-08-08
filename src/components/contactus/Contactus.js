import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './Contactus.css';
import Header from '../Header/Header';
import UserContext from '../Context/UserContext';
import Footer from '../footer/Footer';

const Contactus = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      setError('Message field is required.');
      return;
    }
    setError('');

    try {
      await axios.post('http://localhost:8080/feedback', {
        userId: user.id,
        name: user.name,
        email: user.email,
        message,
      });
      setSuccess('Feedback submitted successfully!');
      setMessage('');
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <div className="contactus-container">
        <h1>Contact Us</h1>
        <p>We value your feedback. Please fill out the form below to share your thoughts or concerns.</p>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={user.name}
              readOnly
              disabled
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={user.email}
              readOnly
              disabled
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default Contactus;
