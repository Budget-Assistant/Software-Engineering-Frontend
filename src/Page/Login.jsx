import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleChange } from '../Login/handleChange';
import { handleSubmit } from '../Login/handleSubmit';
import { handleGoogleLogin } from '../Login/handleGoogleLogin';
import '../style/Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Check if the token is present in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            // Store the token if found
            localStorage.setItem('token', token);
            navigate('/add-transaction'); // Redirect to the dashboard
        }
    }, []);

    return (
        <div className="login-page">
            <div className="login-image-container">
                <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt="Login illustration"
                    className="login-image"
                />
            </div>

            <div className="login-container">
                <h2 className='login-header'>歡迎來到記帳助手</h2>
                
                <form onSubmit={(e) => handleSubmit(e, formData, navigate)} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email/Username:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => handleChange(e, formData, setFormData)}
                            placeholder="Enter your email or username"
                            required
                            className="login-form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => handleChange(e, formData, setFormData)}
                            placeholder="Enter your password"
                            required
                            className="login-form-input"
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Log In
                    </button>
                </form>

                <div className="divider">
                    <span>Or</span>
                </div>

                {/* Google Login Button */}
                <div className="google-login-container">
                    <button className="btn bg-light" onClick={handleGoogleLogin}>
                        Login with &nbsp;    
                        <img
                            src="https://cdn.iconscout.com/icon/free/png-256/free-google-logo-icon-download-in-svg-png-gif-file-formats--brands-pack-logos-icons-189824.png?f=webp&w=128"
                            alt="Google Logo"
                            className="ml-4"
                            width={20}
                        />
                    </button>
                </div>

                <div className="additional-links">
                    <div className='remember-me'>
                        <input type="checkbox" />
                        <p>Remember me</p>
                    </div>
                    <Link to="/forgot-password" className="forgot-password">Forgot password ?</Link>
                </div>

                <div className="link">
                    <span>Don't have an account ?</span> <Link to="/sign-up" className="register-link">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;