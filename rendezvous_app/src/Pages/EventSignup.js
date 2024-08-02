import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types'
import BackendApi from "./fastapi";
import { Helmet } from 'react-helmet'

import './event-details.css'

const EventSignup = (props) => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details from the API
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const response = await BackendApi.get(`/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const handleSignUp = async () => {
    try {
        const response = await BackendApi.post(`/events/${id}/signup`, {
            // Add necessary headers and body
        });
        console.log('Response:', response.data);
        alert('Successfully signed up for the event!');
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response:', error.response);
            const errorMessage = error.response.data.detail;
            alert(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Error request:', error.request);
            alert('Failed to sign up for the event: No response from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
            alert('Failed to sign up for the event: ' + error.message);
        }
    }
};


  if (!event) return <div>Loading...</div>;

  return (
    <div className="event-details-container2">
      <Helmet>
        <title>Event-Details - Rendezvous</title>
        <meta property="og:title" content="Event-Details - Rendezvous" />
      </Helmet>
      <div className="contact-form3-contact9 thq-section-padding">
      <div className="thq-section-max-width thq-flex-row contact-form3-max-width">
        <img
          alt={props.imageAlt}
          src={props.imageSrc}
          className="contact-form3-image1 thq-img-ratio-4-3"
        />
        <div className="contact-form3-content thq-flex-column">
          <div className="contact-form3-section-title thq-card">
            <div className="contact-form3-content1">
              <h1 className="thq-heading-2">{event.title}</h1>
              <span className="thq-body-small">{event.host_id}</span>
            </div>
          </div>
          <div className="contact-form3-section-title1 thq-card">
            <div className="contact-form3-content1">
              <h2 className="thq-heading-3">{props.heading}</h2>
              <span className="thq-body-small">{event.description}</span>
            </div>
          </div>
          <button type="button" onClick={handleSignUp} className="contact-form3-button button">
            {props.button}
          </button>
        </div>
      </div>
    </div>



    <div className="contact14-contact2 thq-section-padding">
      <div className="contact14-max-width thq-section-max-width">
        <div className="contact14-content">
          <svg viewBox="0 0 950.8571428571428 1024" className="contact14-icon">
            <path d="M73.143 950.857h164.571v-164.571h-164.571v164.571zM274.286 950.857h182.857v-164.571h-182.857v164.571zM73.143 749.714h164.571v-182.857h-164.571v182.857zM274.286 749.714h182.857v-182.857h-182.857v182.857zM73.143 530.286h164.571v-164.571h-164.571v164.571zM493.714 950.857h182.857v-164.571h-182.857v164.571zM274.286 530.286h182.857v-164.571h-182.857v164.571zM713.143 950.857h164.571v-164.571h-164.571v164.571zM493.714 749.714h182.857v-182.857h-182.857v182.857zM292.571 256v-164.571c0-9.714-8.571-18.286-18.286-18.286h-36.571c-9.714 0-18.286 8.571-18.286 18.286v164.571c0 9.714 8.571 18.286 18.286 18.286h36.571c9.714 0 18.286-8.571 18.286-18.286zM713.143 749.714h164.571v-182.857h-164.571v182.857zM493.714 530.286h182.857v-164.571h-182.857v164.571zM713.143 530.286h164.571v-164.571h-164.571v164.571zM731.429 256v-164.571c0-9.714-8.571-18.286-18.286-18.286h-36.571c-9.714 0-18.286 8.571-18.286 18.286v164.571c0 9.714 8.571 18.286 18.286 18.286h36.571c9.714 0 18.286-8.571 18.286-18.286zM950.857 219.429v731.429c0 40-33.143 73.143-73.143 73.143h-804.571c-40 0-73.143-33.143-73.143-73.143v-731.429c0-40 33.143-73.143 73.143-73.143h73.143v-54.857c0-50.286 41.143-91.429 91.429-91.429h36.571c50.286 0 91.429 41.143 91.429 91.429v54.857h219.429v-54.857c0-50.286 41.143-91.429 91.429-91.429h36.571c50.286 0 91.429 41.143 91.429 91.429v54.857h73.143c40 0 73.143 33.143 73.143 73.143z"></path>
          </svg>
          <div className="contact14-contact-info">
            <div className="contact14-content1">
              <h3 className="contact14-text thq-heading-3">{props.heading10}</h3>
              <p className="contact14-text1 thq-body-large">{event.date}</p>
            </div>
            <span className="contact14-email thq-body-small">
              {props.email10}
            </span>
          </div>
        </div>
        <div className="contact14-content2">
          <svg viewBox="0 0 1024 1024" className="contact14-icon2">
            <path d="M896 472.747v39.253c-0.043 106.027-43.051 201.941-112.64 271.445s-165.547 112.384-271.573 112.299-201.984-43.051-271.445-112.64-112.384-165.504-112.341-271.573 43.051-201.941 112.64-271.445 165.547-112.384 271.573-112.341c56.747 0.043 110.336 12.331 155.691 33.067 21.419 9.813 46.763 0.341 56.533-21.077s0.341-46.763-21.077-56.533c-56.619-25.856-122.283-40.747-191.104-40.789-129.579-0.085-246.997 52.437-331.947 137.259s-137.557 202.24-137.643 331.819 52.437 246.997 137.259 331.947 202.197 137.6 331.776 137.643 246.997-52.437 331.947-137.259 137.6-202.197 137.685-331.819v-39.253c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667zM908.501 140.501l-396.501 396.885-97.835-97.792c-16.683-16.683-43.691-16.683-60.331 0s-16.683 43.691 0 60.331l128 128c16.683 16.683 43.691 16.64 60.373 0l426.667-427.093c16.64-16.683 16.64-43.691-0.043-60.331s-43.691-16.64-60.331 0.043z"></path>
          </svg>
          <div className="contact14-contact-info1">
            <div className="contact14-content3">
              <h3 className="contact14-text2 thq-heading-3">
                {props.heading20}
              </h3>
              <p className="contact14-text3 thq-body-large">{props.content20}</p>
            </div>
            <span className="contact14-email1 thq-body-small">
              {props.link10}
            </span>
          </div>
        </div>
        <div className="contact14-content4">
          <svg viewBox="0 0 1024 1024" className="thq-icon-medium">
            <path d="M282 460q96 186 282 282l94-94q20-20 44-10 72 24 152 24 18 0 30 12t12 30v150q0 18-12 30t-30 12q-300 0-513-213t-213-513q0-18 12-30t30-12h150q18 0 30 12t12 30q0 80 24 152 8 26-10 44z"></path>
          </svg>
          <div className="contact14-contact-info2">
            <div className="contact14-content5">
              <h3 className="contact14-text4 thq-heading-3">
                {props.heading30}
              </h3>
              <p className="contact14-text5 thq-body-large">{props.content30}</p>
            </div>
            <span className="contact14-phone thq-body-small">
              {props.phone10}
            </span>
          </div>
        </div>
        <div className="contact14-content6">
          <svg viewBox="0 0 1024 1024" className="thq-icon-medium">
            <path d="M512 0c-176.732 0-320 143.268-320 320 0 320 320 704 320 704s320-384 320-704c0-176.732-143.27-320-320-320zM512 512c-106.040 0-192-85.96-192-192s85.96-192 192-192 192 85.96 192 192-85.96 192-192 192z"></path>
          </svg>
          <div className="contact14-contact-info3">
            <div className="contact14-content7">
              <h3 className="contact14-text6 thq-heading-3">
                {props.heading40}
              </h3>
              <p className="contact14-content4 thq-body-large">
                {props.content40}
              </p>
            </div>
            <span className="contact14-address thq-body-small">
              {props.address10}
            </span>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

EventSignup.defaultProps = {
  imageSrc:
    'https://images.unsplash.com/photo-1542647528472-694d48ba60d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyMTI1MDMxNHw&ixlib=rb-4.0.3&q=80&w=1080',
  text: 'Lorem ipsum dolorum sit amet',
  button: 'Sign Up',
  content2: 'Event Name',
  action: 'Submit',
  imageAlt: 'Image1',
  content1: 'Hosted By: USERNAME',
  heading1: 'Event Name',
  heading: 'Description',

  heading10: 'Date',
  content20:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.',
  phone10: '+123-456-7890',
  heading40: 'Location',
  heading20: 'Requirements',
  link10: 'Start new chat',
  content10:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.',
  content40:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.',
  email10: 'info@example.com',
  heading30: 'Contact',
  address10: '123 Main Street, City, Country',
  content30:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.',
}

EventSignup.propTypes = {
  imageSrc: PropTypes.string,
  text: PropTypes.string,
  button: PropTypes.string,
  content2: PropTypes.string,
  action: PropTypes.string,
  imageAlt: PropTypes.string,
  content1: PropTypes.string,
  heading1: PropTypes.string,
  heading: PropTypes.string,

  heading10: PropTypes.string,
  content20: PropTypes.string,
  phone10: PropTypes.string,
  heading40: PropTypes.string,
  heading20: PropTypes.string,
  link10: PropTypes.string,
  content10: PropTypes.string,
  content40: PropTypes.string,
  email10: PropTypes.string,
  heading30: PropTypes.string,
  address10: PropTypes.string,
  content30: PropTypes.string,
}
export default EventSignup
