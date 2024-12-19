export const handleSetting = async (e,newUsername,token,navigate) => {
    e.preventDefault();
    try {
        const response = await fetch('https://budget-assistant-backend.onrender.com/users/settings', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username: newUsername })
        });

        if (response.ok) {
            alert('用戶名稱更新成功！');
            navigate('/add-transaction');
        } else {
            const data = await response.json();
            alert(data.message || '更新失敗，請稍後再試');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('發生錯誤，請稍後再試');
    }
};