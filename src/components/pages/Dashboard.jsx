
import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { getCurrentUser } from '../../services/auth.service';

const Dashboard = () => {
    const user = getCurrentUser();

    //  Protección 
    if (!user) {
        return (
            <div className="p-5 text-center">
                <div className="alert alert-danger">
                    Error de sesión: No se encontró el token de usuario.
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
            <Container fluid className="py-4 px-4">
                {/* Header de Bienvenida */}
                <Row className="mb-4">
                    <Col>
                        <div className="bg-primary text-white p-4 rounded shadow-sm">
                            <h1 className="display-6 fw-bold mb-2">
                                👋 Bienvenido, {user.name}
                            </h1>
                            <p className="mb-0 opacity-75">
                                Sistema de Gestión y Análisis Geográfico - Monitoreo en tiempo real
                            </p>
                        </div>
                    </Col>
                </Row>

                {/* Contenido Principal: Mapa + Info */}
                <Row className="g-4 mb-4">
                    {/* MAPA PRINCIPAL - Izquierda */}
                    <Col lg={8}>
                        <Card className="shadow-sm h-100 border-0">
                            <Card.Header className="bg-white border-bottom">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0 fw-bold">🗺️ Mapa Geográfico Interactivo</h5>
                                    <Badge bg="success" className="px-3">En vivo</Badge>
                                </div>
                            </Card.Header>
                            <Card.Body className="p-0" style={{ height: '500px' }}>
                                {/* Imagen de mapa temporal */}
                                <div 
                                    style={{ 
                                        width: '100%', 
                                        height: '100%',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                    
                                    <div className="text-center text-white">
                                        <div style={{ fontSize: '100px', marginBottom: '20px' }}>🌍</div>
                                        <h3 className="fw-bold">Mapa de Monitoreo Ambiental</h3>
                                        <p className="opacity-75">Región: Ibagué, Tolima - Colombia</p>
                                        <div className="mt-4">
                                            <Badge bg="light" text="dark" className="me-2 px-3 py-2">📍 8 Puntos Activos</Badge>
                                            <Badge bg="light" text="dark" className="px-3 py-2">🌊 5 Ríos Monitoreados</Badge>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* INFORMACIÓN Y ANÁLISIS - Derecha */}
                    <Col lg={4}>
                        <Card className="shadow-sm border-0 h-100">
                            <Card.Header className="bg-white border-bottom">
                                <h5 className="mb-0 fw-bold">📊 Análisis y Diagnóstico</h5>
                            </Card.Header>
                            <Card.Body>
                                <div className="mb-4">
                                    <h6 className="fw-bold text-primary mb-3">Descripción del Proyecto</h6>
                                    <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                                        quis nostrud exercitation ullamco laboris. Duis aute irure dolor in reprehenderit 
                                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    </p>
                                </div>

                                <hr className="my-4" />

                                {/* Indicadores Clave */}
                                <div className="mb-4">
                                    <h6 className="fw-bold text-primary mb-3">📈 Indicadores Clave</h6>
                                    <div className="bg-light rounded p-3 mb-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="fw-semibold">Calidad del Agua</span>
                                            <Badge bg="success">Buena</Badge>
                                        </div>
                                        <div className="progress mt-2" style={{ height: '8px' }}>
                                            <div className="progress-bar bg-success" style={{ width: '85%' }}></div>
                                        </div>
                                    </div>

                                    <div className="bg-light rounded p-3 mb-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="fw-semibold">Nivel de Caudal</span>
                                            <Badge bg="warning" text="dark">Medio</Badge>
                                        </div>
                                        <div className="progress mt-2" style={{ height: '8px' }}>
                                            <div className="progress-bar bg-warning" style={{ width: '60%' }}></div>
                                        </div>
                                    </div>

                                    <div className="bg-light rounded p-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="fw-semibold">Contaminación</span>
                                            <Badge bg="info">Bajo</Badge>
                                        </div>
                                        <div className="progress mt-2" style={{ height: '8px' }}>
                                            <div className="progress-bar bg-info" style={{ width: '30%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Sección de Esquema/Diagrama */}
                <Row className="g-4">
                    <Col lg={12}>
                        <Card className="shadow-sm border-0">
                            <Card.Header className="bg-white border-bottom">
                                <h5 className="mb-0 fw-bold">🔍 Esquema de Determinación y Flujo de Trabajo</h5>
                            </Card.Header>
                            <Card.Body className="p-4">
                                <Row className="text-center g-3">
                                    {/* Paso 1 */}
                                    <Col md={3}>
                                        <div className="border rounded p-3 h-100 bg-light">
                                            <div 
                                                className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                                style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}
                                            >
                                                1️⃣
                                            </div>
                                            <h6 className="fw-bold">Recolección</h6>
                                            <p className="small text-muted mb-0">
                                                Captura de datos geográficos y muestras ambientales
                                            </p>
                                        </div>
                                    </Col>

                                    {/* Flecha */}
                                    <Col md={1} className="d-flex align-items-center justify-content-center">
                                        <span style={{ fontSize: '2rem', color: '#6c757d' }}>→</span>
                                    </Col>

                                    {/* Paso 2 */}
                                    <Col md={3}>
                                        <div className="border rounded p-3 h-100 bg-light">
                                            <div 
                                                className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                                style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}
                                            >
                                                2️⃣
                                            </div>
                                            <h6 className="fw-bold">Análisis</h6>
                                            <p className="small text-muted mb-0">
                                                Procesamiento y evaluación de la información
                                            </p>
                                        </div>
                                    </Col>

                                    {/* Flecha */}
                                    <Col md={1} className="d-flex align-items-center justify-content-center">
                                        <span style={{ fontSize: '2rem', color: '#6c757d' }}>→</span>
                                    </Col>

                                    {/* Paso 3 */}
                                    <Col md={3}>
                                        <div className="border rounded p-3 h-100 bg-light">
                                            <div 
                                                className="bg-warning text-dark rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                                style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}
                                            >
                                                3️⃣
                                            </div>
                                            <h6 className="fw-bold">Determinación</h6>
                                            <p className="small text-muted mb-0">
                                                Conclusiones y recomendaciones técnicas
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="mt-4 text-center">
                                    <p className="text-muted small mb-0">
                                        <strong>Nota:</strong> El proceso completo toma aproximadamente 24-48 horas desde la recolección hasta la generación de reportes.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;