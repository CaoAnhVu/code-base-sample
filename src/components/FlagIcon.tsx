import React from 'react';
import { Locale } from '../i18n/i18nUtils';
import viFlag from '../assets/images/flags/vi-flag.svg';
import enFlag from '../assets/images/flags/en-flag.svg';

interface FlagIconProps {
  locale: Locale;
  className?: string;
  width?: number;
  height?: number;
}

// Define flags mapping here
const flags: Record<Locale, string> = {
  vi: viFlag,
  en: enFlag,
};

const FlagIcon: React.FC<FlagIconProps> = ({ locale, className = '', width = 24, height = 16 }) => {
  return <img src={flags[locale]} alt={`${locale} flag`} className={`inline-block object-cover ${className}`} width={width} height={height} />;
};

export default FlagIcon;
