
import React from 'react';
import { Container, Row, Col, Card, Button, Badge, Table } from 'react-bootstrap';

const Reportes = () => {
    const reportes = [
        { id: 'RPT-2025-001', titulo: 'Calidad del Agua - Q1 2025', tipo: 'Ambiental', fecha: '2025-01-15', estado: 'Disponible', color: 'success' },
        { id: 'RPT-2025-002', titulo: 'Monitoreo Atmosférico - Enero', tipo: 'Aire', fecha: '2025-01-10', estado: 'Disponible', color: 'success' },
        { id: 'RPT-2024-045', titulo: 'Análisis Anual 2024', tipo: 'General', fecha: '2024-12-31', estado: 'Disponible', color: 'success' },
        { id: 'RPT-2025-003', titulo: 'Erosión de Suelos - En Proceso', tipo: 'Geología', fecha: '2025-01-18', estado: 'En Proceso', color: 'warning' },
    ];

    return (
        <>
            <style>
                {`
                    .hover-card {
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .hover-card:hover {
                        transform: translateY(-3px);
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
                                 style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                <h1 className="display-6 fw-bold text-dark mb-2">
                                    📄 Centro de Reportes
                                </h1>
                                <p className="mb-0 text-dark" style={{ opacity: 0.75 }}>
                                    Genera, visualiza y exporta reportes técnicos de tus proyectos
                                </p>
                            </div>
                        </Col>
                    </Row>

                    {/* Tipos de Reportes */}
                    <Row className="g-3 mb-4">
                        {[
                            { titulo: 'Técnicos', icono: '📋', count: 24, color: 'primary' },
                            { titulo: 'Ejecutivos', icono: '💼', count: 12, color: 'success' },
                            { titulo: 'Estadísticos', icono: '📊', count: 18, color: 'info' },
                            { titulo: 'Personalizados', icono: '⚙️', count: 6, color: 'warning' }
                        ].map((item, idx) => (
                            <Col key={idx} md={3}>
                                <Card className={`border-0 shadow-sm bg-${item.color} bg-opacity-10 hover-card`}>
                                    <Card.Body className="text-center">
                                        <div style={{ fontSize: '2.5rem' }}>{item.icono}</div>
                                        <h3 className="fw-bold mt-2 mb-0">{item.count}</h3>
                                        <small className="text-muted">{item.titulo}</small>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <Row className="g-4">
                        {/* Tabla de Reportes */}
                        <Col lg={8}>
                            <Card className="shadow-sm border-0">
                                <Card.Header className="bg-white border-bottom d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0 fw-bold">📚 Reportes Disponibles</h5>
                                    <Button variant="primary" size="sm">
                                        <span className="me-2">➕</span> Generar Nuevo
                                    </Button>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    <Table hover responsive className="mb-0">
                                        <thead className="bg-light">
                                            <tr>
                                                <th>ID</th>
                                                <th>Título</th>
                                                <th>Tipo</th>
                                                <th>Fecha</th>
                                                <th>Estado</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportes.map((reporte, idx) => (
                                                <tr key={idx}>
                                                    <td className="text-muted small">{reporte.id}</td>
                                                    <td className="fw-semibold">{reporte.titulo}</td>
                                                    <td>
                                                        <Badge bg="secondary" className="bg-opacity-10 text-dark">
                                                            {reporte.tipo}
                                                        </Badge>
                                                    </td>
                                                    <td className="text-muted small">{reporte.fecha}</td>
                                                    <td>
                                                        <Badge bg={reporte.color}>{reporte.estado}</Badge>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex gap-1">
                                                            <Button variant="outline-primary" size="sm">👁️</Button>
                                                            <Button variant="outline-success" size="sm">📥</Button>
                                                            <Button variant="outline-secondary" size="sm">🖨️</Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Panel Lateral */}
                        <Col lg={4}>
                            <Card className="shadow-sm border-0 mb-3">
                                <Card.Header className="bg-white border-bottom">
                                    <h5 className="mb-0 fw-bold">🚀 Acciones Rápidas</h5>
                                </Card.Header>
                                <Card.Body>
                                    <div className="d-grid gap-2">
                                        <Button variant="primary">
                                            📝 Crear Reporte Manual
                                        </Button>
                                        <Button variant="outline-primary">
                                            🤖 Generar Automático
                                        </Button>
                                        <Button variant="outline-secondary">
                                            📤 Exportar Todo (PDF)
                                        </Button>
                                        <Button variant="outline-secondary">
                                            📧 Enviar por Email
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card className="shadow-sm border-0">
                                <Card.Header className="bg-white border-bottom">
                                    <h5 className="mb-0 fw-bold">📌 Formatos</h5>
                                </Card.Header>
                                <Card.Body>
                                    <div className="d-flex flex-column gap-2">
                                        {['PDF', 'Excel', 'Word', 'CSV'].map((format, idx) => (
                                            <div key={idx} className="d-flex justify-content-between align-items-center p-2 bg-light rounded">
                                                <span className="fw-semibold">{format}</span>
                                                <Badge bg="primary">Disponible</Badge>
                                            </div>
                                        ))}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Reportes;