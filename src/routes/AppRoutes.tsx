import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import { useAppSelector } from '../store';

const AppRoutes: React.FC = () => {
  // Cập nhật console để debug
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    console.log('Current route:', location.pathname);
    console.log('User authentication state:', isAuthenticated ? 'authenticated' : 'not authenticated');
  }, [location, isAuthenticated]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes - sử dụng component trực tiếp để giảm phức tạp */}
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <LoginPage />} />

      {/* Index route - chuyển hướng dựa vào trạng thái xác thực */}
      <Route path="/" element={isAuthenticated ? <Dashboard /> : <LoginPage />} />

      {/* Catch all route - 404 */}
      <Route
        path="*"
        element={
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Không tìm thấy trang</h1>
            <p className="mb-4">Đường dẫn không hợp lệ: {location.pathname}</p>
            <button onClick={() => (window.location.href = '/')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Quay về trang chủ
            </button>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
