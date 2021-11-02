// A mock function to mimic making an async request for data
import axios from '../../utils/axios';

export const createRecipe = async (payload) => axios.post('/recipe/post', payload);
export const getRecipeByAuthor = async (user_id) => axios.get(`/recipe?uid=${user_id}`);
export const editRecipe = async (recipe_id, payload) => axios.post(`/recipe/${recipe_id}/edit`, payload);
export const deleteRecipe = async (recipe_id, payload) => axios.delete(`/recipe/${recipe_id}/delete`);
