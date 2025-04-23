import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store';
import LoginForm from '../components/LoginForm';
import { useI18n } from '../i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';

const LoginPage: React.FC = () => {
  console.log('Rendering LoginPage');
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { t } = useI18n();

  // Redirect if already authenticated
  useEffect(() => {
    console.log('LoginPage useEffect - isAuthenticated:', isAuthenticated);
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header với Language Switcher ở góc phải trên cùng */}
      <div className="fixed top-4 right-4 z-10">
        <LanguageSwitcher showLabel={true} />
      </div>

      {/* Main content - căn giữa hoàn toàn */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-4">
          {/* Login content - 2 columns on desktop, 1 column on mobile */}
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            {/* Welcome message */}
            <div className="hidden lg:block">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{t('auth.login.welcomeBack')}</h1>
              <p className="text-lg text-gray-600 mb-6">{t('auth.login.welcomeMessage')}</p>
            </div>

            {/* Login form */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <LoginForm />
              <div className="text-center mt-4 mb-6">
                <p className="text-sm text-gray-600">
                  {t('auth.login.noAccount')}{' '}
                  <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
                    {t('auth.login.signup')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
