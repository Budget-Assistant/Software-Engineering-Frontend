import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Page/Login';
import Signup from './Page/Signup';
import TransactionPage from './Page/TransactionPage';
import ProtectedRoute from './ProtectedRoute';
import ForgotPassword from './Page/ForgotPassword';
import RecurringTransactionPage from './Page/RecurringTransactionPage';
import EditTransactionPage from './Page/EditTransactionPage';
import Setting from './Page/Setting';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/add-recurring-transaction" element={<RecurringTransactionPage />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/edit-transaction/:id" element={<EditTransactionPage />} />
          
          <Route
            path="/add-transaction"
            element={
              <ProtectedRoute>
                <TransactionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;