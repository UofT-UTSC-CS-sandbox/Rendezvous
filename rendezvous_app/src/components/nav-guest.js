import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import './nav-guest.css'

const NavGuest = (props) => {
  return (
    <header className={`nav-guest-container ${props.rootClassName} `}>
      <header data-thq="thq-navbar" className="nav-guest-navbar-interactive">
        <img
          alt={props.logoAlt}
          src={props.logoSrc}
          className="nav-guest-image1"
        />
        <div data-thq="thq-navbar-nav" className="nav-guest-desktop-menu">
          <nav className="nav-guest-links">
            <Link to="/" className="nav-guest-link1 thq-link thq-body-small">
              {props.link1}
            </Link>
            <Link
              to="/about"
              className="nav-guest-link2 thq-link thq-body-small"
            >
              {props.link2}
            </Link>
            <Link
              to="/log-in"
              className="nav-guest-link3 thq-link thq-body-small"
            >
              {props.link3}
            </Link>
            <Link
              to="/log-in"
              className="nav-guest-link4 thq-link thq-body-small"
            >
              {props.link4}
            </Link>
            <Link
              to="/log-in"
              className="nav-guest-link5 thq-link thq-body-small"
            >
              {props.link5}
            </Link>
          </nav>
          <div className="nav-guest-buttons">
            <Link
              to="/log-in"
              className="nav-guest-action1 thq-button-filled thq-button-animated"
            >
              <span className="thq-body-small">{props.action1}</span>
            </Link>
            <Link
              to="/register"
              className="nav-guest-action2 thq-button-animated thq-button-outline"
            >
              <span className="thq-body-small">{props.action2}</span>
            </Link>
          </div>
        </div>
        <div data-thq="thq-burger-menu" className="nav-guest-burger-menu">
          <svg viewBox="0 0 1024 1024" className="nav-guest-icon">
            <path
              d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
              className=""
            ></path>
          </svg>
        </div>
        <div data-thq="thq-mobile-menu" className="nav-guest-mobile-menu">
          <div className="nav-guest-nav">
            <div className="nav-guest-top">
              <img
                alt={props.logoAlt}
                src={props.logoSrc}
                className="nav-guest-logo"
              />
              <div data-thq="thq-close-menu" className="nav-guest-close-menu">
                <svg viewBox="0 0 1024 1024" className="nav-guest-icon2">
                  <path
                    d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"
                    className=""
                  ></path>
                </svg>
              </div>
            </div>
            <nav className="nav-guest-links1">
              <span className="thq-link thq-body-small">{props.link1}</span>
              <span className="thq-link thq-body-small">{props.link2}</span>
              <span className="thq-link thq-body-small">{props.link3}</span>
              <span className="thq-link thq-body-small">{props.link4}</span>
              <span className="thq-link thq-body-small">{props.link5}</span>
            </nav>
          </div>
          <div className="nav-guest-buttons1">
            <button className="thq-button-filled">Login</button>
            <button className="thq-button-outline">Register</button>
          </div>
        </div>
      </header>
    </header>
  )
}

NavGuest.defaultProps = {
  link4: 'Friends',
  logoSrc:
    'https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/84ec08e8-34e9-42c7-9445-d2806d156403/fac575ac-7a41-484f-b7ac-875042de11f8?org_if_sml=1&force_format=original',
  link1: 'Home',
  rootClassName: '',
  logoAlt: 'Social Platform Logo',
  action1: 'Sign In',
  link3: 'Events',
  link5: 'Profile',
  action2: 'Register',
  link2: 'About',
}

NavGuest.propTypes = {
  link4: PropTypes.string,
  logoSrc: PropTypes.string,
  link1: PropTypes.string,
  rootClassName: PropTypes.string,
  logoAlt: PropTypes.string,
  action1: PropTypes.string,
  link3: PropTypes.string,
  link5: PropTypes.string,
  action2: PropTypes.string,
  link2: PropTypes.string,
}

export default NavGuest
