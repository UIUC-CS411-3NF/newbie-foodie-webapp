import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  signIn, signOut, signUp, testApi,
} from './authAPI';

const initialState = {
  login: false,
  status: 'idle',
  connect: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const signInAsync = createAsyncThunk(
  'auth/signIn',
  async (payload, thunkAPI) => {
    let response;
    try {
      response = await signIn(payload);
    } catch (err) {
      throw thunkAPI.rejectWithValue();
    }
  },
);

export const signUpAsync = createAsyncThunk(
  'auth/signUp',
  async (payload, thunkAPI) => {
    let response;
    console.log(payload);
    try {
      response = await signUp(payload);
    } catch (err) {
      throw thunkAPI.rejectWithValue();
    }
    console.log(response.data);
    return response.data;
  },
);

export const signOutAsync = createAsyncThunk(
  'auth/signOut',
  async (_, thunkAPI) => {
    let response;
    try {
      response = await signOut();
    } catch (err) {
      throw thunkAPI.rejectWithValue();
    }
  },
);

// For testing
export const testApiAsync = createAsyncThunk(
  '/',
  async (thunkAPI) => {
    let response;
    try {
      response = await testApi();
      console.log(response.data);
    } catch (err) {
      console.log(err);
      thunkAPI.rejectWithValue(0);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.status = 'loading';
        state.login = false;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.login = true;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.status = 'error';
        state.login = false;
      })
      .addCase(testApiAsync.fulfilled, (state, action) => {
        state.connect = true;
      })
      .addCase(signUpAsync.pending, (state) => {
        state.status = 'loading';
        state.login = false;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.login = false;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.status = 'error';
        state.login = false;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.login = false;
      })
      .addCase(signOutAsync.rejected, (state, action) => {
        state.status = 'error';
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
