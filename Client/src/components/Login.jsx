// src/components/Login.jsx
import React, { useState } from 'react';
// Importamos la función de login desde el servicio
import { login } from '../services/auth.service'; 
// Ya no necesitamos 'axios' directamente aquí

// NOTA: 'onLoginSuccess' es una prop que se usa para manejar la navegación o el estado global
const Login = () => { // Eliminamos { onLoginSuccess } si no se usa internamente
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');

        try {
            // USAMOS LA FUNCIÓN DEL SERVICIO para hacer el post, guardar el token y obtener los datos
            await login(correo, contrasena); 

            // Una vez que el servicio guardó el token:
            setMensaje('✅ Inicio de sesión exitoso. Redirigiendo...');
            
            // Forzar la recarga o redirección para que App.jsx detecte el token
            window.location.reload(); 
            
            // NOTA: Si usaras 'onLoginSuccess' para cambiar de componente SIN recargar, lo llamarías aquí.
            // onLoginSuccess(response.data.token, response.data.rol); 
            
        } catch (error) {
            // Manejo de errores: 401 (Credenciales) o 403 (No verificado)
            // Aseguramos que 'error.response' exista antes de acceder a 'data'
            const msg = error.response?.data?.message || 'Error de conexión o servidor.';
            setMensaje(`❌ Error: ${msg}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>Iniciar Sesión</h2>
            <input 
                type="email" 
                placeholder="Correo" 
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
                required 
                style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
            />
            <input 
                type="password" 
                placeholder="Contraseña" 
                value={contrasena} 
                onChange={(e) => setContrasena(e.target.value)} 
                required 
                style={{ marginBottom: '15px', padding: '8px', width: '100%' }}
            />
            <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                Entrar
            </button>
            <p style={{ color: mensaje.startsWith('❌') ? 'red' : 'green', marginTop: '10px' }}>{mensaje}</p>
        </form>
    );
};

export default Login;