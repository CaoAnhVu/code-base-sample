import { useState, useEffect } from 'react';

/**
 * Custom hook để lưu trữ và đồng bộ state với localStorage
 * @param key Khóa lưu trữ trong localStorage
 * @param initialValue Giá trị ban đầu nếu không có dữ liệu trong localStorage
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Hàm này chỉ chạy một lần khi component mount
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Lỗi khi đọc từ localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // State để lưu giá trị hiện tại
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Hàm cập nhật cả state và localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Cho phép sử dụng hàm callback như setState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Lưu vào state
      setStoredValue(valueToStore);

      // Lưu vào localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        // Phát sự kiện storage để các component khác cũng cập nhật
        window.dispatchEvent(new Event('local-storage'));
      }
    } catch (error) {
      console.warn(`Lỗi khi lưu vào localStorage key "${key}":`, error);
    }
  };

  // Lắng nghe các thay đổi trên các tab khác
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };

    // Lắng nghe sự kiện storage
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, []);

  return [storedValue, setValue];
}
