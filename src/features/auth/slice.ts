import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginCredentials, User } from './types';
import authService from '../../services/authService';

// Check for initial auth state from localStorage
const savedUser = authService.getCurrentUser();
const isSessionValid = authService.isSessionValid();

const initialState: AuthState = {
  user: savedUser,
  isAuthenticated: !!savedUser && isSessionValid,
  isLoading: false,
  error: null,
};

console.log('Initial auth state:', initialState);

export const login = createAsyncThunk('auth/login', async (credentials: LoginCredentials, { rejectWithValue }) => {
  try {
    // Xử lý đặc biệt cho tài khoản DummyJSON
    if (credentials.username === 'emilys' && credentials.password !== 'emilyspass') {
      return rejectWithValue('Sai mật khẩu cho tài khoản DummyJSON. Vui lòng sử dụng "emilyspass"');
    }

    const response = await authService.login(credentials);
    return response;
  } catch (error: unknown) {
    // Xử lý lỗi từ API
    if (error && typeof error === 'object' && 'response' in error) {
      const response = (error as { response?: { status: number; data?: { message?: string } } }).response;
      if (response) {
        const status = response.status;
        const message = response.data?.message || 'Đăng nhập thất bại';

        if (status === 400) {
          return rejectWithValue(`Thông tin đăng nhập không hợp lệ: ${message}`);
        } else if (status === 401) {
          return rejectWithValue('Sai tên đăng nhập hoặc mật khẩu');
        } else if (status === 429) {
          return rejectWithValue('Quá nhiều yêu cầu. Vui lòng thử lại sau');
        } else {
          return rejectWithValue(`Lỗi máy chủ (${status}): ${message}`);
        }
      }
    }

    // For other types of errors
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = (action.payload as string) || 'Đăng nhập thất bại. Vui lòng thử lại.';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
