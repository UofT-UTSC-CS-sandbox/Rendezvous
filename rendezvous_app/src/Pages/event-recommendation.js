import React, { useState,useEffect } from 'react';
import BackendApi from "./fastapi";
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types'

import './event-recommendation.css'

const RecommendList = (props) => {
const [events, setEvents] = useState([]);

useEffect(() => {
    fetchEvents();
}, []);

const fetchEvents = async () => {
    try {
        const response = await BackendApi.post('/eventrecommendation');
        setEvents(response.data);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
};
  return (
    <div
      className={`event-list-gallery3 thq-section-padding ${props.rootClassName} `}
    >
      <div className="event-list-max-width thq-section-max-width">
        <div className="event-list-section-title">
          <h2 className="event-list-text thq-heading-2">{props.heading1}</h2>
          <span className="event-list-text1 thq-body-large">
            {props.content1}
          </span>
        </div>

        <div className="event-list-content">
          
          
        {events.length > 0 ? (
                    <ul className="event-list-host">
                        {events.map((event) => (
                            <li key={event.id} className="event-item-host">
                                <img
                                    alt={props.image4Alt}
                                    src={props.image4Src}
                                    className="event-list-image4 thq-img-ratio-1-1"
                                />
                                <h3 className='event-text-bold'>{event.title}</h3>
                                <p className='event-text-normal'>{event.description}</p>
                                <p className='event-text-normal'><strong>Date:</strong> {event.date}</p>
                                <Link to={`/events/${event.id}` } className='event-text-bold'>View Details</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No events available</p>
                )}
        </div>
      </div>
    </div>
  )
}

RecommendList.defaultProps = {
  image3Alt: 'Friends exploring an art gallery',
  image2Src:
    'https://images.unsplash.com/photo-1639323252613-00dd92e6c7d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxODQyMTAyMXw&ixlib=rb-4.0.3&q=80&w=1080',
  image3Src:
    'https://images.unsplash.com/photo-1536620303020-d49916c8634b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxODQyMTAyMnw&ixlib=rb-4.0.3&q=80&w=1080',
  image3Title: 'Art Exhibition',
  heading1: 'Recommended Events',
  image4Title: 'Music Festival',
  image4Src:
    'https://images.unsplash.com/photo-1528605248644-14dd04022da1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxODQyMTAyMnw&ixlib=rb-4.0.3&q=80&w=1080',
  content1:
    'A selection of events specially tailored for you.',
  image4Alt: 'Friends dancing at a music festival',
  rootClassName: '',
  image1Alt: 'Group of friends enjoying a night out',
  image2Title: 'Outdoor Adventure',
  image2Alt: 'Friends hiking in the mountains',
  image1Title: 'Friends Night Out',
  image1Src:
    'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxODQyMTAyMXw&ixlib=rb-4.0.3&q=80&w=1080',
}

RecommendList.propTypes = {
  image3Alt: PropTypes.string,
  image2Src: PropTypes.string,
  image3Src: PropTypes.string,
  image3Title: PropTypes.string,
  heading1: PropTypes.string,
  image4Title: PropTypes.string,
  image4Src: PropTypes.string,
  content1: PropTypes.string,
  image4Alt: PropTypes.string,
  rootClassName: PropTypes.string,
  image1Alt: PropTypes.string,
  image2Title: PropTypes.string,
  image2Alt: PropTypes.string,
  image1Title: PropTypes.string,
  image1Src: PropTypes.string,
}

export default RecommendList
