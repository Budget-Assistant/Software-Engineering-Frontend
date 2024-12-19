export const handleSubmit = async (e, formData, navigate) => {
    e.preventDefault();
    try {
        const response = await fetch('https://budget-assistant-backend.onrender.com/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                alert('密碼錯誤'); // Password incorrect
            } else {
                throw new Error('Login failed');
            }
        } else {
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('token', data.token); // Store the token
                alert('Login successful');
                navigate('/add-transaction');
            }
        }
    } catch (error) {
        alert('尚未註冊帳號');
        console.error('Login error:', error);
    }
};