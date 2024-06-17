import { Link } from "react-router-dom";
import React, { useState } from 'react';
import BackendApi from "./fastapi";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
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
            <p>Already have an User? <Link to="/login">Login</Link></p>
        </div>
    );
};

export default Register;
