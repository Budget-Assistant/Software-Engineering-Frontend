export const fetchCustomKinds = async (token, setCustomKinds) => {
    try {
        const response = await fetch('https://budget-assistant-backend.onrender.com/api/customized-kinds', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch custom kinds');
        }
        const data = await response.json();
        setCustomKinds(data);
    } catch (error) {
        console.error('Failed to fetch custom kinds:', error);
    }
};