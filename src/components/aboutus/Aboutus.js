import React from 'react';
import './Aboutus.css';
import Header from '../Header/Header';
import Footer from '../footer/Footer';

const Aboutus = () => {
  return (
    <div>
      <Header />
      <div className="aboutus-container">
        <h1>About Us</h1>
        <p>
          Welcome to <strong>LMS Solutions</strong>, your trusted partner in logistics management. Our mission is to streamline your supply chain and ensure timely delivery of goods, while maintaining transparency and efficiency throughout the process.
        </p>
        <h2>Our Story</h2>
        <p>
          Founded in 2010, LMS Solutions began with a simple goal: to revolutionize the logistics industry with innovative technology and unparalleled customer service. Over the past decade, we have grown from a small startup into a leading provider of logistics solutions, serving clients across various industries.
        </p>
        <h2>Our Values</h2>
        <ul>
          <li><strong>Customer Focus:</strong> Our customers are at the heart of everything we do. We strive to exceed their expectations and deliver exceptional service.</li>
          <li><strong>Innovation:</strong> We embrace the latest technologies to provide cutting-edge solutions that enhance efficiency and transparency in logistics.</li>
          <li><strong>Integrity:</strong> We conduct our business with the highest ethical standards, ensuring trust and reliability in all our dealings.</li>
          <li><strong>Sustainability:</strong> We are committed to sustainable practices, reducing our environmental footprint and promoting eco-friendly logistics solutions.</li>
        </ul>
        <h2>Our Services</h2>
        <p>
          At LMS Solutions, we offer a comprehensive range of logistics services, including:
        </p>
        <ul>
          <li>Supply Chain Management</li>
          <li>Freight Forwarding</li>
          <li>Warehouse Management</li>
          <li>Order Fulfillment</li>
          <li>Real-Time Tracking</li>
          <li>Customs Brokerage</li>
        </ul>
        <h2>Why Choose Us?</h2>
        <p>
          With a team of experienced professionals, state-of-the-art technology, and a commitment to excellence, LMS Solutions is your go-to partner for all your logistics needs. We offer tailored solutions that are designed to meet your unique requirements, ensuring smooth operations and optimal performance.
        </p>
        <p>
          Thank you for choosing LMS Solutions. We look forward to serving you and helping your business thrive.
        </p>
      </div>
      <Footer/>
    </div>
  );
}

export default Aboutus;
