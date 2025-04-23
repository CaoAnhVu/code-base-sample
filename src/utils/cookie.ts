/**
 * Set a cookie with a given name, value, and options.
 */
export const setCookie = (name: string, value: string, options: { days?: number; path?: string; secure?: boolean; sameSite?: 'strict' | 'lax' | 'none' } = {}) => {
  const { days = 7, path = '/', secure = false, sameSite = 'lax' } = options;

  const expires = new Date(Date.now() + days * 864e5).toUTCString();

  document.cookie = [`${name}=${encodeURIComponent(value)}`, `expires=${expires}`, `path=${path}`, secure ? 'secure' : '', `SameSite=${sameSite}`].filter(Boolean).join('; ');
};

/**
 * Get a cookie value by name.
 * @returns cookie value or null if not found
 */
export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(';').shift() || '');
  }

  return null;
};

/**
 * Delete a cookie by setting its expiration date to the past.
 */
export const deleteCookie = (name: string, path = '/') => {
  setCookie(name, '', { days: -1, path });
};

/**
 * Check if cookies are enabled in the browser.
 */
export const areCookiesEnabled = (): boolean => {
  try {
    document.cookie = 'cookietest=1';
    const result = document.cookie.indexOf('cookietest=') !== -1;
    document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    return result;
  } catch {
    return false;
  }
};
