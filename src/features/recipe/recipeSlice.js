import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createRecipe,
  getRecipeByAuthor,
} from './recipeAPI';
import apiStatus from '../apiStatus';

const initialState = {
  recipes: null,
  status: apiStatus.idle,
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
      throw thunkAPI.rejectWithValue();
    }
  },
);

export const getUserRecipesAsync = createAsyncThunk(
  'recipe',
  async (thunkAPI) => {
    let response;
    try {
      response = await getRecipeByAuthor();
    } catch (err) {
      throw thunkAPI.rejectWithValue();
    }
    return response.data;
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
      })
      .addCase(getUserRecipesAsync.pending, (state) => {
        state.status = apiStaus.pending;
      })
      .addCase(getUserRecipesAsync.fulfilled, (state, action) => {
        state.status = apiStaus.idle;
        state.recipes = action.payload;
      })
      .addCase(getUserRecipesAsync.rejected, (state) => {
        state.status = apiStaus.failed;
      });
  },
});

export const {} = recipeSlice.actions;

export default recipeSlice.reducer;
