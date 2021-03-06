import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createRecipe,
  deleteRecipe,
  editRecipe,
  getRecipeByAuthor,
  getIngredients,
  getRecipeByDishName,
  getRecipeOfTop3FoodType,
  getTopActiveMember,
  getRecipeByAdvSQLOne,
  getRecipeByAdvSQLTwo,
} from './recipeAPI';
import apiStatus from '../apiStatus';

const initialState = {
  recipes: null, // for a specific user
  allRecipes: null,
  top3FoodType: null,
  topActiveMember: null,
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
      response = await editRecipe(recipe_id, others);
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

export const getIngredientsAsync = createAsyncThunk(
  'recipe/ingredient',
  async (thunkAPI) => {
    let response;
    try {
      response = await getIngredients();
    } catch (err) {
      throw thunkAPI.rejectWithValue();
    }
    return response.data;
  },
);

export const getDishNameRecipesAsync = createAsyncThunk(
  'recipe/dishname',
  async (dish_name, thunkAPI) => {
    let response;
    try {
      response = await getRecipeByDishName(dish_name);
    } catch (err) {
      throw thunkAPI.rejectWithValue();
    }
    return response.data;
  },
);

export const getTop3FoodTypeRecipesAsync = createAsyncThunk(
  'recipe/top3FoodType',
  async (thunkAPI) => {
    let response;
    try {
      response = await getRecipeOfTop3FoodType();
    } catch (err) {
      throw thunkAPI.rejectWithValue();
    }
    return response.data;
  },
);

export const getTopActiveMemberAsync = createAsyncThunk(
  'recipe/topActiveMember',
  async (thunkAPI) => {
    let response;
    try {
      response = await getTopActiveMember();
    } catch (err) {
      throw thunkAPI.rejectWithValue();
    }
    return response.data;
  },
);

export const getAdvSQLOneRecipesAsync = createAsyncThunk(
  'advsql1',
  async (data, thunkAPI) => {
    const { cooking_time, ingredient_amount } = data;
    let response;
    try {
      response = await getRecipeByAdvSQLOne(cooking_time, ingredient_amount);
    } catch (err) {
      throw thunkAPI.rejectWithValue();
    }
    return response.data;
  },
);

export const getAdvSQLTwoRecipesAsync = createAsyncThunk(
  'advsql2',
  async (rate, thunkAPI) => {
    let response;
    try {
      response = await getRecipeByAdvSQLTwo(rate);
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
      })
      .addCase(getIngredientsAsync.pending, (state) => {
        state.status = apiStatus.pending;
      })
      .addCase(getIngredientsAsync.fulfilled, (state, action) => {
        state.status = apiStatus.successful;
        state.ingredients = action.payload;
      })
      .addCase(getIngredientsAsync.rejected, (state) => {
        state.status = apiStatus.failed;
      })
      .addCase(getDishNameRecipesAsync.pending, (state) => {
        state.status = apiStatus.pending;
      })
      .addCase(getDishNameRecipesAsync.fulfilled, (state, action) => {
        state.status = apiStatus.idle;
        state.allRecipes = action.payload;
      })
      .addCase(getDishNameRecipesAsync.rejected, (state) => {
        state.status = apiStatus.failed;
      })
      .addCase(getTop3FoodTypeRecipesAsync.pending, (state) => {
        state.status = apiStatus.pending;
      })
      .addCase(getTop3FoodTypeRecipesAsync.fulfilled, (state, action) => {
        state.status = apiStatus.idle;
        state.top3FoodType = action.payload;
      })
      .addCase(getTop3FoodTypeRecipesAsync.rejected, (state) => {
        state.status = apiStatus.failed;
      })
      .addCase(getTopActiveMemberAsync.pending, (state) => {
        state.status = apiStatus.pending;
      })
      .addCase(getTopActiveMemberAsync.fulfilled, (state, action) => {
        state.status = apiStatus.idle;
        state.topActiveMember = action.payload;
      })
      .addCase(getTopActiveMemberAsync.rejected, (state) => {
        state.status = apiStatus.failed;
      })
      .addCase(getAdvSQLOneRecipesAsync.pending, (state) => {
        state.status = apiStatus.pending;
      })
      .addCase(getAdvSQLOneRecipesAsync.fulfilled, (state, action) => {
        state.status = apiStatus.idle;
        state.allRecipes = action.payload;
      })
      .addCase(getAdvSQLOneRecipesAsync.rejected, (state) => {
        state.status = apiStatus.failed;
      })
      .addCase(getAdvSQLTwoRecipesAsync.pending, (state) => {
        state.status = apiStatus.pending;
      })
      .addCase(getAdvSQLTwoRecipesAsync.fulfilled, (state, action) => {
        state.status = apiStatus.idle;
        state.allRecipes = action.payload;
      })
      .addCase(getAdvSQLTwoRecipesAsync.rejected, (state) => {
        state.status = apiStatus.failed;
      });
  },
});

export const { resetStatus } = recipeSlice.actions;

export default recipeSlice.reducer;
