import { jwtDecode } from 'jwt-decode';
import { fetchTransactions } from './fetchTransactions';
import { format } from 'date-fns';
export const handleTransactionAdd = async (e, selectedDate, amount, description, type, kind, file, setFormData, transactions, setTransactions, token) => {
    e.preventDefault();

    if (!token) {
        console.error('No token found. Please log in.');
        return;
    }
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    //console.log(format(selectedDate, 'yyyy/MM/dd'));
    const formDataToSend = new FormData();
    formDataToSend.append('user', userId);
    formDataToSend.append('date', format(selectedDate, 'yyyy/MM/dd'))
    formDataToSend.append('amount', parseFloat(amount));
    formDataToSend.append('description', description);
    formDataToSend.append('type', type);
    formDataToSend.append('kind', kind);

    if (file) {
        formDataToSend.append('file', file); // Append the file if it exists
    }

    try {
        const response = await fetch('https://budget-assistant-backend.onrender.com/api/transactions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formDataToSend,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const savedTransaction = await response.json();
        setTransactions([...transactions, savedTransaction]);
        fetchTransactions(token, setTransactions);
        setFormData({});
    } catch (error) {
        console.error(`Failed to save transaction: ${error.message}`);
    }
};