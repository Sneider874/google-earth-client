// src/App.jsx
import React from 'react';
import { getCurrentUser } from './services/auth.service.js'; // Importa con el .js explícito
import Login from './components/Login.jsx'; 
import Registro from './components/Registro.jsx'; 
import DashboardProtegido from './components/DashboardProtegido.jsx';

function App() {
    // Intenta obtener el token guardado. Gracias al try/catch en el servicio,
    // este código no fallará.
    const user = getCurrentUser(); 

    return (
        <div style={{ fontFamily: 'Arial', padding: '20px' }}>
            <h1>Plataforma de Autenticación Geográfica</h1>
            <hr />

            {user ? (
                // 1. Si hay un token, mostramos el dashboard protegido
                <DashboardProtegido user={user} />
            ) : (
                // 2. Si no hay token, mostramos las opciones de Login/Registro
                <div style={{ display: 'flex', gap: '40px', justifyContent: 'center' }}>
                    <Login />
                    <Registro />
                </div>
            )}
        </div>
    );
}

export default App;