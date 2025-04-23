import axiosInstance, { loginDummyJSON } from './axios';
import { LoginCredentials, LoginResponse, User } from '../features/auth/types';

const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      console.log('Đang đăng nhập với tài khoản:', credentials.username);

      // Thêm timestamp để tránh cache và lỗi 304
      const timestamp = new Date().getTime();

      if (credentials.username === 'emilys') {
        // Điều chỉnh tham số để tránh lỗi 304
        const response = await loginDummyJSON(credentials.username, credentials.password, timestamp);
        if (response && response.token) {
          localStorage.setItem('token', response.token);

          // Lưu thời gian đăng nhập
          localStorage.setItem('login_timestamp', timestamp.toString());
        }
        return response;
      }

      // Sử dụng axiosInstance cho các tài khoản khác, với tham số chống cache
      const response = await axiosInstance.post<LoginResponse>('/auth/login', {
        username: credentials.username,
        password: credentials.password,
        _t: timestamp, // Thêm timestamp để tránh cache
      });

      // Lưu token vào localStorage nếu có
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('login_timestamp', timestamp.toString());
      }

      return response.data;
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      throw error; // Ném lỗi để Redux slice xử lý
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('login_timestamp');

    // Đảm bảo đăng xuất sẽ xóa mọi thông tin người dùng
    window.sessionStorage.clear();

    // Làm mới trình duyệt để đảm bảo xóa hết cache
    window.location.href = window.location.origin;
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Trong ứng dụng thực tế, có thể decode JWT hoặc thực hiện API call
        // để lấy thông tin người dùng hiện tại từ backend

        // Trả về thông tin mẫu về người dùng đã xác thực
        const mockUser: User = {
          id: 1,
          username: 'emilys',
          email: 'emily@example.com',
          firstName: 'Emily',
          lastName: 'Smith',
          gender: 'female',
          image: 'https://robohash.org/hicveldicta.png',
          token: token,
        };

        return mockUser;
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng hiện tại:', error);
        return null;
      }
    }
    return null;
  },

  // Kiểm tra xem phiên đăng nhập có hiệu lực không
  isSessionValid: () => {
    const token = localStorage.getItem('token');
    const loginTimestamp = localStorage.getItem('login_timestamp');

    if (!token || !loginTimestamp) {
      return false;
    }

    // Kiểm tra thời gian sống của token (ví dụ: 24 giờ)
    const tokenDate = parseInt(loginTimestamp, 10);
    const now = new Date().getTime();
    const tokenLifetime = 24 * 60 * 60 * 1000; // 24 giờ

    return now - tokenDate < tokenLifetime;
  },
};

export default authService;
