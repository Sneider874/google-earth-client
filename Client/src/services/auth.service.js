// google-earth-client/src/services/auth.service.js

import axios from 'axios';

// OBTENEMOS LA URL DEL ARCHIVO .env (ej: http://localhost:3000/api)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const AUTH_URL = `${API_BASE_URL}/auth`; // -> http://localhost:3000/api/auth

// 1. Función para el Login (hace el POST y guarda el token)
export const login = async (correo, contrasena) => {
    const response = await axios.post(`${AUTH_URL}/login`, { 
        correo,
        contrasena,
    });
    // Si el login es exitoso y el token está presente
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// 2. Función para el Registro
export const register = async (nombre, correo, contrasena, rol) => {
    // Si el rol no se especifica, usa el valor por defecto de la API
    return axios.post(`${AUTH_URL}/register`, {
        nombre,
        correo,
        contrasena,
        rol,
    });
};

// 3. Función para cerrar sesión (borra el token)
export const logout = () => {
    localStorage.removeItem('user');
    window.location.reload(); 
};

// 4. Función para obtener el usuario/token guardado (CRÍTICA: Manejo de errores)
export const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem('user');
        
        if (!userStr) {
            return null; // No hay usuario
        }
        
        return JSON.parse(userStr); // Intenta parsear JSON
        
    } catch (error) {
        // Si el JSON está corrupto (error de parsing), limpia el localStorage 
        // para que la aplicación no falle.
        console.error("Error al obtener o parsear el usuario de localStorage:", error);
        localStorage.removeItem('user');
        return null;
    }
};