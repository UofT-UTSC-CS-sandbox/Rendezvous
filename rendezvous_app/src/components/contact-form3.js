import React from 'react'

import PropTypes from 'prop-types'

import './contact-form3.css'

const ContactForm3 = (props) => {
  return (
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
              <h1 className="thq-heading-2">{props.heading1}</h1>
              <span className="thq-body-small">{props.content1}</span>
            </div>
          </div>
          <div className="contact-form3-section-title1 thq-card">
            <div className="contact-form3-content2">
              <h2>{props.heading}</h2>
              <span>{props.text}</span>
            </div>
          </div>
          <button type="button" className="contact-form3-button button">
            {props.button}
          </button>
        </div>
      </div>
    </div>
  )
}

ContactForm3.defaultProps = {
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
}

ContactForm3.propTypes = {
  imageSrc: PropTypes.string,
  text: PropTypes.string,
  button: PropTypes.string,
  content2: PropTypes.string,
  action: PropTypes.string,
  imageAlt: PropTypes.string,
  content1: PropTypes.string,
  heading1: PropTypes.string,
  heading: PropTypes.string,
}

export default ContactForm3
