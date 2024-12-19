import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { handleTransactionEdit } from '../Transaction/handleTransactionEdit';
import { format } from 'date-fns';
import { fetchCustomKinds } from '../Transaction/fetchCustomKinds';
import { handleFileChange } from '../Transaction/handleFileChange';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/EditTransactionPage.css';

const EditTransactionPage = () => {
    const { id } = useParams(); // Get the transaction ID from the URL
    const [transaction, setTransaction] = useState(null);
    const [amount, setAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [kind, setKind] = useState('');
    const [type, setType] = useState('expense');
    const [customKinds, setCustomKinds] = useState([]);
    const [file, setFile] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await fetch(`https://budget-assistant-backend.onrender.com/api/transactions/${id}`, {

                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setTransaction(data);
                    setAmount(data.amount);
                    setSelectedDate(format(new Date(data.date), 'yyyy/MM/dd'));
                    setDescription(data.description);
                    setKind(data.kind);
                    setType(data.type);
                    setFile(data.file);
                } else {
                    console.error(`Failed to fetch transaction: ${response.status} ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error fetching transaction:', error);
            }
        };

        fetchTransaction();
        fetchCustomKinds(token, setCustomKinds);
    }, [id, token]);
    if (!transaction) {
        return <div>Loading...</div>; // Show a loading state while fetching data
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleTransactionEdit(id, { amount, description, type, kind, date: selectedDate, file }, token)
            .then(() => navigate('/add-transaction'))
            .catch(err => console.error(err));
    };

    return (
        <div className="container main-container">
            <h1 className="text-center mb-4">編輯交易</h1>
            <h2 className="text-center mb-4">請選擇日期，紀錄您的帳務~</h2>

            {/* 日期選擇器 */}
            <div className="date-picker-container text-center mb-4">
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(format(date, 'yyyy/MM/dd'))}
                    dateFormat="yyyy/MM/dd"
                    inline
                />
            </div>

            {/* 表單 */}
            <form 
                className="row g-3"
                onSubmit={handleSubmit}
            >
                {/* 金額輸入框 */}
                <div className="col-md-6">
                    <label className="">金額 (Amount):</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        required 
                    />
                </div>

                {/* 描述輸入框 */}
                <div className="col-md-6">
                    <label className="">描述 (Description):</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>

                {/* 種類下拉選單 */}
                <div className="col-md-6">
                    <label className="">種類 (Type):</label>
                    <select 
                        className="form-select" 
                        value={type} 
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="expense">支出 (Expense)</option>
                        <option value="income">收入 (Income)</option>
                        <option value="budget">預算 (Budget)</option>
                    </select>
                </div>

                {/* 分類下拉選單 */}
                <div className="col-md-6">
                    <label className="">分類 (Kind):</label>
                    <select 
                        className="form-select" 
                        value={kind} 
                        onChange={(e) => setKind(e.target.value)}
                    >
                        {type === 'expense' ? (
                            <>
                                <option value="食物">食物</option>
                                <option value="日用品">日用品</option>
                                <option value="交通">交通</option>
                                <option value="娛樂">娛樂</option>
                                <option value="其他">其他</option>
                                {customKinds
                                    .filter(customKind => customKind.type === 'expense')
                                    .map(customKind => (
                                        <option key={customKind._id} value={customKind.name}>
                                            {customKind.name}
                                        </option>
                                    ))}
                            </>
                        ) : type === 'income' ? (
                            <>
                                <option value="薪資">薪資</option>
                                <option value="投資">投資</option>
                                <option value="副業">副業</option>
                                <option value="其他">其他</option>
                                {customKinds
                                    .filter(customKind => customKind.type === 'income')
                                    .map(customKind => (
                                        <option key={customKind._id} value={customKind.name}>
                                            {customKind.name}
                                        </option>
                                    ))}
                            </>
                        ) : (
                            <option value="預算">預算</option>
                        )}
                    </select>
                </div>

                {/* 上傳文件 */}
                <div className="col-md-6">
                    <label className="">上傳文件 (File):</label>
                    <input 
                        type="file" 
                        className="form-control" 
                        onChange={(e) => handleFileChange(e, setFile)} 
                    />
                </div>

                {/* 按鈕區 */}
                <div className="col-12 text-center mt-4">
                    <button 
                        type="submit" 
                        className="btn btn-primary me-3"
                    >
                        更新
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => navigate('/add-transaction')}
                    >
                        取消
                    </button>
                </div>
            </form>
        </div>

    );
};

export default EditTransactionPage;