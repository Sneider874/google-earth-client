
import React from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar } from 'react-bootstrap';

const Proyectos = () => {
    const proyectos = [
        {
            titulo: 'Monitoreo Río Combeima',
            descripcion: 'Análisis continuo de la calidad del agua y biodiversidad',
            progreso: 75,
            estado: 'En Progreso',
            estadoColor: 'primary',
            fecha: '2024-11 - 2025-03',
            responsable: 'Equipo Ambiental',
            icono: '🌊'
        },
        {
            titulo: 'Estudio de Erosión',
            descripcion: 'Evaluación del impacto erosivo en zonas montañosas',
            progreso: 100,
            estado: 'Completado',
            estadoColor: 'success',
            fecha: '2024-08 - 2024-12',
            responsable: 'Geología UNIMINUTO',
            icono: '⛰️'
        },
        {
            titulo: 'Calidad del Aire Urbano',
            descripcion: 'Medición de contaminantes atmosféricos en Ibagué',
            progreso: 45,
            estado: 'En Progreso',
            estadoColor: 'warning',
            fecha: '2025-01 - 2025-06',
            responsable: 'Equipo Atmosférico',
            icono: '💨'
        },
        {
            titulo: 'Conservación de Bosques',
            descripcion: 'Protección y monitoreo de áreas forestales',
            progreso: 30,
            estado: 'Iniciado',
            estadoColor: 'info',
            fecha: '2025-01 - 2025-12',
            responsable: 'Biología UNIMINUTO',
            icono: '🌳'
        }
    ];

    return (
        <>
            <style>
                {`
                    .hover-card {
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .hover-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
                    }
                `}
            </style>

            <div style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '4rem' }}>
                <Container fluid className="px-4">
                    {/* Header */}
                    <Row className="mb-4">
                        <Col>
                            <div className="p-4 rounded shadow-sm d-flex justify-content-between align-items-center" 
                                 style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                <div>
                                    <h1 className="display-6 fw-bold text-white mb-2">
                                        📁 Gestión de Proyectos
                                    </h1>
                                    <p className="mb-0 text-white" style={{ opacity: 0.85 }}>
                                        Administra y monitorea proyectos de investigación ambiental
                                    </p>
                                </div>
                                <Button variant="light" size="lg">
                                    <span className="me-2">➕</span> Nuevo Proyecto
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    {/* Estadísticas Rápidas */}
                    <Row className="g-3 mb-4">
                        <Col md={3}>
                            <Card className="border-0 shadow-sm bg-primary text-white">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h3 className="fw-bold mb-0">12</h3>
                                            <small>Total Proyectos</small>
                                        </div>
                                        <div style={{ fontSize: '2.5rem' }}>📂</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="border-0 shadow-sm bg-success text-white">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h3 className="fw-bold mb-0">5</h3>
                                            <small>Completados</small>
                                        </div>
                                        <div style={{ fontSize: '2.5rem' }}>✅</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="border-0 shadow-sm bg-warning text-white">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h3 className="fw-bold mb-0">6</h3>
                                            <small>En Progreso</small>
                                        </div>
                                        <div style={{ fontSize: '2.5rem' }}>⏳</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="border-0 shadow-sm bg-info text-white">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h3 className="fw-bold mb-0">1</h3>
                                            <small>Pendientes</small>
                                        </div>
                                        <div style={{ fontSize: '2.5rem' }}>⏸️</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Lista de Proyectos */}
                    <Row className="g-4">
                        {proyectos.map((proyecto, index) => (
                            <Col key={index} lg={6}>
                                <Card className="shadow-sm border-0 h-100 hover-card">
                                    <Card.Body className="p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div className="d-flex align-items-center">
                                                <div 
                                                    className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3"
                                                    style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}
                                                >
                                                    {proyecto.icono}
                                                </div>
                                                <div>
                                                    <h5 className="fw-bold mb-1">{proyecto.titulo}</h5>
                                                    <Badge bg={proyecto.estadoColor}>{proyecto.estado}</Badge>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-muted mb-3">{proyecto.descripcion}</p>

                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between mb-1">
                                                <small className="text-muted">Progreso</small>
                                                <small className="fw-bold">{proyecto.progreso}%</small>
                                            </div>
                                            <ProgressBar 
                                                now={proyecto.progreso} 
                                                variant={proyecto.estadoColor}
                                                style={{ height: '8px' }}
                                            />
                                        </div>

                                        <div className="border-top pt-3 mt-3">
                                            <Row className="small text-muted">
                                                <Col xs={6}>
                                                    <div className="mb-2">
                                                        <span className="me-2">📅</span>
                                                        {proyecto.fecha}
                                                    </div>
                                                </Col>
                                                <Col xs={6}>
                                                    <div className="mb-2">
                                                        <span className="me-2">👥</span>
                                                        {proyecto.responsable}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="d-flex gap-2 mt-3">
                                            <Button variant="outline-primary" size="sm" className="flex-grow-1">
                                                Ver Detalles
                                            </Button>
                                            <Button variant="outline-secondary" size="sm">
                                                📊 Reportes
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Proyectos;