
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/auth.service';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');

        // Validar que las contraseñas coincidan
        if (contrasena !== confirmarContrasena) {
            setMensaje(' Las contraseñas no coinciden');
            return;
        }

        // Validar longitud mínima de contraseña
        if (contrasena.length < 6) {
            setMensaje(' La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);

        try {
            await register(nombre, correo, contrasena);
            setMensaje(' Registro exitoso. Redirigiendo al login...');
            
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            
        } catch (error) {
            setLoading(false);
            const msg = error.response?.data?.message || 'Error al registrar usuario';
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
                                        className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle mb-3"
                                        style={{ width: '70px', height: '70px', fontSize: '2rem' }}
                                    >
                                        🗺️
                                    </div>
                                    <h2 className="fw-bold mb-2">Crear Cuenta</h2>
                                    <p className="text-muted">Únete a Sistema GEO</p>
                                </div>

                                {/* Formulario */}
                                <Form onSubmit={handleSubmit}>
                                    {/* Campo de Nombre */}
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Nombre Completo</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                👤
                                            </span>
                                            <Form.Control
                                                type="text"
                                                placeholder="Juan Pérez"
                                                value={nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                                required
                                                className="py-2"
                                            />
                                        </div>
                                    </Form.Group>

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
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Contraseña</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                🔒
                                            </span>
                                            <Form.Control
                                                type="password"
                                                placeholder="Mínimo 6 caracteres"
                                                value={contrasena}
                                                onChange={(e) => setContrasena(e.target.value)}
                                                required
                                                minLength={6}
                                                className="py-2"
                                            />
                                        </div>
                                    </Form.Group>

                                    {/* Campo de Confirmar Contraseña */}
                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-semibold">Confirmar Contraseña</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                🔒
                                            </span>
                                            <Form.Control
                                                type="password"
                                                placeholder="Repite tu contraseña"
                                                value={confirmarContrasena}
                                                onChange={(e) => setConfirmarContrasena(e.target.value)}
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
                                        variant="success"
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
                                                Registrando...
                                            </>
                                        ) : (
                                            <>
                                                ✨ Crear Cuenta
                                            </>
                                        )}
                                    </Button>
                                </Form>

                                {/* Enlace a Login */}
                                <div className="text-center mt-4">
                                    <p className="text-muted small">
                                        ¿Ya tienes una cuenta?{' '}
                                        <Link to="/login" className="text-success fw-semibold text-decoration-none">
                                            Inicia sesión aquí
                                        </Link>
                                    </p>
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

export default Registro;