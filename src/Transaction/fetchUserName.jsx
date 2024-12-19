export const fetchUserName = async (token, setUserName) => {
    try {
        const response = await fetch('http://localhost:3001/api/users/info', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (data.success) {
            setUserName(data.user.username);
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
};
