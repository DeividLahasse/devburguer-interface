import axios from 'axios';

export const api = axios.create({
 baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  const userData = localStorage.getItem('devburger:userData');
  console.log('userData no interceptor:', userData)

  const token = userData && JSON.parse(userData).token;
  console.log('token no interceptor:', token)

  config.headers.authorization = `Bearer ${token}`;

  return config;
});
