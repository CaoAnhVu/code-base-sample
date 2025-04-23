import React from 'react';
import { useI18n } from '../i18n';
import { Locale } from '../i18n';

interface LanguageSwitcherProps {
  showLabel?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ showLabel = false }) => {
  const { locale, setLocale, locales, t } = useI18n();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as Locale);
  };

  return (
    <div className="flex items-center">
      {showLabel && (
        <label htmlFor="language-select" className="mr-2 text-sm font-medium text-gray-700">
          {t('languageSwitcher.title', {}) || 'Ngôn ngữ'}:
        </label>
      )}
      <div className="relative">
        <select
          id="language-select"
          value={locale}
          onChange={handleLanguageChange}
          className="appearance-none bg-white border border-gray-300 rounded-md py-1.5 pl-3 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {locales.map((lang) => (
            <option key={lang} value={lang}>
              {lang === 'vi' ? 'Tiếng Việt' : 'English'}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
