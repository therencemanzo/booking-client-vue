import axios from 'axios';

const api = axios.create({
  baseURL: 'http://cavu.test/api/v1', // <-- replace with your API URL
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add Authorization header automatically
if(localStorage.getItem('token')){
 
    api.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
}

export default api;