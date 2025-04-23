import { vi } from './vi';
import { en } from './en';

// Định nghĩa type chuỗi ngôn ngữ có thể hỗ trợ
export type Locale = 'vi' | 'en';

// Dictionary chứa tất cả chuỗi ngôn ngữ
export type TranslationDictionary = {
  [key: string]: string | TranslationDictionary;
};

// Dictionary chứa tất cả chuỗi ngôn ngữ theo từng locale
export const translations: Record<Locale, TranslationDictionary> = {
  vi,
  en,
};

// Hàm lấy giá trị từ key theo dot notation (ví dụ: "auth.login.title")
export function translate(locale: Locale, key: string, params?: Record<string, string>): string {
  const keys = key.split('.');
  let value: unknown = translations[locale];

  // Duyệt qua từng phần của key để truy cập vào giá trị trong nested object
  for (const k of keys) {
    if (typeof value !== 'object' || value === null) {
      return key; // Trả về key nếu không tìm thấy
    }
    value = (value as Record<string, unknown>)[k];
    if (value === undefined) {
      return key; // Trả về key nếu không tìm thấy
    }
  }

  // Nếu giá trị không phải là string, trả về key
  if (typeof value !== 'string') {
    return key;
  }

  // Thay thế các placeholder bằng params
  if (params) {
    return Object.entries(params).reduce((result, [paramKey, paramValue]) => {
      return result.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue);
    }, value);
  }

  return value;
}
