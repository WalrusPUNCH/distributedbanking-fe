import axios from 'axios';

export const axiosAuth = axios.create();

axiosAuth.defaults.baseURL = 'http://localhost:5221/';
axiosAuth.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
       
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);
