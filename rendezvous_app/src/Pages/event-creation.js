import React, { useState,useEffect } from 'react';
import BackendApi from "./fastapi";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'

import './event-creation.css'

const EventCreation = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: ''
});
const [msg, setMsg] = useState('');

const navigate = useNavigate();
const [events, setEvents] = useState([]);

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await BackendApi.post('/HostEvent', formData);
        console.log('Response:', response.data);
        setMsg('Event was created. You are the host!');
        setTimeout(() => {
            navigate('/HostEvent');
        }, 1000);
    } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.data && error.response.data.detail === 'Event date cannot be in the past.') {
            setMsg('Event date cannot be in the past.');
        } else {
            setMsg('Registration failed');
        }
    }
};
  return (
    <div className="event-creation-container">
      <Helmet>
        <title>Event-Creation - Rendezvous</title>
        <meta property="og:title" content="Event-Creation - Rendezvous" />
      </Helmet>
      <div className="event-creation-container1">
        <div className="event-creation-container2">
          <form onSubmit={handleSubmit} enctype="text/plain" className="event-creation-form">
            <h1 className='thq-heading-3'>Event Name</h1>
            <input
              type="text"
              name="title"
              
              placeholder="Event Name"
              value={formData.title}
              onChange={handleChange}
              className="event-creation-textinput input"
            />

            <h1 className='thq-heading-3'>Date</h1>
            <input
              type="datetime-local"
              name="date"
              
              placeholder="placeholder"
              value={formData.datetime}
              onChange={handleChange}
              className="event-creation-textinput1 input"
            />
            <h1 className='thq-heading-3'>Location</h1>
            <input
              type="text"
              placeholder="Location"
              className="event-creation-textinput2 input"
            />

            <h1 className='thq-heading-3'>Disclaimer (optional)</h1>
            <input
              type="textarea"
              name='description'
              placeholder="Disclaimer"
              value={formData.description}
              onChange={handleChange}
              className="event-creation-textarea textarea"
            ></input>

            <h1 className='thq-heading-3'>Image (optional)</h1>
            <input
              type="file"
              placeholder="placeholder"
              className="event-creation-textinput3 input"
            />
            <div className="event-creation-container7">
            <button type="submit" className="event-creation-button button">
            Create
          </button>

          <button className="event-creation-navlink button">
          <Link to="/HostEvent">
            Cancel
          </Link>
          </button>
            </div>
          
          </form>
          {msg && <p style={{ color: msg === 'Registration failed' ? 'red' : 'green' }}>{msg}</p>}
        </div>
      </div>
    </div>
  )
}

export default EventCreation
