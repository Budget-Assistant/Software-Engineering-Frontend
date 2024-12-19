export const handleTransactionEdit = async (id, transaction, token) => {
    const formData = new FormData();
    for (const key in transaction) {
        formData.append(key, transaction[key]);
    }
    try {
        const response = await fetch(`http://localhost:3001/api/transactions/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        if (response.ok) {
            alert('交易更新成功！');
        } else {
            alert('更新失敗，請稍後再試');
        }
    } catch (error) {
        console.error('Error updating transaction:', error);
    }
};