import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../i18n';
import { Locale } from '../i18n';
import FlagIcon from './FlagIcon';

interface LanguageSwitcherProps {
  showLabel?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ showLabel = false }) => {
  const { locale, setLocale, locales, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Xử lý click bên ngoài dropdown để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (selectedLocale: Locale) => {
    setLocale(selectedLocale);
    setIsOpen(false);
  };

  // Mở/đóng dropdown khi click vào button
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center">
      {showLabel && <label className="mr-2 text-sm font-medium text-gray-700">{t('languageSwitcher.title', {}) || 'Ngôn ngữ'}:</label>}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex items-center justify-between w-full px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <div className="flex items-center">
            <FlagIcon locale={locale} className="mr-2" />
            <span>{locale === 'vi' ? 'Tiếng Việt' : 'English'}</span>
          </div>
          <svg className={`h-4 w-4 ml-2 transform ${isOpen ? 'rotate-180' : ''} transition-transform duration-200`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute right-0 mt-1 w-full rounded-md shadow-lg bg-white z-10 border border-gray-200">
            <div className="py-1">
              {locales.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full flex items-center px-3 py-2 text-sm text-left hover:bg-indigo-50 ${locale === lang ? 'bg-indigo-100 font-medium' : ''}`}
                >
                  <FlagIcon locale={lang} className="mr-2" />
                  <span>{lang === 'vi' ? 'Tiếng Việt' : 'English'}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
