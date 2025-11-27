
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const HomePage = () => {
    return (
        <div className="py-5">
            <Container>
                {/* Hero Section */}
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-primary mb-3">
                        Bienvenido al Sistema GEO
                    </h1>
                    <p className="lead text-muted mb-4">
                        Sistema de Gestión y Análisis de Datos Geográficos para monitoreo ambiental
                    </p>
                </div>

                {/* Cards de Características */}
                <Row className="g-4">
                    <Col xs={12} md={6} lg={4}>
                        <Card className="h-100 shadow-sm border-0 hover-card">
                            <Card.Body className="text-center p-4">
                                <div 
                                    className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                    style={{ width: '80px', height: '80px' }}
                                >
                                    <span style={{ fontSize: '2.5rem' }}>🌊</span>
                                </div>
                                <Card.Title className="fw-bold">Monitoreo de Ríos</Card.Title>
                                <Card.Text className="text-muted">
                                    Seguimiento en tiempo real de los recursos hídricos y análisis de calidad del agua
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                        <Card className="h-100 shadow-sm border-0 hover-card">
                            <Card.Body className="text-center p-4">
                                <div 
                                    className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                    style={{ width: '80px', height: '80px' }}
                                >
                                    <span style={{ fontSize: '2.5rem' }}>📊</span>
                                </div>
                                <Card.Title className="fw-bold">Análisis de Datos</Card.Title>
                                <Card.Text className="text-muted">
                                    Procesamiento avanzado de información geográfica con herramientas especializadas
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                        <Card className="h-100 shadow-sm border-0 hover-card">
                            <Card.Body className="text-center p-4">
                                <div 
                                    className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                    style={{ width: '80px', height: '80px' }}
                                >
                                    <span style={{ fontSize: '2.5rem' }}>📈</span>
                                </div>
                                <Card.Title className="fw-bold">Reportes Detallados</Card.Title>
                                <Card.Text className="text-muted">
                                    Generación automática de informes técnicos y visualizaciones de datos
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Sección Adicional */}
                <Row className="mt-5">
                    <Col xs={12}>
                        <Card className="bg-light border-0 shadow-sm">
                            <Card.Body className="p-5">
                                <Row className="align-items-center">
                                    <Col md={8}>
                                        <h3 className="fw-bold mb-3">¿Listo para comenzar?</h3>
                                        <p className="text-muted mb-0">
                                            Accede a todas las herramientas de análisis geográfico y 
                                            monitoreo ambiental. Registra tu cuenta y comienza a gestionar 
                                            tus proyectos de forma eficiente.
                                        </p>
                                    </Col>
                                    <Col md={4} className="text-center text-md-end mt-3 mt-md-0">
                                        <span style={{ fontSize: '5rem' }}>🗺️</span>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* ESTILOS - sin jsx */}
            <style>{`
                .hover-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .hover-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
                }
            `}</style>
        </div>
    );
};

export default HomePage;
