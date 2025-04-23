import React, { useState, ReactNode } from 'react';
import I18nContext from './I18nContext';
import { Locale, translate } from './i18nUtils';

// Provider component props
interface I18nProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children, defaultLocale = 'vi' }) => {
  // State lưu locale hiện tại
  const [locale, setLocale] = useState<Locale>(() => {
    // Đọc locale từ localStorage nếu có, nếu không sử dụng defaultLocale
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as Locale;
      if (savedLocale && (savedLocale === 'vi' || savedLocale === 'en')) {
        return savedLocale;
      }
    }
    return defaultLocale;
  });

  // Danh sách locale có thể chọn
  const locales: Locale[] = ['vi', 'en'];

  // Hàm thay đổi locale và lưu vào localStorage
  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
  };

  // Hàm translate được bind với locale hiện tại
  const t = (key: string, params?: Record<string, string>) => {
    return translate(locale, key, params);
  };

  return <I18nContext.Provider value={{ t, locale, setLocale: changeLocale, locales }}>{children}</I18nContext.Provider>;
};
