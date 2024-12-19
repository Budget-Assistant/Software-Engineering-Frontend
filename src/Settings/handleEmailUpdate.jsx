export const handleEmailUpdate = async (e, newEmail, token, setUserInfo, setIsEditingEmail) => {
    e.preventDefault();
    try {
        const response = await fetch('https://budget-assistant-backend.onrender.com/api/users/email', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email: newEmail })
        });
        const data = await response.json();
        if (data.success) {
            setUserInfo(prev => ({ ...prev, email: newEmail }));
            setIsEditingEmail(false);
            alert('Email 更新成功！');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error updating email:', error);
        alert('更新失敗，請稍後再試');
    }
};