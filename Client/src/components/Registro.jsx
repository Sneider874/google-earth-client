// src/components/Registro.jsx (Frontend React - CORREGIDO para usar el servicio)

import React, { useState } from 'react';
// 🚨 CRÍTICO: Importar la función 'register' desde el servicio
import { register } from '../services/auth.service.js'; // Asegúrate que la ruta sea correcta

const Registro = () => {
    // Estado inicial con los campos necesarios
    const [form, setForm] = useState({ nombre: '', correo: '', contrasena: '' });
    const [mensaje, setMensaje] = useState('');

    // Función para manejar los cambios en todos los inputs
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');

        try {
            // 🚨 CRÍTICO: Llama a la función del servicio con los datos y el rol
            const response = await register(form.nombre, form.correo, form.contrasena, 2); 
            // El rol (2) se pasa al servicio, que maneja la petición axios

            // El backend devuelve { message: '...' }
            setMensaje(`✅ ${response.data.message || 'Registro exitoso. ¡Verifica tu correo!'}`);
            
            // Limpiar el formulario
            setForm({ nombre: '', correo: '', contrasena: '' });
            
        } catch (error) {
            // Maneja errores de la red o del servidor (ej: 400 Bad Request)
            const errorMsg = error.response?.data?.message || 'Error al registrar. Verifica la conexión.';
            setMensaje(`❌ Error: ${errorMsg}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>Crear Cuenta</h2>
            
            <input 
                type="text" 
                name="nombre" 
                placeholder="Nombre" 
                value={form.nombre} 
                onChange={handleChange}
                required 
                style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
            />
            <input 
                type="email" 
                name="correo" 
                placeholder="Correo Electrónico" 
                value={form.correo} 
                onChange={handleChange}
                required 
                style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
            />
            <input 
                type="password" 
                name="contrasena" 
                placeholder="Contraseña" 
                value={form.contrasena} 
                onChange={handleChange}
                required 
                style={{ marginBottom: '15px', padding: '8px', width: '100%' }}
            />
            
            <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
                Registrarse
            </button>
            <p style={{ color: mensaje.startsWith('❌') ? 'red' : 'green', marginTop: '10px' }}>{mensaje}</p>
        </form>
    );
};

export default Registro;