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
      console.error('Error signing up for event:', error);
      alert('Failed to sign up for the event');
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
