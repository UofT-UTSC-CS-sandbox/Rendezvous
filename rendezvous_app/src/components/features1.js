import React from 'react'

import PropTypes from 'prop-types'

import './features1.css'

const Features1 = (props) => {
  return (
    <div className="features1-layout251 thq-section-padding">
      <div className="features1-max-width thq-section-max-width">
        <div className="thq-flex-row features1-section-title">
          <div className="features1-column thq-flex-column">
            <h2 className="thq-heading-2 features1-text">
              {props.sectionTitle}
            </h2>
          </div>
          <span className="thq-body-small">{props.sectionDescription}</span>
        </div>
        <div className="features1-content">
          <div className="features1-row thq-flex-row">
            <div className="features1-feature1 thq-flex-column">
              <img
                alt={props.feature1ImageAlt}
                src={props.feature1ImageSrc}
                className="thq-img-ratio-4-3 features1-feature1-image"
              />
              <div className="features1-content1 thq-flex-column">
                <h3 className="thq-heading-3">{props.feature1Title}</h3>
                <span className="thq-body-small">
                  {props.feature1Description}
                </span>
              </div>
            </div>
            <div className="features1-feature2 thq-flex-column">
              <img
                alt={props.feature2ImageAlt}
                src={props.feature2ImageSrc}
                className="thq-img-ratio-4-3 features1-feature2-image"
              />
              <div className="features1-content2 thq-flex-column">
                <h3 className="thq-heading-3">{props.feature2Title}</h3>
                <span className="thq-body-small">
                  {props.feature2Description}
                </span>
              </div>
            </div>
            <div className="features1-feature3 thq-flex-column">
              <img
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                className="thq-img-ratio-4-3 features1-feature3-image"
              />
              <div className="features1-content3 thq-flex-column">
                <h3 className="thq-heading-3">{props.feature3Title}</h3>
                <span className="thq-body-small">
                  {props.feature3Description}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="features1-actions">
          <button className="features1-button thq-button-filled">
            <span className="thq-body-small">{props.mainAction}</span>
          </button>
          <button className="features1-button1 thq-button-outline">
            <span className="thq-body-small">{props.secondaryAction}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

Features1.defaultProps = {
  feature2Title: 'Connect with Friends',
  feature2Description:
    'Build your network by connecting with friends and fellow event attendees',
  sectionDescription: 'Explore the key features of our social platform',
  secondaryAction: 'Create your profile and start attending events',
  sectionTitle: 'Features',
  feature1Description: 'Easily sign up for events that interest you',
  feature3ImageAlt: 'Personalized Profile Image',
  feature1ImageAlt: 'Event Sign Up Image',
  feature2ImageAlt: 'Connect with Friends Image',
  feature3ImageSrc:
    'https://images.unsplash.com/photo-1648824572347-6edd9a108e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxODQwNzc0NHw&ixlib=rb-4.0.3&q=80&w=1080',
  feature2ImageSrc:
    'https://images.unsplash.com/photo-1527769929977-c341ee9f2033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxODQwNzc0NHw&ixlib=rb-4.0.3&q=80&w=1080',
  feature1Title: 'Event Sign Up',
  feature1ImageSrc:
    'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxODQwNzc0NHw&ixlib=rb-4.0.3&q=80&w=1080',
  slogan: 'Join, Connect, Attend',
  feature3Title: 'Personalized Profile',
  mainAction: 'Sign up for events and connect with others',
  feature3Description:
    'Customize your profile to showcase your interests and preferences',
}

Features1.propTypes = {
  feature2Title: PropTypes.string,
  feature2Description: PropTypes.string,
  sectionDescription: PropTypes.string,
  secondaryAction: PropTypes.string,
  sectionTitle: PropTypes.string,
  feature1Description: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
  feature1ImageAlt: PropTypes.string,
  feature2ImageAlt: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
  feature1Title: PropTypes.string,
  feature1ImageSrc: PropTypes.string,
  slogan: PropTypes.string,
  feature3Title: PropTypes.string,
  mainAction: PropTypes.string,
  feature3Description: PropTypes.string,
}

export default Features1
