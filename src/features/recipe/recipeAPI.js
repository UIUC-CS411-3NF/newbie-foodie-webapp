// A mock function to mimic making an async request for data
import axios from '../../utils/axios';

export const createRecipe = async (payload) => axios.post('/recipe/post', payload);
export const getRecipeByAuthor = async () => axios.get('/recipe?uid=1');