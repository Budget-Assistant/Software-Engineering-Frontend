export const handleUsernameUpdate = async (e,newUsername,token,setNewUsername) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3001/api/users/settings', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username: newUsername })
        });

        if (response.ok) {
            alert('用戶名稱更新成功！');
            setNewUsername('');  // 清空用戶名稱輸入
        } else {
            const data = await response.json();
            alert(data.message || '更新失敗，請稍後再試');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('發生錯誤，請稍後再試');
    }
};