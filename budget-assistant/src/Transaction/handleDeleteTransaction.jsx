export const handleDeleteTransaction = async (id, transactions, setTransactions, token) => {
    if (!transactions) {
        console.error('Transactions is undefined');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/api/transactions/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.ok) {
            setTransactions(transactions.filter((transaction) => transaction._id !== id));
        } else {
            console.error(`Failed to delete transaction: ${await response.text()}`);
        }
    } catch (error) {
        console.error(`Error deleting transaction: ${error}`);
    }
};