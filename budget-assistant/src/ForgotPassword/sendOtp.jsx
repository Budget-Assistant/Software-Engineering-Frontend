export const sendOtp = async (email, setOtpSent) => {
    try {
        const response = await fetch('http://localhost:3001/api/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error('Failed to send OTP');
        }

        setOtpSent(true);
        alert('OTP has been sent to your email.');
    } catch (error) {
        console.error('Error sending OTP:', error);
        alert('There was a problem sending the OTP. Please try again.');
    }
};