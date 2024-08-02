import React from "react";
import { useAuth } from '../../AuthContext';

import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import './navbar.css'


const Navbar = (props) => {
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        
        <header className={`nav-guest-container ${props.rootClassName} `}>
      <header data-thq="thq-navbar" className="nav-guest-navbar-interactive">
        <a href="/home" className="nav-guest-logo">
        <img
          alt={props.logoAlt}
          src={props.logoSrc}
          className="nav-guest-image1"
        />
        </a>
        <div data-thq="thq-navbar-nav" className="nav-guest-desktop-menu">
          <nav className="nav-guest-links">
            <Link to="/home" className="nav-guest-link1 thq-link thq-body-small">
              {props.link1}
            </Link>
            <Link
              to="/about"
              className="nav-guest-link2 thq-link thq-body-small"
            >
              {props.link2}
            </Link>
            <Link
              to="/HostEvent"
              className="nav-guest-link3 thq-link thq-body-small"
            >
              {props.link3}
            </Link>
            <Link
              to="/friends"
              className="nav-guest-link4 thq-link thq-body-small"
            >
              {props.link4}
            </Link>
            <Link
              to="/profile"
              className="nav-guest-link5 thq-link thq-body-small"
            >
              {props.link5}
            </Link>
          </nav>


          <div className="nav-guest-buttons">
                        {isAuthenticated ? (
                            <button className="nav-guest-action thq-button-filled thq-button-animated" onClick={handleLogout}>
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="nav-guest-action thq-button-filled thq-button-animated">
                                    Log In
                                </Link>
                                <Link to="/register" className="nav-guest-action thq-button-animated thq-button-outline">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
        </div>
      </header>
    </header>
    );
};

Navbar.defaultProps = {
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
  
  Navbar.propTypes = {
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
export default Navbar;
