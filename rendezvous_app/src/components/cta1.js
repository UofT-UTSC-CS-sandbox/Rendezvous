import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import './cta1.css'

const CTA1 = (props) => {
  return (
    <div
      className={`cta1-container thq-section-padding ${props.rootClassName} `}
    >
      <div className="cta1-max-width thq-section-max-width">
        <div className="cta1-content">
          <h2 className="cta1-heading1 thq-heading-2">{props.heading1}</h2>
          <p className="cta1-content1 thq-body-large">{props.content1}</p>
          <div className="cta1-actions">
            <Link
              to="/event-creation"
              className="cta1-button thq-button-filled"
            >
              <span className="cta1-action1 thq-body-small">
                {props.action1}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

CTA1.defaultProps = {
  action1: 'Create Event',
  rootClassName: '',
  content1: 'Create your own event to connect with friends.',
  heading1: 'Want to host an event?',
  action2: 'Explore events',
}

CTA1.propTypes = {
  action1: PropTypes.string,
  rootClassName: PropTypes.string,
  content1: PropTypes.string,
  heading1: PropTypes.string,
  action2: PropTypes.string,
}

export default CTA1
