import axiosInstance from '../../services/axios';
import { LoginCredentials, LoginResponse } from './types';

// Wrapper around the actual auth API calls
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  // You could add other API calls here like register, verifyEmail, forgotPassword, etc.
};
