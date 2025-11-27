import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Offcanvas, Dropdown, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Cargar información del usuario desde localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');

    if (token && userName) {
      setUser({
        name: userName,
        email: userEmail,
        role: userRole,
      });
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    setUser(null);
    navigate('/login');
  };

  const menuItems = [
    { label: 'Inicio', path: '/', icon: '🏠' },
    //  DASHBOARD REMOVIDO DEL MENÚ
    { label: 'Análisis', path: '/analisis', icon: '📈', protected: true },
    { label: 'Proyectos', path: '/proyectos', icon: '📁', protected: true },
    { label: 'Reportes', path: '/reportes', icon: '📄', protected: true },
    { label: 'Ríos', path: '/rios', icon: '🌊', protected: true },
    { label: 'Estadísticas', path: '/estadisticas', icon: '📊', protected: true },
    { label: 'Resultados', path: '/resultados', icon: '✅', protected: true },
    { label: 'Roles', path: '/roles', icon: '🛡️', protected: true, adminOnly: true },
    { label: 'Usuarios', path: '/usuarios', icon: '👥', protected: true, adminOnly: true },
    { label: 'Admin', path: '/admin', icon: '⚙️', protected: true, adminOnly: true },
  ];

  // Filtrar menú según rol del usuario
  const filteredMenuItems = menuItems.filter(item => {
    if (!item.protected) return true;
    if (!user) return false;
    if (item.adminOnly && user.role !== '1') return false;
    return true;
  });

  const isActive = (path) => location.pathname === path;

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header/Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm sticky-top">
        <Container fluid>
          {/* Menú Hamburguesa */}
          {user && (
            <button
              className="btn btn-outline-light me-3"
              onClick={() => setShowSidebar(true)}
              style={{ border: 'none' }}
            >
              <i className="bi bi-list" style={{ fontSize: '1.5rem' }}>☰</i>
            </button>
          )}

          {/* Logo/Marca */}
          <Navbar.Brand as={Link} to={user ? "/dashboard" : "/"} className="d-flex align-items-center">
            <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>🗺️</span>
            <strong>Sistema GEO</strong>
          </Navbar.Brand>

          {/* Botones de Usuario o Login */}
          <Nav className="ms-auto">
            {user ? (
              <NavDropdown
                title={
                  <span>
                    <span
                      className="bg-light text-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{ width: '35px', height: '35px', fontWeight: 'bold' }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </span>
                }
                id="user-dropdown"
                align="end"
              >
                <div className="px-3 py-2 border-bottom">
                  <div className="fw-bold">{user.name}</div>
                  <small className="text-muted">{user.email}</small>
                  <br />
                  <small className="badge bg-primary mt-1">
                    {user.role === '1' ? 'Administrador' : 'Usuario'}
                  </small>
                </div>
                
                <Dropdown.Item onClick={() => navigate('/perfil')}>
                  👤 Mi Perfil
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/configuracion')}>
                  ⚙️ Configuración
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  🚪 Cerrar Sesión
                </Dropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <button
                  className="btn btn-outline-light me-2"
                  onClick={() => navigate('/login')}
                >
                  Iniciar Sesión
                </button>
                <button
                  className="btn btn-light"
                  onClick={() => navigate('/registro')}
                >
                  Registrarse
                </button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* Sidebar Offcanvas */}
      {user && (
        <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="start">
          <Offcanvas.Header closeButton className="bg-primary text-white">
            <Offcanvas.Title>
              <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>🗺️</span>
              Menú
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <Nav className="flex-column">
              {filteredMenuItems.map((item, index) => (
                <Nav.Link
                  key={index}
                  as={Link}
                  to={item.path}
                  onClick={() => setShowSidebar(false)}
                  className={`px-4 py-3 border-bottom ${
                    isActive(item.path) ? 'bg-primary text-white fw-bold' : 'text-dark'
                  }`}
                  style={{
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.backgroundColor = '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span style={{ fontSize: '1.2rem', marginRight: '10px' }}>{item.icon}</span>
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      )}

      {/* Main Content */}
      <main className="flex-grow-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-auto">
        <Container>
          <div className="row">
            {/* Columna 1 */}
            <div className="col-md-4 mb-3">
              <h5 className="d-flex align-items-center">
                <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>🗺️</span>
                Sistema GEO
              </h5>
              <p className="text-white-50 small">
                Plataforma de gestión y análisis de datos geográficos para el monitoreo
                ambiental y proyectos de investigación.
              </p>
            </div>

            {/* Columna 2 */}
            <div className="col-md-4 mb-3">
              <h6 className="fw-bold">Enlaces Rápidos</h6>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-white-50 text-decoration-none">Inicio</Link></li>
                <li><Link to="/proyectos" className="text-white-50 text-decoration-none">Proyectos</Link></li>
                <li><Link to="/reportes" className="text-white-50 text-decoration-none">Reportes</Link></li>
                <li><a href="#" className="text-white-50 text-decoration-none">Ayuda</a></li>
              </ul>
            </div>

            {/* Columna 3 */}
            <div className="col-md-4 mb-3">
              <h6 className="fw-bold">Contacto</h6>
              <ul className="list-unstyled text-white-50 small">
                <li>📧 info@sistemageo.com</li>
                <li>📞 +57 300 123 4567</li>
                <li>📍 Ibagué, Tolima, Colombia</li>
              </ul>
            </div>
          </div>

          <hr className="bg-white" />
          <div className="text-center text-white-50 small">
            <p className="mb-0">© 2025 Sistema GEO - UNIMINUTO</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;