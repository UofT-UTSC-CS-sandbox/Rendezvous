import React from 'react';
import Event from './Event';
import axios from 'axios';

const Events = () => {
    const [events, setEvents] = useState([]);

    return (
        <div className="events-list">
            {events.map((event, index) => (
            
                <Event
                key = {index}
                title = {event.title}
                description={event.description}
                image = {event.image}
                />
             ) )

            }    
        </div>
    );
};



export default Events;