// Event.js
import React from 'react';
import { Link } from 'react-router-dom';

/** 
@typedef {Object} EventProps
@property {string} title - The title of event.
@property {string} description - The description of the event.
@property {string} image - The URL of the event image.
@property {number} id - The id of each event is unique.
*/

/**@param {EventProps} props */
const Event = ({ title, description, image, id }) => {
    return (
        <div className="event">
            <Link to={`/event-signup/${id}`}>
                <h1 className='event-title'>{title}</h1>
            </Link>
            <img src={image} className="event-image" alt={title} />
            <p className='event-description'>{description}</p>
            <h5>
                <Link to={`/event-signup/${id}`} className="event-link">{title}</Link>
            </h5>
            <br />
        </div>
    );
};

export default Event;
