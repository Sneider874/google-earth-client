import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Principal
import Layout from './components/Estructura/Layout.jsx';

// Componentes de Autenticación y Rutas Protegidas
import RutaProtegida from './components/auth/RutaProtegida.jsx';
import Login from './components/auth/Login.jsx';
import Registro from './components/auth/Registro.jsx';

// Componentes de Páginas
import HomePage from './components/pages/HomePage.jsx';
import Dashboard from './components/pages/Dashboard.jsx';

// Componentes de Secciones
import Analisis from './components/sections/Analisis.jsx';
import Proyectos from './components/sections/Proyectos.jsx';
import Reportes from './components/sections/Reportes.jsx';
import Rios from './components/sections/Rios.jsx';
import Estadisticas from './components/sections/Estadisticas.jsx';
import Resultados from './components/sections/Resultados.jsx';

// Componentes de Perfil
import VistaPerfil from './components/profile/VistaPerfil.jsx';
import VistaConfiguracion from './components/profile/VistaConfiguracion.jsx';

// Componente Admin
const AdminPage = () => (
  <div className="p-4">
    <div className="alert alert-danger shadow-sm">
      <h2 className="h4 fw-bold">🚨 Panel de Administración</h2>
      <p className="mb-0">Solo usuarios con <strong>Rol 1 (Admin)</strong> pueden ver esto.</p>
    </div>
  </div>
);

function App() {
  const ADMIN_ROLE = 1;
  const USER_ROLE = 2;

  return (
    <Router>
      <Layout>
        <Routes>
          {/* --- RUTAS PÚBLICAS --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* --- RUTAS PROTEGIDAS --- */}
          
          {/* DASHBOARD - Página principal después del login */}
          <Route
            path="/dashboard"
            element={
              <RutaProtegida requiredRoles={[ADMIN_ROLE, USER_ROLE]}>
                <Dashboard />
              </RutaProtegida>
            }
          />

          {/* PERFIL Y CONFIGURACIÓN */}
          <Route
            path="/perfil"
            element={
              <RutaProtegida requiredRoles={[ADMIN_ROLE, USER_ROLE]}>
                <VistaPerfil />
              </RutaProtegida>
            }
          />

          <Route
            path="/configuracion"
            element={
              <RutaProtegida requiredRoles={[ADMIN_ROLE, USER_ROLE]}>
                <VistaConfiguracion />
              </RutaProtegida>
            }
          />

          {/* --- SECCIONES PRINCIPALES --- */}
          <Route
            path="/analisis"
            element={
              <RutaProtegida requiredRoles={[ADMIN_ROLE, USER_ROLE]}>
                <Analisis />
              </RutaProtegida>
            }
          />
          
          <Route
            path="/proyectos"
            element={
              <RutaProtegida requiredRoles={[ADMIN_ROLE, USER_ROLE]}>
                <Proyectos />
              </RutaProtegida>
            }
          />
          
          <Route
            path="/reportes"
            element={
              <RutaProtegida requiredRoles={[ADMIN_ROLE, USER_ROLE]}>
                <Reportes />
              </RutaProtegida>
            }
          />
          
          <Route
            path="/rios"
            element={
              <RutaProtegida requiredRoles={[ADMIN_ROLE, USER_ROLE]}>
                <Rios />
              </RutaProtegida>
            }
          />

          <Route
            path="/estadisticas"
            element={
              <RutaProtegida requiredRoles={[ADMIN_ROLE, USER_ROLE]}>
                <Estadisticas />
              </RutaProtegida>
            }
          />

          <Route
            path="/resultados"
            element={
              <RutaProtegida requiredRoles={[ADMIN_ROLE, USER_ROLE]}>
                <Resultados />
              </RutaProtegida>
            }
          />

          {/* --- RUTAS ADMIN --- */}
          <Route
            path="/admin"
            element={
              <RutaProtegida requiredRoles={[ADMIN_ROLE]}>
                <AdminPage />
              </RutaProtegida>
            }
          />
          
          <Route
            path="/roles"
            element={
              <RutaProtegida requiredRoles={[ADMIN_ROLE]}>
                <div className="p-5 text-center">
                  <h2>🛡️ Gestión de Roles</h2>
                  <p className="text-muted">Administración de roles y permisos</p>
                </div>
              </RutaProtegida>
            }
          />
          
          <Route
            path="/usuarios"
            element={
              <RutaProtegida requiredRoles={[ADMIN_ROLE]}>
                <div className="p-5 text-center">
                  <h2>👥 Gestión de Usuarios</h2>
                  <p className="text-muted">Administración de usuarios del sistema</p>
                </div>
              </RutaProtegida>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="text-center mt-5">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="lead">Página no encontrada</p>
              </div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;