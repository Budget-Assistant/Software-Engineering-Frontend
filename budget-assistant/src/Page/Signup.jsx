import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleChange } from '../Signup/handleChange';
import { handleSubmit } from '../Signup/handleSubmit';
import '../style/Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password2: ''
  });

  const navigate = useNavigate();

  return (
    <div className='signup-page'>
      <div className="signup-container">
        <h2>註冊帳號</h2>
        <h2>Sign Up</h2>
        <form onSubmit={(e) => handleSubmit(e, formData, navigate)}>
          <div className="form-group">
            <label htmlFor="email">電子郵件:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e, formData, setFormData)}
              placeholder="輸入您的電子郵件"
              required
              className="signup-form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">用戶名:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={(e) => handleChange(e, formData, setFormData)}
              placeholder="輸入您的用戶名"
              required
              className="signup-form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">密碼:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e, formData, setFormData)}
              placeholder="輸入您的密碼"
              required
              className="signup-form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password2">確認密碼:</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={(e) => handleChange(e, formData, setFormData)}
              placeholder="再次輸入您的密碼"
              required
              className="signup-form-input"
            />
          </div>
          <button type="submit" className="signup-button">
            註冊
          </button>
        </form>
        <div className="link">
            <span>Already have an account?</span> <Link to="/login" className="login-link">Log in</Link>
        </div>
      </div>
      <div className="signup-image-container">
          <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Signup illustration"
              className="signup-image"
          />
      </div>
    </div>
  );
};

export default Signup;