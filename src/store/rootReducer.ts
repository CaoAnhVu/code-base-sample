import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add more reducers here as your app grows
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
