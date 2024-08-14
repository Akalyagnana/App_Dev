import React, { useEffect, useState ,useContext} from 'react';
import UserContext from '../Context/UserContext';
import axios from 'axios';
import './Adminfeed.css'; 
import { TokenContext, TokenProvider } from '../Context/TokenProvider';

const Adminfeed = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');
  const { user } = useContext(UserContext);
  const {token}=useContext(TokenContext);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/feedbacks/',{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        });
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setError('Error fetching feedback. Please try again later.');
      }
    };

    fetchFeedbacks();
  }, []);
  if (!user || user.name !== 'Admin') {
    return <p className="access-denied">Access Denied</p>;
  }
  return (
    <div className="adminfeed-container">
      <h1 className="adminfeed-header">User Feedback</h1>
      {error && <p className="adminfeed-error">{error}</p>}
      {feedbacks.length === 0 ? (
        <p className="adminfeed-message">No feedback available.</p>
      ) : (
        <ul className="adminfeed-list">
          {feedbacks.map((feedback) => (
            <li key={feedback.id} className="adminfeed-item">
              
              <p><strong>Feedback:</strong>{feedback.message}</p>
              <p><strong>User ID:</strong> {feedback.id}</p>
              <p><strong>User Name:</strong> {feedback.name}</p>
              <p><strong>User E-Mail:</strong> {feedback.email}</p>
        
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Adminfeed;
