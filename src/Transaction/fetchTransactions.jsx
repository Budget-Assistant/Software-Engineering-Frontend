export const fetchTransactions = async (token, setEditingTransactions) => {
    try {
        const response = await fetch('http://localhost:3001/api/transactions', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        // Convert binary data to Base64 if it exists
        const transactionsWithMedia = data.map(transaction => {
            if (transaction.file && transaction.file.data) {
                const binary = new Uint8Array(transaction.file.data.data);
                const blob = new Blob([binary], { type: transaction.file.contentType });
                transaction.fileUrl = URL.createObjectURL(blob);
            }
            return transaction;
        });

        setEditingTransactions(transactionsWithMedia);
    } catch (error) {
        console.error('Failed to fetch transactions:', error);
    }
};