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

const myGoals = createAsyncThunk('goal/myGoal', async (token, thunkApi) => {
  try {
    return await goalService.myGoals(token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

    return thunkApi.rejectWithValue(message);
  }
});

const newGoal = createAsyncThunk('goal/newGoal', async (data, thunkApi) => {
  try {
    const { text, token } = data;
    return await goalService.newGoal(text, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

    return thunkApi.rejectWithValue(message);
  }
});

const deleteGoal = createAsyncThunk('goal/deleteGoal', async (data, thunkApi) => {
  try {
    const { id, token } = data;
    return await goalService.deleteGoal(id, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

    return thunkApi.rejectWithValue(message);
  }
});

const updateGoal = createAsyncThunk('goal/updateGoal', async (data, thunkApi) => {
  try {
    const { id, text, token } = data;
    return await goalService.updateGoal(id, text, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

    return thunkApi.rejectWithValue(message);
  }
});

export { everyoneGoals, myGoals, newGoal, deleteGoal, updateGoal };

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
      })
      .addCase(myGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(myGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goals = [...action.payload];
        state.isSuccesfull = true;
      })
      .addCase(myGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.goals = [];
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(newGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goals = action.payload;
        state.isSuccesfull = true;
      })
      .addCase(newGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.goals = [];
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goals = action.payload;
        state.isSuccesfull = true;
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.goals = [];
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goals = action.payload;
        state.isSuccesfull = true;
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.goals = [];
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;

export default goalSlice.reducer;
