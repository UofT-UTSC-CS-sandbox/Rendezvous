import React, { useState } from 'react';
import { handleSubmit } from './EventCreate';

const EventSignup = () => {
  const [eventID, setEventID] = useState('');
  const [userID, setUserID] = useState('');

  return (
    <div className="EventSign">
      <h3 align="center">Welcome to event signup page</h3>
      <form onSubmit={(e) => handleSubmit(e, eventID, userID)}>
        <div>
          <label htmlFor="eventID">Event ID:</label>
          <input
            type="text"
            id="eventID"
            value={eventID}
            onChange={(e) => setEventID(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="userID">User ID:</label>
          <input
            type="text"
            id="userID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default EventSignup;
