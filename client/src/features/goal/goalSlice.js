import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import goalService from './goalService';

const initialState = {
  goals: [],
  isSuccesfull: false,
  isError: false,
  isLoading: false,
  message: '',
};

const everyoneGoals = createAsyncThunk('goal/everyoneGoals', async (temp, thunkApi) => {
  try {
    return await goalService.everyoneGoals();
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

    return thunkApi.rejectWithValue(message);
  }
});

const myGoals = createAsyncThunk('goal/myGoal', async (userId, thunkApi) => {
  try {
    return await goalService.myGoal(userId);
  } catch (err) {
    console.log(err);
  }
});

const newGoal = createAsyncThunk('goal/newGoal', async (goal, thunkApi) => {
  try {
    return await goalService.newGoal(goal);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

    return thunkApi.rejectWithValue(message);
  }
});

const updateGoal = createAsyncThunk('goal/updateGoal', async (goal, thunkApi) => {});

export { everyoneGoals, myGoals, newGoal, updateGoal };

const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(everyoneGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(everyoneGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goals = [...action.payload];
        state.isSuccesfull = true;
      })
      .addCase(everyoneGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.goals = [];
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;

export default goalSlice.reducer;
