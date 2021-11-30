// A mock function to mimic making an async request for data
import axios from '../../utils/axios';

export const createRecipe = async (payload) => axios.post('/recipe/post', payload);
export const getRecipeByAuthor = async (user_id) => axios.get(`/recipe?uid=${user_id}`);
export const editRecipe = async (recipe_id, payload) => axios.post(`/recipe/${recipe_id}/edit`, payload);
export const deleteRecipe = async (recipe_id, payload) => axios.delete(`/recipe/${recipe_id}/delete`);
export const getIngredients = async () => axios.get('/ingredient');
export const getRecipeByDishName = async (dish_name) => axios.get(`/recipe${dish_name.length === 0 ? '' : `?dish_name=${dish_name}`}`);
export const getRecipeOfTop3FoodType = async () => axios.get('/top3foodtype');
export const getTopActiveMember = async () => axios.get('/topactivemember');
export const getRecipeByAdvSQLOne = async (cooking_time, ingredient_amount) => axios.get(`/advsql/1?cooking_time=${cooking_time}&ingredient_amount=${ingredient_amount}`);
export const getRecipeByAdvSQLTwo = async (rate) => axios.get(`/advsql/2?rate=${rate}`);
export const getRecipeById = async (rid) => axios.get(`/recipe/${rid}`);
export const postReview = async (payload) => axios.post('/review/post', payload);
export const deleteReview = async (rid) => axios.delete(`/review/${rid}/delete`);
