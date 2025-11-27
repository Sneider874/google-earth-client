
import React from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';

const Rios = () => {
    const rios = [
        {
            nombre: 'Río Combeima',
            caudal: 125,
            calidad: 85,
            calidadLabel: 'Buena',
            calidadColor: 'success',
            temperatura: 18,
            ph: 7.2,
            ubicacion: 'Norte Ibagué',
            estado: 'Monitoreado',
            estaciones: 4
        },
        {
            nombre: 'Río Coello',
            caudal: 230,
            calidad: 72,
            calidadLabel: 'Moderada',
            calidadColor: 'warning',
            temperatura: 22,
            ph: 7.5,
            ubicacion: 'Sur Tolima',
            estado: 'Monitoreado',
            estaciones: 3
        },
        {
            nombre: 'Río Totare',
            caudal: 85,
            calidad: 90,
            calidadLabel: 'Excelente',
            calidadColor: 'success',
            temperatura: 16,
            ph: 7.1,
            ubicacion: 'Este Ibagué',
            estado: 'Monitoreado',
            estaciones: 2
        },
        {
            nombre: 'Río Chipalo',
            caudal: 45,
            calidad: 55,
            calidadLabel: 'Regular',
            calidadColor: 'danger',
            temperatura: 20,
            ph: 6.8,
            ubicacion: 'Centro',
            estado: 'Alerta',
            estaciones: 2
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
                            <div className="p-4 rounded shadow-sm" 
                                 style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                                <h1 className="display-6 fw-bold text-white mb-2">
                                    🌊 Monitoreo de Ríos
                                </h1>
                                <p className="mb-0 text-white" style={{ opacity: 0.85 }}>
                                    Sistema de vigilancia de recursos hídricos y calidad del agua
                                </p>
                            </div>
                        </Col>
                    </Row>

                    {/* Resumen General */}
                    <Row className="g-3 mb-4">
                        <Col md={3}>
                            <Card className="border-0 shadow-sm bg-primary text-white h-100">
                                <Card.Body className="text-center">
                                    <div style={{ fontSize: '3rem' }}>🌊</div>
                                    <h3 className="fw-bold mt-2 mb-0">8</h3>
                                    <small>Ríos Monitoreados</small>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="border-0 shadow-sm bg-success text-white h-100">
                                <Card.Body className="text-center">
                                    <div style={{ fontSize: '3rem' }}>📍</div>
                                    <h3 className="fw-bold mt-2 mb-0">15</h3>
                                    <small>Estaciones Activas</small>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="border-0 shadow-sm bg-info text-white h-100">
                                <Card.Body className="text-center">
                                    <div style={{ fontSize: '3rem' }}>💧</div>
                                    <h3 className="fw-bold mt-2 mb-0">92%</h3>
                                    <small>Calidad Promedio</small>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="border-0 shadow-sm bg-warning text-white h-100">
                                <Card.Body className="text-center">
                                    <div style={{ fontSize: '3rem' }}>⚠️</div>
                                    <h3 className="fw-bold mt-2 mb-0">1</h3>
                                    <small>Alertas Activas</small>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Tarjetas de Ríos */}
                    <Row className="g-4">
                        {rios.map((rio, index) => (
                            <Col key={index} lg={6}>
                                <Card className="shadow-sm border-0 h-100 hover-card">
                                    <Card.Body className="p-4">
                                        {/* Encabezado */}
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h4 className="fw-bold mb-2">{rio.nombre}</h4>
                                                <div className="d-flex gap-2">
                                                    <Badge bg={rio.calidadColor}>{rio.calidadLabel}</Badge>
                                                    <Badge bg="secondary">{rio.estado}</Badge>
                                                </div>
                                            </div>
                                            <div style={{ fontSize: '3rem' }}>🌊</div>
                                        </div>

                                        {/* Calidad del Agua */}
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="fw-semibold">Calidad del Agua</span>
                                                <span className="text-muted">{rio.calidad}%</span>
                                            </div>
                                            <ProgressBar 
                                                now={rio.calidad} 
                                                variant={rio.calidadColor}
                                                style={{ height: '10px' }}
                                            />
                                        </div>

                                        {/* Información Detallada */}
                                        <Row className="g-3 mb-3">
                                            <Col xs={6}>
                                                <div className="bg-light rounded p-3">
                                                    <small className="text-muted d-block">Caudal</small>
                                                    <div className="fw-bold">{rio.caudal} m³/s</div>
                                                </div>
                                            </Col>
                                            <Col xs={6}>
                                                <div className="bg-light rounded p-3">
                                                    <small className="text-muted d-block">Temperatura</small>
                                                    <div className="fw-bold">{rio.temperatura}°C</div>
                                                </div>
                                            </Col>
                                            <Col xs={6}>
                                                <div className="bg-light rounded p-3">
                                                    <small className="text-muted d-block">pH</small>
                                                    <div className="fw-bold">{rio.ph}</div>
                                                </div>
                                            </Col>
                                            <Col xs={6}>
                                                <div className="bg-light rounded p-3">
                                                    <small className="text-muted d-block">Estaciones</small>
                                                    <div className="fw-bold">{rio.estaciones}</div>
                                                </div>
                                            </Col>
                                        </Row>

                                        {/* Footer */}
                                        <div className="border-top pt-3 d-flex justify-content-between align-items-center">
                                            <div className="text-muted small">
                                                📍 {rio.ubicacion}
                                            </div>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-sm btn-outline-primary">
                                                    📊 Datos
                                                </button>
                                                <button className="btn btn-sm btn-outline-secondary">
                                                    🗺️ Ver Mapa
                                                </button>
                                            </div>
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

export default Rios;