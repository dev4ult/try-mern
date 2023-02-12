import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goal/goalSlice';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    auth: authReducer,
    goal: goalReducer,
  },
});
