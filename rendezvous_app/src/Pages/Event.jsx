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

const Event = ({ title, description, image }) =>
{

return (
    <div className = "event">
       <a href= "./EventSignup"> <h1 className = 'event-title'>{title}</h1> </a>
        
        <img src={image} className="event-image" />
        
        <p className = 'event-description'>{description}</p>
        <h5>
        <Link to={`/.EventSignup`} className="event-link">{title}</Link>
        </h5>
        
        <br/>
    </div>
);

};


export default Event;

