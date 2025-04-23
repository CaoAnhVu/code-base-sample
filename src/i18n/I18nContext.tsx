import { createContext } from 'react';
import { Locale } from './i18nUtils';

// Định nghĩa type cung cấp các function và state để thay đổi ngôn ngữ
export interface I18nContextType {
  t: (key: string, params?: Record<string, string>) => string;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  locales: Locale[];
}

// Tạo Context cho i18n
const I18nContext = createContext<I18nContextType>({
  t: (key: string) => key,
  locale: 'vi',
  setLocale: () => {},
  locales: ['vi', 'en'],
});

export default I18nContext;
