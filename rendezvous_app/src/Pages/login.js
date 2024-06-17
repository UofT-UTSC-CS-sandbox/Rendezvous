import { Link } from "react-router-dom";
import React, { useState } from 'react';
import BackendApi from './fastapi'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await BackendApi.post('/login', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            login(response.data.access_token)
            setMsg('Login Successful!');
            navigate('/home');
        } catch (error) {
            setMsg('Login failed');
        }
    };
    return (
        <div>
            <h1>Login</h1>
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
                <button type="submit">Login</button>
            </form>
            <p>Don't have an User? <Link to="/register">Register</Link></p>
        </div>
    );
};

export default Login;

