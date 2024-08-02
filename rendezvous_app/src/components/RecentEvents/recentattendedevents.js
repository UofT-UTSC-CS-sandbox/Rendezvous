import React, { useEffect, useState } from 'react';
import './recentevents.css';
import BackendApi from '../../Pages/fastapi';

const RecentAttendedEvents = ({ accountId }) => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await BackendApi.get(`/accounts/${accountId}/attended-events`);
                if (response.status === 200 && Array.isArray(response.data)) {
                    setEvents(response.data);
                } else {
                    setError("Unexpected response format");
                    console.error("Unexpected response format", response.data);
                }
            } catch (err) {
                setError("Error fetching attended events");
                console.error("Error fetching events", err);
            }
        };

        fetchEvents();
    }, [accountId]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="event-container">
            {events.map(event => (
                <div className="event-card" key={event.id}>
                    <h4 className="event-title">{event.title}</h4>
                    <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
                    <p className="event-description">{event.description}</p>
                </div>
            ))}
        </div>
    );
};

export default RecentAttendedEvents;
