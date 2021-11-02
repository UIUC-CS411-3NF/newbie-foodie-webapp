// A mock function to mimic making an async request for data
import axios from '../../utils/axios';

export const signIn = async (payload) => axios.post('/auth/signin', payload);
export const signOut = async () => axios.get('/auth/signout');
export const signUp = async (payload) => axios.post('/auth/signup', payload);
export const testApi = async () => axios.get('/');
export const verify = async () => axios.get('/auth/verify');
