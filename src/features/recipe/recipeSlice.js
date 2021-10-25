import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createRecipe,
} from './recipeAPI';
import apiStaus from '../apiStaus';

const initialState = {
  recipes: null,
  status: 'success',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const createRecipeAsync = createAsyncThunk(
  'recipe/create',
  async (payload, thunkAPI) => {
    let response;
    try {
      response = await createRecipe(payload);
    } catch (err) {
      console.log(err);
      throw thunkAPI.rejectWithValue();
    }
  },
);

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRecipeAsync.pending, (state) => {
        state.status = apiStaus.pending;
      })
      .addCase(createRecipeAsync.fulfilled, (state) => {
        state.status = apiStaus.idle;
      })
      .addCase(createRecipeAsync.rejected, (state) => {
        state.status = apiStaus.failed;
      });
  },
});

export const {} = recipeSlice.actions;

export default recipeSlice.reducer;
