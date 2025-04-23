import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './rootReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authService from '../services/authService';

// Check for initial auth state from localStorage
const preloadedState: Partial<RootState> = {
  auth: {
    user: authService.getCurrentUser(),
    isAuthenticated: authService.isSessionValid(),
    isLoading: false,
    error: null,
  },
};

// Add a timestamp to prevent 304 responses
const timestamp = new Date().getTime();
const cacheBuster = `?_t=${timestamp}`;

console.log('Initializing Redux store with preloaded state:', preloadedState);

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState as unknown as RootState,
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Silence warnings about non-serializable objects (like timestamps, regexes, etc.)
        ignoredActions: ['payload'],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['items.dates'],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Add a clear store function for debugging/troubleshooting
export const clearStore = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = `/${cacheBuster}`;
};

export default store;
