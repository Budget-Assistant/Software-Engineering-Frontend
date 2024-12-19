export const handlePasswordUpdate = async (e, oldPassword, newPassword, token, navigate, setOldPassword, setNewPassword, setIsEditingPassword) => {
    e.preventDefault();
    try {
        const response = await fetch('https://budget-assistant-backend.onrender.com/api/users/password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                oldPassword,
                newPassword 
            })
        });
        const data = await response.json();
        if (data.success) {
            alert('密碼更新成功！');
            setOldPassword('');  // 清空密碼輸入
            setNewPassword('');  // 清空密碼輸入
            setIsEditingPassword(false);  // 關閉編輯視窗
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error updating password:', error);
        alert('更新失敗，請稍後再試');
    }
}; 