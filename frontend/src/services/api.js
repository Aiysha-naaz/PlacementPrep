import axios from 'axios';

// Base URL for your backend
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// For requests that need authentication (optional)
API.interceptors.request.use((req) => {
  const user = localStorage.getItem('user');
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});

export default API;
