
import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';

const Resultados = () => {
    const resultados = [
        {
            id: 'RES-2025-001',
            titulo: 'Análisis de Calidad del Agua - Río Combeima',
            fecha: '2025-01-18',
            categoria: 'Hídrico',
            estado: 'Completado',
            estadoColor: 'success',
            conclusion: 'Los niveles de calidad del agua se encuentran dentro de los parámetros aceptables',
            parametros: { ph: 7.2, temperatura: 18, turbidez: 'Baja' },
            icono: '💧'
        },
        {
            id: 'RES-2025-002',
            titulo: 'Estudio de Erosión del Suelo - Zona Rural',
            fecha: '2025-01-15',
            categoria: 'Suelo',
            estado: 'Completado',
            estadoColor: 'success',
            conclusion: 'Se detectó erosión moderada en laderas. Se recomienda implementar barreras vegetales',
            parametros: { severidad: 'Media', area: '45 Ha', tipo: 'Laminar' },
            icono: '⛰️'
        },
        {
            id: 'RES-2025-003',
            titulo: 'Monitoreo Atmosférico - Centro Urbano',
            fecha: '2025-01-12',
            categoria: 'Aire',
            estado: 'En Revisión',
            estadoColor: 'warning',
            conclusion: 'Niveles de PM2.5 ligeramente elevados en horas pico',
            parametros: { pm25: '35 µg/m³', pm10: '48 µg/m³', co2: 'Normal' },
            icono: '💨'
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
                                 style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}>
                                <div>
                                    <h1 className="display-6 fw-bold text-white mb-2">
                                        ✅ Resultados y Conclusiones
                                    </h1>
                                    <p className="mb-0 text-white" style={{ opacity: 0.85 }}>
                                        Hallazgos y determinaciones de estudios ambientales
                                    </p>
                                </div>
                                <Button variant="light" size="lg">
                                    📥 Exportar Todo
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    {/* Resumen */}
                    <Row className="g-3 mb-4">
                        {[
                            { titulo: 'Completados', valor: 45, icono: '✅', color: 'success' },
                            { titulo: 'En Revisión', valor: 8, icono: '🔍', color: 'warning' },
                            { titulo: 'Pendientes', valor: 3, icono: '⏳', color: 'info' },
                            { titulo: 'Total', valor: 56, icono: '📊', color: 'primary' }
                        ].map((item, idx) => (
                            <Col key={idx} md={3}>
                                <Card className={`border-0 shadow-sm bg-${item.color} bg-opacity-10`}>
                                    <Card.Body className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h3 className="fw-bold mb-0">{item.valor}</h3>
                                            <small className="text-muted">{item.titulo}</small>
                                        </div>
                                        <div style={{ fontSize: '2.5rem' }}>{item.icono}</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Resultados Detallados */}
                    <Row className="g-4">
                        {resultados.map((resultado, index) => (
                            <Col key={index} lg={12}>
                                <Card className="shadow-sm border-0 hover-card">
                                    <Card.Body className="p-4">
                                        <Row>
                                            <Col md={9}>
                                                {/* Header del Resultado */}
                                                <div className="d-flex align-items-start mb-3">
                                                    <div 
                                                        className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3"
                                                        style={{ width: '60px', height: '60px', fontSize: '2rem', flexShrink: 0 }}
                                                    >
                                                        {resultado.icono}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                                            <div>
                                                                <h5 className="fw-bold mb-1">{resultado.titulo}</h5>
                                                                <div className="d-flex gap-2 align-items-center flex-wrap">
                                                                    <Badge bg="secondary">{resultado.id}</Badge>
                                                                    <Badge bg="info">{resultado.categoria}</Badge>
                                                                    <Badge bg={resultado.estadoColor}>{resultado.estado}</Badge>
                                                                    <small className="text-muted">📅 {resultado.fecha}</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Conclusión */}
                                                        <div className="bg-light rounded p-3 mb-3">
                                                            <h6 className="fw-bold mb-2">📝 Conclusión Principal</h6>
                                                            <p className="mb-0 text-muted">{resultado.conclusion}</p>
                                                        </div>

                                                        {/* Parámetros Medidos */}
                                                        <div>
                                                            <h6 className="fw-bold mb-2">📊 Parámetros Medidos</h6>
                                                            <div className="d-flex flex-wrap gap-2">
                                                                {Object.entries(resultado.parametros).map(([key, value], idx) => (
                                                                    <div key={idx} className="border rounded px-3 py-2">
                                                                        <small className="text-muted d-block text-capitalize">{key}</small>
                                                                        <span className="fw-semibold">{value}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col md={3} className="d-flex flex-column justify-content-center border-start">
                                                <div className="d-grid gap-2">
                                                    <Button variant="primary" size="sm">
                                                        📄 Ver Completo
                                                    </Button>
                                                    <Button variant="outline-success" size="sm">
                                                        📥 Descargar PDF
                                                    </Button>
                                                    <Button variant="outline-secondary" size="sm">
                                                        📊 Ver Gráficos
                                                    </Button>
                                                    <Button variant="outline-info" size="sm">
                                                        📧 Compartir
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Sección de Recomendaciones */}
                    <Row className="g-4 mt-1">
                        <Col lg={12}>
                            <Card className="shadow-sm border-0 bg-light">
                                <Card.Body className="p-4">
                                    <h5 className="fw-bold mb-3">💡 Recomendaciones Generales</h5>
                                    <Row>
                                        <Col md={4}>
                                            <div className="d-flex align-items-start mb-3">
                                                <div className="text-primary me-2" style={{ fontSize: '1.5rem' }}>🌱</div>
                                                <div>
                                                    <h6 className="fw-semibold mb-1">Conservación</h6>
                                                    <small className="text-muted">Implementar programas de reforestación en zonas críticas</small>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="d-flex align-items-start mb-3">
                                                <div className="text-success me-2" style={{ fontSize: '1.5rem' }}>♻️</div>
                                                <div>
                                                    <h6 className="fw-semibold mb-1">Sostenibilidad</h6>
                                                    <small className="text-muted">Promover prácticas ambientales sostenibles</small>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="d-flex align-items-start mb-3">
                                                <div className="text-warning me-2" style={{ fontSize: '1.5rem' }}>⚠️</div>
                                                <div>
                                                    <h6 className="fw-semibold mb-1">Monitoreo</h6>
                                                    <small className="text-muted">Aumentar frecuencia de mediciones en áreas de riesgo</small>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Resultados;