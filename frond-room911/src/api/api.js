import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8082/api'
});

// Interceptor: Pone el token en TODAS las peticiones automáticamente
api.interceptors.request.use(
    (config) => {
        // No enviamos token si es la ruta de login
        if (!config.url.includes('/auth/login')) {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;