// src/components/DashboardProtegido.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentUser, logout } from '../services/auth.service'; 

const DashboardProtegido = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(true);
    
    // Obtenemos el objeto completo del usuario (que incluye el token)
    const user = getCurrentUser(); 

    useEffect(() => {
        // 1. Verificar si hay un usuario logueado o un token
        if (!user || !user.token) {
            setError('No autorizado. Por favor, inicia sesión.');
            setCargando(false);
            return;
        }

        const fetchUsuarios = async () => {
            try {
                // RUTA PROTEGIDA - Requerirá el Header Authorization
                const response = await axios.get('http://localhost:3000/api/users', {
                    headers: {
                        // USO DEL FORMATO BEARER TOKEN
                        Authorization: `Bearer ${user.token}` 
                    }
                });
                
                setUsuarios(response.data);
                
            } catch (error) { 
                // CORRECCIÓN: Usamos la variable 'error' para acceder al mensaje del servidor.
                const errorMessage = error.response?.data?.message || 'Token inválido. Vuelve a iniciar sesión.';
                setError(`Acceso Denegado: ${errorMessage}`);
                
                logout(); // Limpiamos el token malo
                
                // Forzar recarga para que App.jsx detecte que el token se fue
                window.location.reload(); 
            } finally {
                setCargando(false);
            }
        };

        fetchUsuarios();
    }, [user]); 

    // Verificación de estado de cargando
    if (cargando) return <div style={{ padding: '20px' }}>Cargando datos protegidos...</div>;
    
    // Verificación si hay un error
    if (error) return <div style={{ color: 'red', padding: '20px', border: '1px solid red' }}>{error}</div>;

    // Verificación de acceso, si no hay token pero no hay error
    if (!user) return <div style={{ color: 'red', padding: '20px' }}>🛑 No autorizado.</div>;

    return (
        <div style={{ border: '2px solid #007bff', padding: '20px', borderRadius: '5px' }}>
            <h2>Panel de Control (Ruta Protegida)</h2>
            <p>Conectado como: <strong>{user.correo}</strong> (Rol: {user.rol})</p>
            
            <button 
                onClick={() => { 
                    logout(); 
                    window.location.reload(); 
                }}
                style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', marginBottom: '15px' }}
            >
                Cerrar Sesión
            </button>
            
            <h3>Usuarios obtenidos de /api/users:</h3>
            <ul>
                {usuarios.map(u => (
                    <li key={u.idUsuario}>{u.nombre} ({u.correo})</li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardProtegido;