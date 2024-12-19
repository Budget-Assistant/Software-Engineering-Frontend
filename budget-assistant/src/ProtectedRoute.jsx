import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // 如果沒有 token，重定向到登入頁面
    return <Navigate to="/login" />;
  }

  // 如果有 token，允許訪問子組件
  return children;
};

export default ProtectedRoute;