// Date utility functions

export const getFirstDayOfWeek = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
};

export const getLastDayOfWeek = (date) => {
  if (!date) return null;
  const firstDay = getFirstDayOfWeek(date);
  if (!firstDay) return null;
  const lastDay = new Date(firstDay);
  lastDay.setDate(firstDay.getDate() + 6); // Add 6 days to get to Sunday
  return lastDay;
};

export const getFirstDayOfMonth = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), 1);
};

export const getLastDayOfMonth = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0); // Setting day to 0 gets the last day of previous month
};

export const getFirstDayOfYear = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return new Date(d.getFullYear(), 0, 1);
};

export const getLastDayOfYear = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return new Date(d.getFullYear(), 11, 31); // December 31st
}; 

// Chart data processing functions
export const processTransactionsByType = (transactions, type) => {
  if (!transactions) return {};
  return transactions.reduce((acc, transaction) => {
    if (transaction.type === type) {
      const amount = Math.abs(transaction.amount);
      acc[transaction.kind] = (acc[transaction.kind] || 0) + amount;
    }
    return acc;
  }, {});
};

export const createPieData = (data) => {
  if (!data) return [];
  return Object.entries(data)
    .map(([kind, amount]) => ({
      name: kind || '其他',
      value: amount
    }))
    .filter(item => item.value > 0);
};


export const createBarData = (transactions) => {
  if (!transactions) return [];
  return Object.values(transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const key = "A";

    if (!acc[key]) {
      acc[key] = { date, income: 0, expense: 0, budget: 0 };
    }

    
      const amount = Math.abs(transaction.amount);
      if (transaction.type === 'income') acc[key].income += amount;
      else if (transaction.type === 'expense') acc[key].expense += amount;
      else if (transaction.type === 'budget') acc[key].budget += amount;
    

    return acc;
  }, {}));
};

export const getTimePeriodKey = (date, timeRange,quickTimeSelectFlagForLine,selectedChartForLine) => {
  if (!date || !timeRange) return '';
  const d = new Date(date);
  const startDate = new Date(d.getFullYear(), 0, 1);//20XX/01/01
  const days = Math.floor((d - startDate) / (24 * 60 * 60 * 1000));//dayOfTheYear

  const dayOfJanuaryFirstInFirstWeek = new Date(startDate).getDay();
  const needToMinus = (dayOfJanuaryFirstInFirstWeek === 0) ? 7 : dayOfJanuaryFirstInFirstWeek;

  const week = Math.ceil(((days) - needToMinus) / 7) + 1;//weekOfTheYear
  const day = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const numbers = ["日", "一", "二", "三", "四", "五", "六"];
  if(quickTimeSelectFlagForLine){
      switch (timeRange) {
        case 'day':
          return `${d.getFullYear()}年${day}日`;
        case 'week':
          return `${d.getFullYear()}年${week}週`;
        case 'month':
          return `${d.getFullYear()}年${d.getMonth() + 1}月`;
        case 'year':
          return `${d.getFullYear()}年`;
        default:
          return '';
      }
}else{
  switch (selectedChartForLine) {
    case 'currentDay':
      return `${d.getFullYear()}年${day}日`;
    case 'currentWeek':
      //return `星期${(d.getDay() === 0) ? '日' : d.getDay()}`;
      return `星期${numbers[d.getDay()]}`;
    case 'currentMonth':
      return `第${week}週`;
    case 'currentYear':
      return `${d.getMonth() + 1}月`;
    default:
      return '';
  }
}
};

export const createLineChartData = (transactions, timeRange, selectedKind, allKinds,quickTimeSelectFlagForLine,selectedChartForLine) => {
  if (!transactions || !timeRange || !selectedKind || !allKinds) return [];
  return Object.values(transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      const timePeriodKey = getTimePeriodKey(transaction.date, timeRange,quickTimeSelectFlagForLine,selectedChartForLine);
      const kind = transaction.kind || '其他';
      
      if (selectedKind === '全部' || kind === selectedKind) {
        if (!acc[timePeriodKey]) {
          acc[timePeriodKey] = {
            timePeriod: timePeriodKey,
            ...(selectedKind === '全部' ? Object.fromEntries(allKinds.map(k => [k, 0])) : {})
          };
        }
        acc[timePeriodKey][kind] = (acc[timePeriodKey][kind] || 0) + Math.abs(transaction.amount);
      }
    }
    return acc;
  }, {}));
};