import React from 'react';
import { Link } from 'react-router-dom';
import EventSignup from './EventSignup';
import EventCreate from './EventCreate';

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
    <div classname = "Whole-event">
        <div className = "event">
        <h1 className = 'event-title'> <Link to={"/EventSignup"} className="event-link">{title}</Link></h1> 
            
            <img src={image} className="event-image" />
            
            <p className = 'event-description'>{description}</p>
        
            
            <br/>
        </div>
        <h1>Want to host an event? </h1>
      <Link to="/EventCreate">
        <button>Host</button>
      </Link>
    </div>
);



};


export default Event;

