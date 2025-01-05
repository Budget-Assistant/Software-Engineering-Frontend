import React, { useState, useEffect } from 'react';
import { handleAddRecurringTransaction } from '../Transaction/handleAddRecurringTransaction'; // Ensure this function is implemented
import { fetchCustomKinds } from '../Transaction/fetchCustomKinds';
import {useNavigate} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/RecurringTransactionPage.css';

const RecurringTransactionPage = () => {
    const [endDate, setEndDate] = useState(new Date());
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [kind, setKind] = useState('其他');
    const [type, setType] = useState('expense');
    const [file, setFile] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [recurringFrequency, setRecurringFrequency] = useState('monthly');
    const [startDate, setStartDate] = useState(new Date());
    const [customKinds, setCustomKinds] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchCustomKinds(token, setCustomKinds);
    }, [token]);


    //console.log(format(startDate, 'yyyy/MM/dd'));

    const setFormData = (data) => {
        setStartDate(data.selectedDate || new Date());
        setAmount(data.amount || '');
        setDescription(data.description || '');
        setKind(data.kind || '其他');
        setFile(data.file || null);
    };
    //console.log(format(selectedDate, 'yyyy/MM/dd'));

    return (
        <div className="container main-container">
        <h2 className="text-center mb-4">新增重複性交易</h2>
        <form 
            className="row g-3"
            onSubmit={(e) => handleAddRecurringTransaction(
                e, startDate, amount, description, type, kind, file, 
                setFormData, transactions, setTransactions, endDate, token, recurringFrequency
            )}
        >
            {/* 金額 */}
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
    
            {/* 描述 */}
            <div className="col-md-6">
                <label className="">描述 (Description):</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
            </div>
    
            {/* 種類 */}
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
    
            {/* 分類 */}
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
    
            {/* 上傳圖片 */}
            <div className="col-md-6">
                <label className="">上傳圖片 (Upload Image):</label>
                <input 
                    type="file" 
                    className="" 
                    onChange={(e) => setFile(e.target.files[0])} 
                />
            </div>
    
            {/* 重複頻率 */}
            <div className="col-md-6">
                <label className="">重複頻率 (Frequency):</label>
                <select 
                    className="form-select" 
                    value={recurringFrequency} 
                    onChange={(e) => setRecurringFrequency(e.target.value)}
                >
                    <option value="daily">每日 (Daily)</option>
                    <option value="weekly">每週 (Weekly)</option>
                    <option value="monthly">每月 (Monthly)</option>
                    <option value="yearly">每年 (Yearly)</option>
                </select>
            </div>
    
            {/* 開始日期 */}
            <div className="col-md-6">
                <label className="">開始日期 (Start Date):</label>
                <DatePicker 
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)} 
                    dateFormat="yyyy/MM/dd" 
                    className="form-control" 
                />
            </div>
    
            {/* 終止日期 */}
            <div className="col-md-6">
                <label className="">終止日期 (End Date):</label>
                <DatePicker 
                    selected={endDate} 
                    onChange={(date) => setEndDate(date)} 
                    dateFormat="yyyy/MM/dd" 
                    className="form-control" 
                />
            </div>
    
            {/* 按鈕區 */}
            <div className="col-12 text-center mt-3">
                <button 
                    type="button" 
                    onClick={() => navigate('/add-transaction')} 
                    className="btn btn-secondary me-2"
                >
                    返回
                </button>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >
                    新增重複性交易
                </button>
            </div>
        </form>
    </div>
    
    );
};

export default RecurringTransactionPage;