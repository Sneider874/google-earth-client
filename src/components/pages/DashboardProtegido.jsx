
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { logout } from '../../services/auth.service'; 

//  Obtenemos la URL base del entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const USERS_URL = `${API_BASE_URL}/users`; 

// Aceptamos 'user' como una prop enviada desde App.jsx
const DashboardProtegido = ({ user }) => { 
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(true);
    
    
    useEffect(() => {
        //  Verificar si la prop 'user' llegó correctamente
        if (!user || !user.token) {

            setError('Error de sesión: No se encontró el token de usuario.');
            setCargando(false);
            return; 
        }

        const fetchUsuarios = async () => {
            try {
                // RUTA PROTEGIDA - Se usa la variable de entorno para la URL
                const response = await axios.get(USERS_URL, {
                    headers: {
                        // USO DEL FORMATO BEARER TOKEN
                        Authorization: `Bearer ${user.token}` 
                    }
                });
                
                setUsuarios(response.data);
                
            } catch (error) { 

                const errorMessage = error.response?.data?.message || 'Token inválido o el servidor no está corriendo (Intenta verificar la terminal del backend).';
                setError(` Error al cargar usuarios: ${errorMessage}`);
                
            } finally {
                setCargando(false);
            }
        };

        fetchUsuarios();
    }, [user]); // Dependencia en la prop 'user'

    // Verificación de estado de cargando
    if (cargando) return <div style={{ padding: '20px' }}>Cargando datos protegidos...</div>;
    
    // Verificación si hay un error (muestra el mensaje detallado del catch)
    if (error) return <div style={{ color: 'red', padding: '20px', border: '1px solid red' }}>{error}</div>;

    
    return (
        <div style={{ border: '2px solid #007bff', padding: '20px', borderRadius: '5px' }}>
            <h2>Panel de Control (Ruta Protegida)</h2>
            <p>Conectado como: <strong>{user.correo}</strong> (Rol: {user.rol})</p>
            
            <button 
                onClick={logout} // La función logout ya recarga la página
                style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', marginBottom: '15px' }}
            >
                Cerrar Sesión
            </button>
            
            <h3>Usuarios obtenidos de /api/users:</h3>
            {usuarios.length > 0 ? (
                <ul style={{ listStyleType: 'disc', textAlign: 'left', paddingLeft: '20px' }}>
                    {usuarios.map(u => (
                        <li key={u.id} style={{ marginBottom: '5px' }}>
                            <strong>{u.nombre}</strong> ({u.correo}) - Rol: {u.rol}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No se encontraron usuarios. Por favor, revisa el mensaje de error de arriba o asegúrate que el servidor backend está listo.</p>
            )}
        </div>
    );
};

export default DashboardProtegido;