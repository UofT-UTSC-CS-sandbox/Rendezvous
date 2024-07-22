import { Link } from "react-router-dom";
import React, { useState } from 'react';
import BackendApi from "./fastapi";

import { Helmet } from 'react-helmet'
import './register.css'
import PropTypes from 'prop-types'

const Register = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        // email: ''
    });
    const [msg, setMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await BackendApi.post('/register', formData);
            console.log('Response:', response.data);
            setMsg('Registration Successful!');
        } catch (error) {
            console.error('Error:', error);
            setMsg('Registration failed');
        }
    };

    return (

        <div className="register-container">
            <Helmet>
                <title>Register - Rendezvous</title>
                <meta property="og:title" content="Register - Rendezvous" />
            </Helmet>
            <div className="sign-up3-container">
                <div className="sign-up3-max-width">
                    <div className="sign-up3-container1">
                        <img
                            alt={props.image1Alt}
                            src={props.image1Src}
                            className="sign-up3-sign-up-image thq-img-ratio-4-6"
                        />
                    </div>
                    <div className="sign-up3-form-root thq-section-padding">
                        <div className="sign-up3-form">

                            <div className="sign-up3-title-root">
                                <h2 className="thq-heading-2">{props.heading1}</h2>
                                <div className="sign-up3-have-an-account-login">
                                    <p className="thq-body-large">{props.content2}</p>
                                </div>
                            </div>
                            {msg && <p>{msg}</p>}
                            <form className="sign-up3-form1" onSubmit={handleSubmit}>
                                <div className="sign-up3-email">
                                    <label htmlFor="thq-sign-up-3-email" className="thq-body-large">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        id="thq-sign-up-3-email"
                                        required="true"
                                        placeholder="Email"
                                        className="sign-up3-textinput thq-body-large thq-input"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="sign-up3-username">
                                    <label htmlFor="thq-sign-up-3-username" className="thq-body-large">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="thq-sign-up-3-username"
                                        required="true"
                                        placeholder="Username"
                                        className="sign-up3-textinput thq-body-large thq-input"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="sign-up3-password">
                                    <div className="sign-up3-textfield">
                                        <div className="sign-up3-container2">
                                            <label
                                                htmlFor="thq-sign-up-3-password"
                                                className="thq-body-large"
                                            >
                                                Password
                                            </label>
                                            <div className="sign-up3-hide-password">
                                                <svg viewBox="0 0 1024 1024" className="sign-up3-icon">
                                                    <path d="M317.143 762.857l44.571-80.571c-66.286-48-105.714-125.143-105.714-206.857 0-45.143 12-89.714 34.857-128.571-89.143 45.714-163.429 117.714-217.714 201.714 59.429 92 143.429 169.143 244 214.286zM539.429 329.143c0-14.857-12.571-27.429-27.429-27.429-95.429 0-173.714 78.286-173.714 173.714 0 14.857 12.571 27.429 27.429 27.429s27.429-12.571 27.429-27.429c0-65.714 53.714-118.857 118.857-118.857 14.857 0 27.429-12.571 27.429-27.429zM746.857 220c0 1.143 0 4-0.571 5.143-120.571 215.429-240 432-360.571 647.429l-28 50.857c-3.429 5.714-9.714 9.143-16 9.143-10.286 0-64.571-33.143-76.571-40-5.714-3.429-9.143-9.143-9.143-16 0-9.143 19.429-40 25.143-49.714-110.857-50.286-204-136-269.714-238.857-7.429-11.429-11.429-25.143-11.429-39.429 0-13.714 4-28 11.429-39.429 113.143-173.714 289.714-289.714 500.571-289.714 34.286 0 69.143 3.429 102.857 9.714l30.857-55.429c3.429-5.714 9.143-9.143 16-9.143 10.286 0 64 33.143 76 40 5.714 3.429 9.143 9.143 9.143 15.429zM768 475.429c0 106.286-65.714 201.143-164.571 238.857l160-286.857c2.857 16 4.571 32 4.571 48zM1024 548.571c0 14.857-4 26.857-11.429 39.429-17.714 29.143-40 57.143-62.286 82.857-112 128.571-266.286 206.857-438.286 206.857l42.286-75.429c166.286-14.286 307.429-115.429 396.571-253.714-42.286-65.714-96.571-123.429-161.143-168l36-64c70.857 47.429 142.286 118.857 186.857 192.571 7.429 12.571 11.429 24.571 11.429 39.429z"></path>
                                                </svg>
                                                <span className="thq-body-small">Hide</span>
                                            </div>
                                        </div>
                                        <input
                                            type="password"
                                            id="thq-sign-up-3-password"
                                            required="true"
                                            placeholder="Password"
                                            className="sign-up3-textinput1 thq-body-large thq-input"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <span className="sign-up3-text05 thq-body-small">
                                        {props.content1}
                                    </span>
                                </div>
                                <button type="submit" className="thq-button-filled sign-up3-button">
                                    <span className="sign-up3-text10 thq-body-small">
                                        {props.action1}
                                    </span>
                                </button>
                                
                            </form>

                            <div className="sign-up3-have-an-account-login1">
                                <p className="thq-body-large">Already have an account? <Link to="/login">Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        /*
                <div>
                    <h1>Register</h1>
                    {msg && <p>{msg}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <button type="submit">Register</button>
                    </form>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
                */
    );
};

Register.defaultProps = {
    action1: 'Register',
    image1Alt: 'Sign Up Image',
    image1Src:
        'https://images.unsplash.com/photo-1579169233264-1f7866d3a890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxODQxOTU1Mnw&ixlib=rb-4.0.3&q=80&w=1080',
    content2:
        'Create your account today to start exploring a world of opportunities.',
    heading1: 'Register Now',
    content1:
        'Join our social platform to connect with others, attend events, and build networks.',
}

Register.propTypes = {
    action1: PropTypes.string,
    image1Alt: PropTypes.string,
    image1Src: PropTypes.string,
    content2: PropTypes.string,
    heading1: PropTypes.string,
    content1: PropTypes.string,
}
export default Register;
