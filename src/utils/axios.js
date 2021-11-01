import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 600000,
  withCredentials: true,
});

/**
 * Catch error from server's response.
 * If we dont do this, we have to get server message from
 * error.response.data every time.
 */
instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error?.response?.data),
);

export default instance;
