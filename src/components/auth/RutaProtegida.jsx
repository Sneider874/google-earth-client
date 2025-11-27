import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../../services/auth.service'; 


const RutaProtegida = ({ requiredRoles, children }) => {
    const currentUserData = getCurrentUser(); 
    const location = useLocation();

    //  Verificación de Autenticación:
    if (!currentUserData) {
        console.warn('Usuario no autenticado, redirigiendo al login');
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    //  Verificación de Autorización (Roles):
 
    const userRole = parseInt(currentUserData.role, 10);
    
    // Si el rol es NaN o undefined, denegar acceso
    if (isNaN(userRole)) {
        console.error('Rol inválido:', currentUserData.role);
        return <Navigate to="/login" replace />; 
    }

    console.log('Verificando permisos:', {
        email: currentUserData.email,
        role: userRole,
        requiredRoles: requiredRoles
    });

    // Si la ruta requiere roles específicos
    if (requiredRoles && requiredRoles.length > 0) {
        // Verificar si el rol del usuario está en la lista de roles permitidos
        if (!requiredRoles.includes(userRole)) {
            console.warn(`Acceso denegado: Rol ${userRole} no autorizado para esta ruta.`);
            return <Navigate to="/dashboard" replace />; 
        }
    }

    //  Acceso permitido:
    return children;
};

export default RutaProtegida;