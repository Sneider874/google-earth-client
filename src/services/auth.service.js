
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const login = async (correo, contrasena) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            correo,
            contrasena,
        });

        console.log('Respuesta del login:', response.data); 

        // Guardar token y datos del usuario en localStorage
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            
            if (response.data.user) {
                
                const userId = response.data.user.idUsuario?.toString();
                const userName = response.data.user.nombre || 'Usuario';
                const userEmail = response.data.user.correo || correo;
                const userRole = response.data.user.rol?.toString() || '2';
                
                localStorage.setItem('userId', userId);
                localStorage.setItem('userName', userName);
                localStorage.setItem('userEmail', userEmail);
                localStorage.setItem('userRole', userRole);
                
                console.log('Datos guardados en localStorage:', {
                    userId,
                    userName,
                    userEmail,
                    userRole
                });
            }
        }

        return response.data;
    } catch (error) {
        console.error('Error en login:', error);
        throw error;
    }
};


export const register = async (nombre, correo, contrasena) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            nombre,
            correo,
            contrasena,
        });
        return response.data;
    } catch (error) {
        console.error('Error en registro:', error);
        throw error;
    }
};


export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};


export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');
    

    if (!token) {
        return null;
    }
    
    return {
        id: userId,
        name: userName,
        email: userEmail,
        role: userRole,
        token: token,
    };
};

// Función de Logout
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    
    // Recargar la página para limpiar el estado
    window.location.href = '/login';
};