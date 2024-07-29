import React, { useState,useEffect } from 'react';
import BackendApi from "./fastapi";
import { Link } from 'react-router-dom';
const HostEvent = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: ''
    });
    const [msg, setMsg] = useState('');

    
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await BackendApi.get('/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };












    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await BackendApi.post('/HostEvent', formData);
            console.log('Response:', response.data);
            setMsg('Event was created. You are the host!');
        } catch (error) {
            console.error('Error:', error);
            setMsg('Registration failed');
        }
    };

    return (
        <div style={{  flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', backgroundColor: '#DDA0DD' }}>
            <div style={{ backgroundColor: '3560FE', padding: '2rem', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
                <h1 style={{ marginBottom: '1rem' }}>Create an Event</h1>
                {msg && <p style={{ color: msg === 'Registration failed' ? 'red' : 'green' }}>{msg}</p>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', width : '200%', maxWidth: '600px' , alignItems: 'center', gap: '1rem' }}>
                    <input
                        type="text"
                        name="title"
                        placeholder="title"
                        value={formData.title}
                        onChange={handleChange}
                        style={{ padding: '0.5rem', width: '100%', maxWidth: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="textarea"
                        name="description"
                        placeholder="description"
                        value={formData.description}
                        onChange={handleChange}
                        style={{ padding: '0.5rem', width: '100%', maxWidth: '400px', borderRadius: '8px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="date"
                        name="date"
                        placeholder="Date"
                        value={formData.date}
                        onChange={handleChange}
                        style={{ padding: '0.5rem', width: '100%', maxWidth: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>
                        Host Event
                    </button>
                </form>
                

                <div style={{  display: 'flex', backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '100%', maxWidth: '800px' }}>
                    <h2 >All Events</h2>
                    
                    {events.length > 0 ? (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {events.map((event) => (
                                <li key={event.id} style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
                                    <h3>{event.title}</h3>
                                    <p>{event.description}</p>
                                    <p><strong>Date:</strong> {event.date}</p>
                                    <Link to={`/events/${event.id}`}>View Details</Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No events available</p>
                    )}
                </div>
            </div>










            </div>
        
    );
};

export default HostEvent;

