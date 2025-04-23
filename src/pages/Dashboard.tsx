import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../features/auth/slice';
import Button from '../components/Button/Button';
import { useI18n } from '../i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { t } = useI18n();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto animate-fadeIn">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{t('dashboard.title')}</h1>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher showLabel={false} />
              <Button variant="outline" onClick={handleLogout}>
                {t('dashboard.logout')}
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <h2 className="text-lg font-medium text-blue-700 mb-2">{t('dashboard.welcome')}</h2>
            <p className="text-blue-600">
              {t('dashboard.loggedInAs')} <span className="font-semibold">{user?.username}</span>
            </p>
          </div>

          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="text-lg font-medium mb-3">{t('dashboard.profile.title')}</h3>
            {user ? (
              <div className="space-y-2">
                <p>
                  <span className="font-medium">{t('dashboard.profile.username')}:</span> {user.username}
                </p>
                <p>
                  <span className="font-medium">{t('dashboard.profile.name')}:</span> {user.firstName} {user.lastName}
                </p>
                <p>
                  <span className="font-medium">{t('dashboard.profile.email')}:</span> {user.email}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">{t('dashboard.profile.noInfo')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
