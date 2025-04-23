import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import { login, resetAuthState } from '../features/auth/slice';
import { useForm } from 'react-hook-form';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from '../hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';

interface LoginCredentials {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading: loading, error, isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rememberMe, setRememberMe] = useLocalStorage('rememberMe', false);
  const [savedUsername, setSavedUsername] = useLocalStorage('savedUsername', '');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const toast = useToast();
  const { t } = useI18n();

  // Kiểm tra ngôn ngữ hiện tại
  const isEnglish = t('languageSwitcher.locale') === 'en';

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<LoginCredentials>({
    defaultValues: {
      username: savedUsername || '',
      password: '',
    },
    mode: 'onChange',
  });

  // Điền username đã lưu (nếu có)
  useEffect(() => {
    console.log('LoginForm mounted');
    if (savedUsername) {
      setValue('username', savedUsername);
    }
  }, [savedUsername, setValue]);

  // Hiển thị thông báo khi đăng nhập thành công và chuyển hướng
  useEffect(() => {
    console.log('LoginForm auth state changed - isAuthenticated:', isAuthenticated, 'user:', user);
    if (isAuthenticated && user) {
      // Chỉ hiển thị 1 thông báo thành công
      toast.success(t('auth.login.success', { name: user.firstName || user.username }));
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate, toast, t]);

  // Reset auth state khi unmount
  useEffect(() => {
    return () => {
      console.log('LoginForm unmounting - resetting auth state');
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  // Hiển thị thông báo lỗi
  useEffect(() => {
    console.log('LoginForm error state changed - error:', error, 'isSubmitted:', isSubmitted);
    if (error && isSubmitted) {
      toast.error(error);
    }
  }, [error, isSubmitted, toast]);

  // Theo dõi thay đổi mật khẩu để đánh giá độ mạnh
  const password = watch('password');

  // Cập nhật độ mạnh mật khẩu khi mật khẩu thay đổi
  useEffect(() => {
    // Kiểm tra trường hợp tài khoản test
    if (watch('username') === 'emilys' && password === 'emilyspass') {
      setPasswordStrength(5); // Mạnh nhất cho tài khoản test
      return;
    }

    // Tính toán độ mạnh mật khẩu
    const calculateStrength = (pass: string): number => {
      if (!pass) return 0;

      let score = 0;
      // Độ dài
      if (pass.length >= 6) score += 1;
      if (pass.length >= 10) score += 1;

      // Độ phức tạp
      if (/[A-Z]/.test(pass)) score += 1;
      if (/[0-9]/.test(pass)) score += 1;
      if (/[^A-Za-z0-9]/.test(pass)) score += 1;

      return Math.min(score, 5);
    };

    setPasswordStrength(calculateStrength(password || ''));
  }, [password, watch]);

  const onSubmit = async (data: LoginCredentials) => {
    setIsSubmitted(true);

    // Lưu username nếu chọn "Ghi nhớ đăng nhập"
    if (rememberMe) {
      setSavedUsername(data.username);
    } else if (!rememberMe && savedUsername) {
      // Xóa username đã lưu nếu không chọn "Ghi nhớ đăng nhập"
      setSavedUsername('');
    }

    try {
      await dispatch(login(data)).unwrap();
      // Không cần xử lý thành công ở đây vì đã xử lý trong useEffect
    } catch {
      // Lỗi đã được xử lý trong useEffect
    }
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleQuickLogin = () => {
    setValue('username', 'emilys');
    setValue('password', 'emilyspass');
    // Tự động submit form sau khi điền thông tin
    setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 100);
  };

  // Chức năng hiển thị/ẩn mật khẩu
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100 p-6">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 -mx-6 -mt-6 px-6 py-4 mb-6">
        <h2 className="text-2xl font-bold text-white">{t('auth.login.title')}</h2>
        <p className="text-blue-100 text-sm">{t('auth.login.subtitle')}</p>
      </div>

      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <div className="flex items-center mb-2">
          <svg className="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-blue-800">{t('auth.login.testAccount')}:</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm mb-2">
          <div className="bg-white p-2 rounded border border-blue-100">
            <span className="block text-xs text-gray-500 mb-1">{t('auth.login.username')}</span>
            <span className="font-mono text-blue-800">emilys</span>
          </div>
          <div className="bg-white p-2 rounded border border-blue-100">
            <span className="block text-xs text-gray-500 mb-1">{t('auth.login.password')}</span>
            <span className="font-mono text-blue-800">emilyspass</span>
          </div>
        </div>
        <button type="button" onClick={handleQuickLogin} className="w-full py-1.5 text-sm text-blue-700 bg-blue-100 hover:bg-blue-200 rounded transition-colors" disabled={loading}>
          {t('auth.login.quickLogin')}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 animate-fadeIn">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            {t('auth.login.username')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </div>
            <input
              id="username"
              type="text"
              placeholder={t('auth.login.username')}
              className={`pl-10 block w-full rounded-md shadow-sm border ${
                errors.username ? 'border-red-500' : dirtyFields.username ? 'border-green-500' : 'border-gray-300'
              } bg-white text-gray-900 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              {...register('username', {
                required: t('auth.validation.required', { field: t('auth.login.username') }),
                minLength: {
                  value: 3,
                  message: t('auth.validation.minLength', { field: t('auth.login.username'), length: '3' }),
                },
                maxLength: {
                  value: 20,
                  message: t('auth.validation.maxLength', { field: t('auth.login.username'), length: '20' }),
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+$/,
                  message: t('auth.validation.pattern', { field: t('auth.login.username') }) || 'Tên đăng nhập chỉ được chứa chữ cái, số và các ký tự . _ -',
                },
              })}
              disabled={loading}
            />
          </div>
          {errors.username && <p className="mt-2 text-sm text-red-600 animate-fadeIn">{errors.username.message}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            {t('auth.login.password')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="password"
              type={passwordVisible ? 'text' : 'password'}
              placeholder={t('auth.login.password')}
              className={`pl-10 block w-full rounded-md shadow-sm border ${
                errors.password ? 'border-red-500' : dirtyFields.password ? 'border-green-500' : 'border-gray-300'
              } bg-white text-gray-900 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              {...register('password', {
                required: t('auth.validation.required', { field: t('auth.login.password') }),
                minLength: {
                  value: 6,
                  message: t('auth.validation.minLength', { field: t('auth.login.password'), length: '6' }),
                },
                maxLength: {
                  value: 50,
                  message: t('auth.validation.maxLength', { field: t('auth.login.password'), length: '50' }),
                },
                validate: {
                  // Kiểm tra tài khoản test - bỏ qua validate
                  isTestAccount: (value, formValues) => {
                    if (formValues.username === 'emilys' && value === 'emilyspass') {
                      return true;
                    }

                    // Nếu không phải tài khoản test, thực hiện các validate thông thường
                    if (!/[A-Z]/.test(value)) {
                      return t('auth.validation.hasUpperCase', { field: t('auth.login.password') }) || 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa';
                    }

                    if (!/[0-9]/.test(value)) {
                      return t('auth.validation.hasNumber', { field: t('auth.login.password') }) || 'Mật khẩu phải chứa ít nhất một chữ số';
                    }

                    return true;
                  },
                },
              })}
              disabled={loading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label={passwordVisible ? t('auth.login.hidePassword') || 'Ẩn mật khẩu' : t('auth.login.showPassword') || 'Hiện mật khẩu'}
            >
              <svg className="h-5 w-5 text-gray-400 hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {passwordVisible ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                )}
                {!passwordVisible && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                )}
              </svg>
            </button>
          </div>
          {errors.password && <p className="mt-2 text-sm text-red-600 animate-fadeIn">{errors.password.message}</p>}

          {/* Hiển thị mức độ mạnh của mật khẩu */}
          {password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">{t('auth.login.passwordStrength')}:</span>
                <span className="text-xs font-medium">
                  {passwordStrength < 2 && t('auth.login.passwordWeak')}
                  {passwordStrength >= 2 && passwordStrength < 4 && t('auth.login.passwordMedium')}
                  {passwordStrength >= 4 && t('auth.login.passwordStrong')}
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${passwordStrength < 2 ? 'bg-red-500' : passwordStrength < 4 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
              {t('auth.login.remember')}
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              {t('auth.login.forgot')}
            </a>
          </div>
        </div>

        {/* Nút đăng nhập */}
        <button
          type="submit"
          className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? (isEnglish ? 'Signing in...' : 'Đang đăng nhập...') : isEnglish ? 'Sign In' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
