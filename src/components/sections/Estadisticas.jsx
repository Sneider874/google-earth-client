
import React from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';

const Estadisticas = () => {
    return (
        <>
            <div style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '4rem' }}>
                <Container fluid className="px-4">
                    {/* Header */}
                    <Row className="mb-4">
                        <Col>
                            <div className="p-4 rounded shadow-sm" 
                                 style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                                <h1 className="display-6 fw-bold text-white mb-2">
                                    📊 Estadísticas y Métricas
                                </h1>
                                <p className="mb-0 text-white" style={{ opacity: 0.85 }}>
                                    Análisis cuantitativo de datos ambientales y geográficos
                                </p>
                            </div>
                        </Col>
                    </Row>

                    {/* Métricas Principales */}
                    <Row className="g-4 mb-4">
                        <Col md={6} lg={3}>
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Body className="text-center p-4">
                                    <div className="text-primary" style={{ fontSize: '3rem' }}>📈</div>
                                    <h2 className="fw-bold mt-3 mb-1">2,456</h2>
                                    <p className="text-muted mb-0">Muestras Analizadas</p>
                                    <small className="text-success">+12% vs mes anterior</small>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={3}>
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Body className="text-center p-4">
                                    <div className="text-success" style={{ fontSize: '3rem' }}>🌡️</div>
                                    <h2 className="fw-bold mt-3 mb-1">18.5°C</h2>
                                    <p className="text-muted mb-0">Temperatura Promedio</p>
                                    <small className="text-info">Dentro del rango normal</small>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={3}>
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Body className="text-center p-4">
                                    <div className="text-info" style={{ fontSize: '3rem' }}>💧</div>
                                    <h2 className="fw-bold mt-3 mb-1">87%</h2>
                                    <p className="text-muted mb-0">Calidad Hídrica</p>
                                    <small className="text-success">Nivel Óptimo</small>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={3}>
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Body className="text-center p-4">
                                    <div className="text-warning" style={{ fontSize: '3rem' }}>⚡</div>
                                    <h2 className="fw-bold mt-3 mb-1">156</h2>
                                    <p className="text-muted mb-0">Eventos Registrados</p>
                                    <small className="text-warning">-5% vs mes anterior</small>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="g-4">
                        {/* Gráfico de Tendencias */}
                        <Col lg={8}>
                            <Card className="shadow-sm border-0 h-100">
                                <Card.Header className="bg-white border-bottom">
                                    <h5 className="mb-0 fw-bold">📉 Tendencias Mensuales</h5>
                                </Card.Header>
                                <Card.Body style={{ height: '400px' }}>
                                    <div 
                                        className="h-100 d-flex align-items-center justify-content-center"
                                        style={{ 
                                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                                            borderRadius: '10px'
                                        }}
                                    >
                                        <div className="text-center">
                                            <div style={{ fontSize: '5rem' }}>📊</div>
                                            <h4 className="text-muted mt-3">Gráfico Interactivo</h4>
                                            <p className="text-muted">Visualización de datos temporales</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Indicadores por Categoría */}
                        <Col lg={4}>
                            <Card className="shadow-sm border-0 h-100">
                                <Card.Header className="bg-white border-bottom">
                                    <h5 className="mb-0 fw-bold">🎯 Indicadores Clave</h5>
                                </Card.Header>
                                <Card.Body>
                                    {[
                                        { nombre: 'Calidad del Aire', valor: 92, color: 'success' },
                                        { nombre: 'Contaminación Sonora', valor: 68, color: 'warning' },
                                        { nombre: 'Biodiversidad', valor: 85, color: 'info' },
                                        { nombre: 'Cobertura Vegetal', valor: 78, color: 'success' },
                                        { nombre: 'Nivel de Erosión', valor: 45, color: 'danger' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="mb-4">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="fw-semibold small">{item.nombre}</span>
                                                <span className="text-muted small">{item.valor}%</span>
                                            </div>
                                            <ProgressBar 
                                                now={item.valor} 
                                                variant={item.color}
                                                style={{ height: '8px' }}
                                            />
                                        </div>
                                    ))}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Comparativas */}
                    <Row className="g-4 mt-1">
                        <Col md={4}>
                            <Card className="border-0 shadow-sm">
                                <Card.Body className="text-center p-4">
                                    <h6 className="text-muted mb-3">Datos por Trimestre</h6>
                                    <div className="d-flex justify-content-around">
                                        <div>
                                            <div className="text-primary fw-bold" style={{ fontSize: '2rem' }}>Q1</div>
                                            <small className="text-muted">2,134</small>
                                        </div>
                                        <div>
                                            <div className="text-success fw-bold" style={{ fontSize: '2rem' }}>Q2</div>
                                            <small className="text-muted">2,456</small>
                                        </div>
                                        <div>
                                            <div className="text-info fw-bold" style={{ fontSize: '2rem' }}>Q3</div>
                                            <small className="text-muted">2,189</small>
                                        </div>
                                        <div>
                                            <div className="text-warning fw-bold" style={{ fontSize: '2rem' }}>Q4</div>
                                            <small className="text-muted">2,567</small>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="border-0 shadow-sm">
                                <Card.Body className="text-center p-4">
                                    <h6 className="text-muted mb-3">Promedio Anual</h6>
                                    <h1 className="fw-bold text-primary mb-2">85.3%</h1>
                                    <p className="text-success mb-0">
                                        <span className="fw-bold">↑ 3.2%</span> respecto al año anterior
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="border-0 shadow-sm">
                                <Card.Body className="text-center p-4">
                                    <h6 className="text-muted mb-3">Proyección 2025</h6>
                                    <h1 className="fw-bold text-success mb-2">91.7%</h1>
                                    <p className="text-info mb-0">
                                        Estimado basado en tendencias actuales
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Estadisticas;