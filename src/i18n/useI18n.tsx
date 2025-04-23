import { useContext } from 'react';
import I18nContext from './I18nContext';

/**
 * Hook để sử dụng i18n trong components
 */
const useI18n = () => useContext(I18nContext);

export default useI18n;
