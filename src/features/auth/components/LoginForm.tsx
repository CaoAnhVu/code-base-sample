import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../types';
import Button from '../../../components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../store';
import { login, resetAuthState } from '../slice';
import { motion } from 'framer-motion';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  React.useEffect(() => {
    // Reset auth state when component unmounts
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  const onSubmit = async (data: LoginCredentials) => {
    setIsSubmitted(true);
    console.log('Đang đăng nhập với:', data);
    await dispatch(login(data));
  };

  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100 w-full">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-center text-white mb-1">Login</h2>
        <p className="text-blue-100 text-center text-sm">Access your dashboard</p>
      </div>

      <div className="p-8">
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
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
                {isSubmitted && error.includes('400') && <p className="text-xs mt-1">Vui lòng đảm bảo bạn đang sử dụng thông tin đăng nhập chính xác.</p>}
              </div>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
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
                placeholder="Enter your username"
                className={`pl-10 block w-full rounded-md shadow-sm border ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                } bg-white text-gray-900 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                {...register('username', {
                  required: 'Username is required',
                })}
              />
            </div>
            {errors.username && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-red-600">
                {errors.username.message}
              </motion.p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className={`pl-10 block w-full rounded-md shadow-sm border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } bg-white text-gray-900 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
            </div>
            {errors.password && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </motion.p>
            )}
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            className="py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-md shadow-sm"
          >
            Sign in
          </Button>

          <div className="mt-8">
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-blue-800 mb-2">DummyJSON API Authentication</h4>
              <p className="text-sm text-blue-700 mb-3">Sử dụng tài khoản sau để đăng nhập qua API:</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white p-2 rounded border border-blue-100">
                  <span className="block text-xs text-gray-500 mb-1">Username</span>
                  <span className="font-mono text-blue-800">emilys</span>
                </div>
                <div className="bg-white p-2 rounded border border-blue-100">
                  <span className="block text-xs text-gray-500 mb-1">Password</span>
                  <span className="font-mono text-blue-800">emilyspass</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
