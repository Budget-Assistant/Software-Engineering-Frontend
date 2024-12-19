import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line,
  Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import {
  processTransactionsByType,
  createPieData,
  createLineChartData,
  createBarData
} from './handleTransactionChart';

// Chart colors
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
  '#82CA9D', '#FFC658', '#FF6B6B', '#4ECDC4', '#45B7D1',
  '#96CDEF', '#ADDCB6', '#FFE0B2', '#FFCCBC', '#E1BEE7'
];

const TransactionCharts = ({ transaction  , selectedChart, quickTimeSelectFlagForLine1,selectedChartForLine1}) => {
  // Bar chart state
  const [selectedYearOfBar, setSelectedYearOfBar] = useState(2024);
  const [selectedMonthOfBar, setSelectedMonthOfBar] = useState(9);

  // Line chart state
  const [timeRange, setTimeRange] = useState('week');
  const [selectedKind, setSelectedKind] = useState('全部');  
  const [transactions, setTransactions] = useState(transaction);

useEffect(() => {
  setTransactions(transaction);
}, [transaction]);

  if (!transactions || transactions.length === 0) {
    return (
      <div className="w-full p-4 text-center text-gray-500">
        No transaction data available for the selected period.
      </div>
    );
  }
  const IncomeKindTotals = processTransactionsByType(transactions, 'income');
  const ExpenseKindTotals = processTransactionsByType(transactions, 'expense');
  const IncomePieData = createPieData (IncomeKindTotals);
  const ExpensePieData = createPieData(ExpenseKindTotals);
  const barData = createBarData(transactions);
  const allKinds = [...new Set(transactions
    .filter(t => t.type === 'expense')
    .map(t => t.kind || '其他'))];

  const lineChartData = createLineChartData(transactions, timeRange, selectedKind, allKinds,quickTimeSelectFlagForLine1,selectedChartForLine1);
  return (
    <div className="w-full space-y-8">
      {selectedChart === '收支預算長條圖' && barData.length > 0 && (
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center mb-4">
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={selectedKind} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" name="收入" fill="#4CAF50" />
              <Bar dataKey="expense" name="支出" fill="#FF5252" />
              <Bar dataKey="budget" name="預算" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

{selectedChart === '收支類別分布' && (
  <div style={{ width: '100%' }}>
    
    {/* 左側收入圓餅圖 */}
    <div style={{ width: '48%', display: 'inline-block', marginRight: '2%'  }} className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">收入類別分布</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={IncomePieData}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {IncomePieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* 右側支出圓餅圖 */}
    <div style={{ width: '48%', display: 'inline-block', marginRight: '2%' }}  className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">支出類別分布</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={ExpensePieData}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {ExpensePieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
)}
      
      {selectedChart === '支出類別趨勢' && (
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="mb-4">
            
          </div>
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-semibold flex-grow">支出類別趨勢</h3>
              <select
                value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="p-2 border rounded ml-2"
              disabled={!quickTimeSelectFlagForLine1}
            > <option value="day">日</option>
              <option value="week">週</option>
              <option value="month">月</option>
              <option value="year">年</option>
            </select>
            <select
              value={selectedKind}
              onChange={(e) => setSelectedKind(e.target.value)}
              className="p-2 border rounded ml-2"
            >
              <option value="全部">全部</option>
              {allKinds.map(kind => (
                <option key={kind} value={kind}>{kind}</option>
                ))}
              </select>
              
          </div>
          <ResponsiveContainer width="100%" height={300}>
            
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timePeriod" />
              <YAxis />
              <Tooltip />
              <Legend />
              {allKinds.map((kind, index) => (
                <Line
                  key={kind}
                  type="linear"
                  dataKey={kind}
                  stroke={COLORS[index % COLORS.length]}
                  name={kind}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default TransactionCharts;
