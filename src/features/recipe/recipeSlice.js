import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createRecipe,
  deleteRecipe,
  editRecipe,
  getRecipeByAuthor,
} from './recipeAPI';
import apiStatus from '../apiStatus';

const initialState = {
  recipes: null,
  status: apiStatus.idle,
  isNeedToReSearch: false,
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

export const editRecipeAsync = createAsyncThunk(
  'recipe/edit',
  async (payload, thunkAPI) => {
    const { recipe_id, ...others } = payload;
    let response;
    try {
      response = await editRecipe(recipe_id, payload);
    } catch (err) {
      throw thunkAPI.rejectWithValue();
    }
  },
);

export const deleteRecipeAsync = createAsyncThunk(
  'recipe/delete',
  async (recipe_id, thunkAPI) => {
    try {
      await deleteRecipe(recipe_id);
    } catch (err) {
      throw thunkAPI.rejectWithValue();
    }
  },
);

export const getUserRecipesAsync = createAsyncThunk(
  'recipe',
  async (user_id, thunkAPI) => {
    let response;
    try {
      response = await getRecipeByAuthor(user_id);
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
    resetStatus: (state) => {
      state.status = apiStatus.idle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRecipeAsync.pending, (state) => {
        state.status = apiStatus.pending;
      })
      .addCase(createRecipeAsync.fulfilled, (state) => {
        state.status = apiStatus.successful;
      })
      .addCase(createRecipeAsync.rejected, (state) => {
        state.status = apiStatus.failed;
      })
      .addCase(getUserRecipesAsync.pending, (state) => {
        state.status = apiStatus.pending;
      })
      .addCase(getUserRecipesAsync.fulfilled, (state, action) => {
        state.status = apiStatus.idle;
        state.recipes = action.payload;
        state.isNeedToReSearch = false;
      })
      .addCase(getUserRecipesAsync.rejected, (state) => {
        state.status = apiStatus.failed;
      })
      .addCase(editRecipeAsync.pending, (state) => {
        state.status = apiStatus.pending;
      })
      .addCase(editRecipeAsync.fulfilled, (state) => {
        state.status = apiStatus.successful;
      })
      .addCase(editRecipeAsync.rejected, (state) => {
        state.status = apiStatus.failed;
      })
      .addCase(deleteRecipeAsync.pending, (state) => {
        state.status = apiStatus.pending;
      })
      .addCase(deleteRecipeAsync.fulfilled, (state) => {
        state.status = apiStatus.successful;
        state.isNeedToReSearch = true;
      })
      .addCase(deleteRecipeAsync.rejected, (state) => {
        state.status = apiStatus.failed;
      });
  },
});

export const { resetStatus } = recipeSlice.actions;

export default recipeSlice.reducer;
