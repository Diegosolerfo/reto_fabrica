import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
    baseURL: 'http://localhost:8082/api'
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 401 || status === 403) {
                localStorage.removeItem('token');
                localStorage.removeItem('admin');

                await Swal.fire({
    icon: 'error',
    title: 'Acceso Denegado',
    text: 'Redirigiendo al login...',
    timer: 5000, 
    showConfirmButton: true
}).then(() => {
    window.location.href = "/";
});
            }
        }
        return Promise.reject(error);
    }
);

export default api;