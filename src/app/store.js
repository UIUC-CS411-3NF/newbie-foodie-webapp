import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import recipeReducer from '../features/recipe/recipeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    recipe: recipeReducer,
  },
});
