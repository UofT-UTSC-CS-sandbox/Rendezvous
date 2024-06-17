import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import './hero7.css'

const Hero7 = (props) => {
  return (
    <div className="thq-section-padding">
      <div className="hero7-max-width thq-section-max-width">
        <div className="hero7-content">
          <h1 className="hero7-text thq-heading-1">{props.heading1}</h1>
          <p className="hero7-text1 thq-body-large">{props.content1}</p>
          <div className="hero7-actions">
            <div className="hero7-container">
              <button className="hero7-button thq-button-filled">
                <Link to="/register" className="hero7-text2 thq-body-small">
                  {props.action1}
                </Link>
              </button>
            </div>
            <div className="hero7-container1"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

Hero7.defaultProps = {
  content1:
    'Join Rendezvous to discover and sign up for exciting events near you. Connect with like-minded individuals and expand your network through shared interests.',
  heading1: 'Connect with Others',
  action1: 'Sign Up Now',
  action2: 'Learn More',
}

Hero7.propTypes = {
  content1: PropTypes.string,
  heading1: PropTypes.string,
  action1: PropTypes.string,
  action2: PropTypes.string,
}

export default Hero7
