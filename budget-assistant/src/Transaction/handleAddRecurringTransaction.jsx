import { format, addDays, addWeeks, addMonths, addYears } from 'date-fns';
import { handleTransactionAdd } from './handleTransactionAdd';

export const handleAddRecurringTransaction = async (e, startDate, amount, description, type, kind, file, setFormData, transactions, setTransactions, endDate, token, recurringFrequency) => {
    e.preventDefault();
    
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
        await handleTransactionAdd(e, currentDate, amount, description, type, kind, file, setFormData, transactions, setTransactions, token);
        if(recurringFrequency === 'daily') {
            currentDate = addDays(currentDate, 1);
        }
        else if (recurringFrequency === 'weekly') {
            currentDate = addWeeks(currentDate, 1);
        } 
        else if (recurringFrequency === 'monthly') {
            currentDate = addMonths(currentDate, 1);
        } else if (recurringFrequency === 'yearly') {
            currentDate = addYears(currentDate, 1);
        }
    }
    alert('重複性交易新增完成');
};
