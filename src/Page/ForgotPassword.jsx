import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../ForgotPassword/sendOtp';
import { verifyOtpAndResetPassword } from '../ForgotPassword/verifyOtpAndResetPassword';
import '../style/ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-card">
                <h2>Forgot Password</h2>
                {!otpSent ? (
                    <div className="input-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="styled-input"
                        />
                        <button onClick={() => sendOtp(email, setOtpSent)} className="styled-button">Send OTP</button>
                        <button onClick={() => navigate('/login')} className="styled-button">Back</button>
                    </div>
                ) : (
                    <div className="input-group">
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="styled-input"
                        />
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            className="styled-input"
                        />
                        <button onClick={() => verifyOtpAndResetPassword(email, otp, newPassword)} className="styled-button">Reset Password</button>
                        <button onClick={() => navigate('/login')} className='login-button'>Back</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;