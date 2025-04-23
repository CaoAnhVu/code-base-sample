import axios from 'axios';

// Log tất cả request/response để debug
const logRequests = true;

const baseURL = 'https://dummyjson.com';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Cache-Control'] = 'no-cache, no-store, must-revalidate';
axios.defaults.headers.common['Pragma'] = 'no-cache';
axios.defaults.headers.common['Expires'] = '0';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  },
  timeout: 10000, // Giảm timeout xuống 10 giây để nếu có vấn đề thì không cần đợi quá lâu
});

// Thêm interceptor cho request để log
axiosInstance.interceptors.request.use(
  (config) => {
    if (logRequests) {
      console.log('%cAPI Request', 'color: blue; font-weight: bold;', {
        url: config.url,
        method: config.method,
        data: config.data,
        headers: config.headers,
      });
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    //  không sử dụng cache cho tất cả các request
    const url = config.url || '';
    const hasParams = url.includes('?');
    const timestamp = new Date().getTime();

    config.url = url + (hasParams ? '&' : '?') + '_t=' + timestamp;
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Thêm interceptor cho response để log
axiosInstance.interceptors.response.use(
  (response) => {
    if (logRequests) {
      console.log('%cAPI Response', 'color: green; font-weight: bold;', {
        status: response.status,
        statusText: response.statusText,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    console.error(
      '%cAPI Error',
      'color: red; font-weight: bold;',
      error.response
        ? {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data,
            url: error.config?.url,
          }
        : error.message
    );

    if (error.response) {
      // Handle specific HTTP status codes
      if (error.response.status === 401) {
        // Handle unauthorized access - maybe redirect to login
        localStorage.removeItem('token');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

// Export hàm gọi trực tiếp DummyJSON API
export const loginDummyJSON = async (username: string, password: string, timestamp?: number) => {
  try {
    console.log('Gọi trực tiếp API DummyJSON với:', { username, password });

    const response = await axios({
      method: 'POST',
      url: `${baseURL}/auth/login${timestamp ? `?_t=${timestamp}` : ''}`,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store',
        Pragma: 'no-cache',
      },
      data: JSON.stringify({
        username,
        password,
      }),
    });

    console.log('Kết quả API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi trực tiếp API:', error);
    throw error;
  }
};
