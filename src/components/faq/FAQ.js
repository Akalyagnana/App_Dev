import React, { useState } from 'react';
import Header from '../Header/Header';
import './FAQ.css';
import Footer from '../footer/Footer';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    { question: 'What is your shipping policy?', answer: 'Our shipping policy ensures prompt and safe delivery of goods. Standard shipping times vary based on the destination and shipping method selected. We offer expedited shipping for urgent deliveries.' },
    { question: 'How can I track my order?', answer: 'You can track your order using the tracking number provided in your confirmation email. Enter this number in the tracking section of our website to see real-time updates on your shipment status.' },
    { question: 'What payment methods are accepted?', answer: 'We accept all major credit cards, PayPal, and bank transfers. For corporate clients, we also offer invoice billing options.' },
    { question: 'How do I schedule a pickup?', answer: 'To schedule a pickup, log in to your account, go to the "Schedule Pickup" section, and fill out the required information. Our team will contact you to confirm the pickup details.' },
    { question: 'Do you offer international shipping?', answer: 'Yes, we provide international shipping services to over 4 countries. Please contact our customer service for specific details and pricing for your destination.' },
    { question: 'What is your returns policy?', answer: 'Our returns policy allows for returns within 30 days of delivery. Items must be in their original condition and packaging. Please contact our support team for return authorization and instructions.' },
    { question: 'How can I contact customer support?', answer: 'You can reach our customer support team via email, phone, or live chat. Our support hours are Monday to Friday, 9 AM to 6 PM (local time). We strive to respond to all inquiries within 24 hours.' },
    { question: 'Are there any restrictions on the items I can ship?', answer: 'Certain items are restricted or prohibited for shipping, including hazardous materials, perishable goods, and illegal items. Please refer to our shipping guidelines for a complete list of restricted items.' },
    { question: 'Can I change the delivery address after placing an order?', answer: 'Yes, you can change the delivery address before the order has been shipped. Contact our customer support team as soon as possible to update your address details.' },
    { question: 'How do I cancel my order?', answer: 'To cancel an order, please contact our customer support team immediately. Orders can only be canceled before they are shipped. If the order has already been dispatched, you will need to follow our returns process.' },
  ];

  return (
    <div>
      <Header />
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleQuestion(index)}
          >
            <h3 className="faq-question">{faq.question}</h3>
            {activeIndex === index && (
              <p className="faq-answer">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default FAQ;
