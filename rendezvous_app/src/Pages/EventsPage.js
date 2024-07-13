import { Link } from "react-router-dom";
import React, { useState } from 'react';
import BackendApi from "./fastapi";

const EventsPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: ''
    });
    const [msg, setMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await BackendApi.post('/EventsPage', formData);
            console.log('Response:', response.data);
            setMsg('Event was created. You are the host!');
        } catch (error) {
            console.error('Error:', error);
            setMsg('Failed to create event.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '20px', height: '100vh', backgroundColor: '#DDA0DD' }}>
            <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
                <h1 style={{ marginBottom: '1rem' }}>Create an Event</h1>
                {msg && <p style={{ color: msg === 'Failed to create event.' ? 'red' : 'green' }}>{msg}</p>}
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
                
            </div>
        </div>
    );
};

export default EventsPage;