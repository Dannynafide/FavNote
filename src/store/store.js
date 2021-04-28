import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'features/root/rootSlice';
import authReducers from 'features/auth/authSlice';

export default configureStore({
  reducer: {
    root: rootReducer,
    auth: authReducers,
  },
});
