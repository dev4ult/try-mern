import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccesfull: false,
  isLoading: false,
  message: '',
};

const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {}
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccesfull = false;
      isLoading = false;
      message = '';
    },
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
