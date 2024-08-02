import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackendApi from "./fastapi";

import './EventSignup.css'; // Import the CSS file

const EventSignup = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details from the API
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const response = await BackendApi.get(`/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const handleSignUp = async () => {
    try {
        const response = await BackendApi.post(`/events/${id}/signup`, {
            // Add necessary headers and body
        });
        console.log('Response:', response.data);
        alert('Successfully signed up for the event!');
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response:', error.response);
            const errorMessage = error.response.data.detail;
            alert(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Error request:', error.request);
            alert('Failed to sign up for the event: No response from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
            alert('Failed to sign up for the event: ' + error.message);
        }
    }
};


  if (!event) return <div>Loading...</div>;

  return (
    <div className="event-details-container">
      <h1 className="event-details-header">{event.title}</h1>
      <p className="event-details-description">{event.description}</p>
      <p className="event-details-date"><strong>Date:</strong> {event.date}</p>
      <button className="signup-button" onClick={handleSignUp}>Sign Up for Event</button>
    </div>
  );
};

export default EventSignup;
