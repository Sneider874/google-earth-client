import axios from 'axios';

// ✅ CORREGIDO: Cambiar de '/api/auth' a '/api/analisis'
const API_URL = 'http://localhost:3000/api/analisis';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para agregar token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const analysisApi = {
    getAll: async () => {
        try {
            const response = await api.get('/');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    create: async (data) => {
        try {
            const response = await api.post('/', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    update: async (id, data) => {
        try {
            const response = await api.put(`/${id}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    delete: async (id) => {
        try {
            const response = await api.delete(`/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    run: async (id) => {
        try {
            const response = await api.post(`/run/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getIndices: async (id) => {
        try {
            const response = await api.get(`/${id}/indices`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getSensors: async (id) => {
        try {
            const response = await api.get(`/${id}/sensores`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default analysisApi;