
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users'; 

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const getProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile/me`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        throw error;
    }
};

export const updateProfile = async (profileData) => {
    try {
        const response = await axios.put(`${API_URL}/profile/me`, profileData, getAuthHeader());
        
        if (profileData.nombre) localStorage.setItem('userName', profileData.nombre);
        if (profileData.correo) localStorage.setItem('userEmail', profileData.correo);
        
        return response.data;
    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        throw error;
    }
};

export const updatePrivacy = async (isPublic) => {
    try {
        const response = await axios.put(
            `${API_URL}/profile/privacy`, 
            { isPublic }, 
            getAuthHeader()
        );
        return response.data;
    } catch (error) {
        console.error('Error al actualizar privacidad:', error);
        throw error;
    }
};


export const deleteAccount = async () => {
    try {
        const response = await axios.delete(`${API_URL}/profile/me`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Error al eliminar cuenta:', error);
        throw error;
    }
};

export const uploadAvatar = async (formData) => {
    try {
        
        const response = await axios.post(
            `${API_URL}/profile/avatar`,
            formData,
            {
                headers: {
                    ...getAuthHeader().headers,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error al subir avatar:', error);
        throw error;
    }
};
