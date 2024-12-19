import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleKindAdded } from '../Transaction/handleKindAdded';
import { handleKindDeleted } from '../Transaction/handleKindDeleted';
import { fetchCustomKinds } from '../Transaction/fetchCustomKinds';
import { fetchTransactions } from '../Transaction/fetchTransactions';
import { handleDeleteTransaction } from '../Transaction/handleDeleteTransaction';
import { handleLogout } from '../Transaction/handleLogout';
import { formatDate } from '../Transaction/formatDate';
import { resetTime } from '../Transaction/resetTime';
import { handleDownload } from '../Transaction/handleDownload';
import { handleTransactionAdd } from '../Transaction/handleTransactionAdd';
import { handleFileChange } from '../Transaction/handleFileChange';
import AddNewKind from '../Transaction/AddNewKind';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/AddTransaction.css';
import './TransactionPage.css';
import TransactionCharts from '../Transaction/TransactionCharts';
import { jwtDecode } from 'jwt-decode';
import { getFirstDayOfWeek, getLastDayOfWeek, getFirstDayOfMonth, getLastDayOfMonth, getFirstDayOfYear, getLastDayOfYear } from '../Transaction/handleTransactionChart';
import { fetchUserName } from '../Transaction/fetchUserName';
const TransactionPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [quickSearchCurrentDay, setQuickSearchCurrentDay] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [kind, setKind] = useState('其他');
    const [type, setType] = useState('expense');
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [customKinds, setCustomKinds] = useState([]);
    const [file, setFile] = useState(null);
    const [selectedChart, setSelectedChart] = useState('選擇圖表');
    const [allTransactions, setAllTransactions] = useState([]);
    const [chartStartDate, setChartStartDate] = useState(new Date());
    const [quickTimeSelectFlagForLine, setQuickTimeSelectFlagForLine] = useState(false);//
    const [selectedChartForLine, setSelectedChartForLine] = useState('currentWeek');
    const [selectedDateForQuickSearch, setSelectedDateForQuickSearch] = useState('currentWeek');
    const [userName, setUserName] = useState('');
    const [enableQuickSearchFlag, setEnableQuickSearchFlag] = useState(false);//

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // Extract Token from URL Parameters and Redirect
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');

        if (tokenFromUrl) {
            // Save the token to localStorage
            localStorage.setItem('token', tokenFromUrl);

            // Clean up the URL by removing the token from the query parameters
            const url = new URL(window.location.href);
            url.searchParams.delete('token');
            window.history.replaceState({}, document.title, url.pathname);

            // Redirect to the add-transaction page without the token in the URL
            navigate('/add-transaction', { replace: true });
        }
    }, [navigate]);

    
    useEffect(() => {
        fetchUserName(token, setUserName);
    }, [token]);
    useEffect(() => {
        fetchCustomKinds(token, setCustomKinds);
    }, [token]);

    useEffect(() => {
        fetchTransactions(token, setTransactions, navigate);
        
    }, [token]);
    useEffect(() => {
       setSelectedChartForLine(selectedChartForLine)
    }, [selectedChartForLine]);
    useEffect(() => {
        setChartStartDate(chartStartDate)
    }, [chartStartDate]);
    useEffect(() => {
        setQuickSearchCurrentDay(quickSearchCurrentDay)
    }, [quickSearchCurrentDay]);
    useEffect(() => {
        setQuickTimeSelectFlagForLine(quickTimeSelectFlagForLine)//
    }, [quickTimeSelectFlagForLine]);
    useEffect(() => {
        setEnableQuickSearchFlag(enableQuickSearchFlag)//
    }, [enableQuickSearchFlag]);

    useEffect(() => {
        if (Array.isArray(transactions)) {
            if(enableQuickSearchFlag){
                const filtered = transactions.filter((transaction) => {
                const transactionDate = resetTime(new Date(transaction.date));
                return transactionDate >= resetTime(startDate) && transactionDate <= resetTime(endDate);
            })
            setFilteredTransactions(filtered);
            }else{
                const filtered = transactions.filter((transaction) => {
                    const transactionDate = resetTime(new Date(transaction.date));
                    if(selectedDateForQuickSearch === "currentWeek"){
                    return transactionDate >= resetTime(getFirstDayOfWeek(quickSearchCurrentDay)) && transactionDate <= resetTime(getLastDayOfWeek(quickSearchCurrentDay));
                    }
                    else if(selectedDateForQuickSearch === "currentDay"){
                        return transactionDate >= resetTime(quickSearchCurrentDay) && transactionDate <= resetTime(quickSearchCurrentDay);
                    }
                    else if(selectedDateForQuickSearch === "currentMonth"){
                        return transactionDate >= resetTime(getFirstDayOfMonth(quickSearchCurrentDay)) && transactionDate <= resetTime(getLastDayOfMonth(quickSearchCurrentDay));
                    }
                    else if(selectedDateForQuickSearch === "currentYear"){
                        return transactionDate >= resetTime(getFirstDayOfYear(quickSearchCurrentDay)) && transactionDate <= resetTime(getLastDayOfYear(quickSearchCurrentDay));
                    }
                })
                setFilteredTransactions(filtered);
            }
            
            
            const filteredForChart = transactions.filter((transaction) => {
                const transactionDate = resetTime(new Date(transaction.date));
                if(selectedChartForLine === "currentWeek"){
                return transactionDate >= resetTime(getFirstDayOfWeek(chartStartDate)) && transactionDate <= resetTime(getLastDayOfWeek(chartStartDate));
                }
                else if(selectedChartForLine === "currentDay"){
                    return transactionDate >= resetTime(chartStartDate) && transactionDate <= resetTime(chartStartDate);
                }
                else if(selectedChartForLine === "currentMonth"){
                    return transactionDate >= resetTime(getFirstDayOfMonth(chartStartDate)) && transactionDate <= resetTime(getLastDayOfMonth(chartStartDate));
                }
                else if(selectedChartForLine === "currentYear"){
                    return transactionDate >= resetTime(getFirstDayOfYear(chartStartDate)) && transactionDate <= resetTime(getLastDayOfYear(chartStartDate));
                }
            });

            setAllTransactions(filteredForChart.sort((a, b) => {
                const dateDiff = new Date(a.date) - new Date(b.date);
                if (dateDiff !== 0) return dateDiff;
                return b.amount - a.amount;
            }));

        } else {
            console.error('Transactions is not an array:', transactions);
        }}, [startDate, endDate, transactions,chartStartDate,selectedChartForLine,quickSearchCurrentDay,selectedDateForQuickSearch,enableQuickSearchFlag]);

    
    const formData = {
        selectedDate,
        amount,
        description,
        type,
        kind
    };

    const setFormData = (data) => {
        setSelectedDate(data.selectedDate || new Date());
        setAmount(data.amount || '');
        setDescription(data.description || '');
        setKind(data.kind || '其他');
        setType(data.type || 'expense');
        setFile(data.file || null);
    };

    const { incomeTotal, expenseTotal, netTotal, budgetTotal, remainingBudget } = filteredTransactions.reduce(
        (totals, transaction) => {
            if (transaction.type === 'budget') {
                totals.budgetTotal += transaction.amount;
            } else if (transaction.type === 'income') {
                totals.incomeTotal += transaction.amount;
            } else if (transaction.type === 'expense') {
                totals.expenseTotal += transaction.amount;
            }
            totals.netTotal = totals.incomeTotal - totals.expenseTotal;
            totals.remainingBudget = totals.budgetTotal - totals.expenseTotal;
            return totals;
        },
        { incomeTotal: 0, expenseTotal: 0, netTotal: 0, budgetTotal: 0, remainingBudget: 0 }
    );

    return (
        <div className="container py-4 main-container" >
        {/* 頁面頂端 */}
        <div className="fixed-top">
          <div
            className="d-flex justify-content-between align-items-center p-3 rounded"
            style={{ backgroundColor: "#DEDED2" }} // 淺綠色背景
          >
            <div className="d-flex align-items-center">
              <img
                src="/dollar icon.webp"
                alt="Dollar Icon"
                className="img-fluid rounded"
                style={{ width: "100px", height: "auto" }}
              />
              <span className="ms-3 fs-4 font-weight-bold"> {userName || '使用者'}的記帳本</span>
            </div>
      
            <div className="d-flex">
              <button
                onClick={() => handleLogout(navigate)}
                className="btn btn-danger me-2"
              >
                登出
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="btn btn-secondary"
              >
                ⚙️ 設定
              </button>
            </div>
          </div>
        </div>
      
        {/* 其他頁面內容 */}
        <div className='mg-set'>
          <h2 className="mb-4">您好，{userName || '使用者'}，現在開始紀錄您的帳務吧!!</h2>
      
          <div className="mb-4 d-flex justify-content-center">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy/MM/dd"
              inline
            />
          </div>
        </div>
      
    
        <div className="d-flex justify-content-center mb-4">
            <button 
                onClick={() => navigate('/add-recurring-transaction')} 
                className="btn btn-primary"
            >
                新增重複性交易
            </button>
        </div>

            <div className="container d-flex justify-content-center">
            <AddNewKind 
                token={token} 
                onKindAdded={(newKind) => handleKindAdded(newKind, customKinds, setCustomKinds, setKind, setType)} 
                onKindDeleted={(kindId) => handleKindDeleted(kindId, customKinds, setCustomKinds)} 
            />
    </div>

            <form className="row g-3" onSubmit={(e) => handleTransactionAdd(e, selectedDate, amount, description, type, kind, file, setFormData, transactions, setTransactions, token)}>
                <div className="col-md-6">
                    <label>金額(Amount):</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="col-md-6">
                    <label>描述(Description):</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-6">
                    <label>種類(Type):</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} className="form-select">
                        <option value="expense">支出(Expense)</option>
                        <option value="income">收入(Income)</option>
                        <option value="budget">預算(Budget)</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label>分類(Kind):</label>
                    <select value={kind} onChange={(e) => setKind(e.target.value)} className="form-select">
                        {type === 'expense' && (
                            <>
                                <option value="食物">食物</option>
                                <option value="日用品">日用品</option>
                                <option value="交通">交通</option>
                                <option value="娛樂">娛樂</option>
                                <option value="其他">其他</option>
                                {customKinds.filter(customKind => customKind.type === 'expense').map(customKind => (
                                    <option key={customKind._id} value={customKind.name}>
                                        {customKind.name}
                                    </option>
                                ))}
                            </>
                        )}
                        {type === 'income' && (
                            <>
                                <option value="薪資">薪資</option>
                                <option value="投資">投資</option>
                                <option value="副業">副業</option>
                                <option value="其他">其他</option>
                                {customKinds.filter(customKind => customKind.type === 'income').map(customKind => (
                                    <option key={customKind._id} value={customKind.name}>
                                        {customKind.name}
                                    </option>
                                ))}
                            </>
                        )}
                        {type === 'budget' && (
                            <option value="預算">預算</option>
                        )}
                    </select>
                </div>
                <div className="col-md-6">
                    <label>上傳文件(File):</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileChange(e, setFile)}
                        className="form-control"
                    />
                </div>
                <div className="col-12 d-flex justify-content-center">
                    <button type="submit" className="btn btn-success w-50">記帳</button>
                </div>
            </form>
    
            <div className="form-check form-switch mt-4 d-flex justify-content-center">
                <input
                    type="checkbox"
                    className="form-check-input"
                    checked={enableQuickSearchFlag}
                    onChange={() => setEnableQuickSearchFlag(!enableQuickSearchFlag)}
                    id="quick-search-checkbox"
                />
                <label className="form-check-label ms-2" htmlFor="quick-search-checkbox">
                    {enableQuickSearchFlag ? '範圍查詢' : '快速查詢'}
                </label>
            </div>

    
            <div className="d-flex justify-content-center">
                {enableQuickSearchFlag && (
                    <div className="row align-items-center mt-3 text-center">
                    <div className="col">
                        <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy/MM/dd"
                        className="form-control"
                        />
                    </div>
                    <div className="col">To</div>
                    <div className="col">
                        <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="yyyy/MM/dd"
                        className="form-control"
                        />
                    </div>
                    <h3 className="mt-3">以下是您從 {formatDate(startDate)} 到 {formatDate(endDate)} 的帳務~</h3>
                    </div>
                )}

                {!enableQuickSearchFlag && (
                    <div className="mt-3 text-center">
                    <DatePicker
                        selected={quickSearchCurrentDay}
                        onChange={(date) => setQuickSearchCurrentDay(date)}
                        dateFormat="yyyy/MM/dd"
                        inline
                    />
                    <select
                        value={selectedDateForQuickSearch}
                        onChange={(e) => setSelectedDateForQuickSearch(e.target.value)}
                        className="form-select mt-3"
                    >
                        <option value="currentDay">當日</option>
                        <option value="currentWeek">當周</option>
                        <option value="currentMonth">當月</option>
                        <option value="currentYear">當年</option>
                    </select>
                    </div>
                )}
            </div>

    
            <div className="transaction-grid mt-4">
                {filteredTransactions.sort((a, b) => new Date(a.date) - new Date(b.date)).map(transaction => (
                    <div key={transaction._id} className="border rounded p-3 mb-3">
                        <div><strong>{transaction.kind}</strong></div>
                        <div>{transaction.date}</div>
                        <div>
                            {transaction.type === 'expense' ? '支出' : transaction.type === 'income' ? '收入' : '預算'}: {transaction.amount} 元
                        </div>
                        <div>{transaction.description || '無描述'}</div>
                        {transaction.fileUrl && (
                            <a href={transaction.fileUrl} target="_blank" rel="noopener noreferrer">
                                查看圖片或影片
                            </a>
                        )}
                        <div className="d-flex mt-3">
                            <button onClick={() => navigate(`/edit-transaction/${transaction._id}`)} className="btn btn-outline-primary me-2">
                                編輯
                            </button>
                            <button onClick={() => handleDeleteTransaction(transaction._id, transactions, setTransactions, token)} className="btn btn-outline-danger">
                                刪除
                            </button>
                        </div>
                    </div>
                ))}
            </div>
    
            <h3 className="mt-4">您總共賺到：{incomeTotal}元</h3>
            <h3>您總共花費：{expenseTotal}元</h3>
            <h2>總預算：{budgetTotal}元</h2>
            <h2>淨值：{netTotal}元</h2>
            <h2 className='fw-bold'>預算剩餘：{remainingBudget}元</h2>
    
            <div className="mt-4">
                <select value={selectedChart} onChange={(e) => setSelectedChart(e.target.value)} className="form-select mb-3">
                    <option value="選擇圖表">選擇圖表</option>
                    <option value="收支預算長條圖">收支預算長條圖</option>
                    <option value="收支類別分布">收支類別分布</option>
                    <option value="支出類別趨勢">支出類別趨勢</option>
                </select>
    
                {selectedChart !== '選擇圖表' && (
                    <div className="d-flex align-items-center">
                        <div className="form-check me-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={quickTimeSelectFlagForLine}
                                onChange={() => setQuickTimeSelectFlagForLine(!quickTimeSelectFlagForLine)}
                                id="sync-checkbox"
                            />
                            <label className="form-check-label" htmlFor="sync-checkbox">
                                和查詢範圍同步
                            </label>
                        </div>
                        <select value={selectedChartForLine} onChange={(e) => setSelectedChartForLine(e.target.value)} className="form-select" disabled={quickTimeSelectFlagForLine}>
                            <option value="currentDay">當日</option>
                            <option value="currentWeek">當周</option>
                            <option value="currentMonth">當月</option>
                            <option value="currentYear">當年</option>
                        </select>
                        <DatePicker
                            selected={chartStartDate}
                            onChange={(date) => setChartStartDate(date)}
                            dateFormat="yyyy/MM/dd"
                            className="form-control ms-3"
                        />
                    </div>
                )}
            </div>
    
            <div className="mt-4">
                <TransactionCharts 
                    transaction={quickTimeSelectFlagForLine ? filteredTransactions : allTransactions} 
                    selectedChart={selectedChart} 
                    quickTimeSelectFlagForLine1={quickTimeSelectFlagForLine}
                    selectedChartForLine1={selectedChartForLine}
                />
            </div>
    
            <button onClick={() => handleDownload(token)} className="btn btn-warning mt-4">匯出歷史紀錄</button>
        </div>
    );    
};

export default TransactionPage;
