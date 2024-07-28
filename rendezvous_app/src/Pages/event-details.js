import React from 'react'

import { Helmet } from 'react-helmet'

import ContactForm3 from '../components/contact-form3'
import Contact14 from '../components/contact14'
import './event-details.css'

const EventDetails = (props) => {
  return (
    <div className="event-details-container">
      <Helmet>
        <title>Event-Details - Rendezvous</title>
        <meta property="og:title" content="Event-Details - Rendezvous" />
      </Helmet>
      <ContactForm3></ContactForm3>
      <Contact14></Contact14>
    </div>
  )
}

export default EventDetails
