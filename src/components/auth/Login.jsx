
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, isAuthenticated } from '../../services/auth.service';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //  Si ya está autenticado, redirigir al dashboard
    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        setLoading(true);

        try {
            await login(correo, contrasena);
            setMensaje(' Inicio de sesión exitoso. Redirigiendo...');
            
            //  Redirigir al DASHBOARD después del login exitoso
            setTimeout(() => {
                navigate('/dashboard');
                window.location.reload();
            }, 1000);
            
        } catch (error) {
            setLoading(false);
            const msg = error.response?.data?.message || 'Error de conexión o servidor.';
            setMensaje(` Error: ${msg}`);
        }
    };

    return (
        <div 
            className="d-flex align-items-center justify-content-center min-vh-100" 
            style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '20px' 
            }}
        >
            <Container>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-5">
                        <Card className="shadow-lg border-0 rounded-4">
                            <Card.Body className="p-5">
                                {/* Logo y Título */}
                                <div className="text-center mb-4">
                                    <div 
                                        className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle mb-3"
                                        style={{ width: '70px', height: '70px', fontSize: '2rem' }}
                                    >
                                        🗺️
                                    </div>
                                    <h2 className="fw-bold mb-2">Bienvenido</h2>
                                    <p className="text-muted">Inicia sesión en Sistema GEO</p>
                                </div>

                                {/* Formulario */}
                                <Form onSubmit={handleSubmit}>
                                    {/* Campo de Correo */}
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                📧
                                            </span>
                                            <Form.Control
                                                type="email"
                                                placeholder="tu@email.com"
                                                value={correo}
                                                onChange={(e) => setCorreo(e.target.value)}
                                                required
                                                className="py-2"
                                            />
                                        </div>
                                    </Form.Group>

                                    {/* Campo de Contraseña */}
                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-semibold">Contraseña</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                🔒
                                            </span>
                                            <Form.Control
                                                type="password"
                                                placeholder="••••••••"
                                                value={contrasena}
                                                onChange={(e) => setContrasena(e.target.value)}
                                                required
                                                className="py-2"
                                            />
                                        </div>
                                    </Form.Group>

                                    {/* Mensaje de error/éxito */}
                                    {mensaje && (
                                        <Alert variant={mensaje.startsWith('error') ? 'danger' : 'success'}>
                                            {mensaje}
                                        </Alert>
                                    )}

                                    {/* Botón de Submit */}
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-100 py-2 fw-semibold"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    className="me-2"
                                                />
                                                Iniciando sesión...
                                            </>
                                        ) : (
                                            <>
                                                🚀 Iniciar Sesión
                                            </>
                                        )}
                                    </Button>
                                </Form>

                                {/* Enlaces adicionales */}
                                <div className="text-center mt-4">
                                    <p className="text-muted small mb-2">
                                        ¿No tienes una cuenta?{' '}
                                        <Link to="/registro" className="text-primary fw-semibold text-decoration-none">
                                            Regístrate aquí
                                        </Link>
                                    </p>
                                    <a href="#" className="text-muted small text-decoration-none">
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Footer */}
                        <div className="text-center mt-4">
                            <p className="text-white small">© 2025 Sistema GEO - UNIMINUTO</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Login;