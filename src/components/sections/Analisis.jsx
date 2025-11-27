import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, Form, Alert, Spinner, Table } from 'react-bootstrap';
import analysisApi from '../../services/analysisApi'; // ✅ Ruta corregida desde sections/ hacia services/

const Analisis = () => {
    const [analisis, setAnalisis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentAnalisis, setCurrentAnalisis] = useState(null);
    const [formData, setFormData] = useState({
        id_proyecto: '',
        nombre_analisis: '',
        tipo: 'Espacial',
        descripcion: '',
        estado: 'Pendiente'
    });
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

    // Cargar análisis al montar el componente
    useEffect(() => {
        loadAnalisis();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Función para cargar todos los análisis
    const loadAnalisis = async () => {
        try {
            setLoading(true);
            const data = await analysisApi.getAll();
            setAnalisis(data);
        } catch (err) {
            showAlert('Error al cargar los análisis', 'danger');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Mostrar alerta
    const showAlert = (message, variant) => {
        setAlert({ show: true, message, variant });
        setTimeout(() => setAlert({ show: false, message: '', variant: '' }), 3000);
    };

    // Abrir modal para crear
    const handleCreate = () => {
        setCurrentAnalisis(null);
        setFormData({
            id_proyecto: '',
            nombre_analisis: '',
            tipo: 'Espacial',
            descripcion: '',
            estado: 'Pendiente'
        });
        setShowModal(true);
    };

    // Abrir modal para editar
    const handleEdit = (item) => {
        setCurrentAnalisis(item);
        setFormData({
            id_proyecto: item.id_proyecto || '',
            nombre_analisis: item.nombre_analisis,
            tipo: item.tipo || 'Espacial',
            descripcion: item.descripcion || '',
            estado: item.estado || 'Pendiente'
        });
        setShowModal(true);
    };

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Guardar análisis (crear o actualizar)
    const handleSave = async () => {
        try {
            if (currentAnalisis) {
                await analysisApi.update(currentAnalisis.id, formData);
                showAlert('Análisis actualizado exitosamente', 'success');
            } else {
                await analysisApi.create(formData);
                showAlert('Análisis creado exitosamente', 'success');
            }
            setShowModal(false);
            loadAnalisis();
        } catch (err) {
            console.error('Error al guardar:', err);
            showAlert('Error al guardar el análisis', 'danger');
        }
    };

    // Confirmar eliminación
    const confirmDelete = (item) => {
        setCurrentAnalisis(item);
        setShowDeleteModal(true);
    };

    // Eliminar análisis
    const handleDelete = async () => {
        try {
            await analysisApi.delete(currentAnalisis.id);
            showAlert('Análisis eliminado exitosamente', 'success');
            setShowDeleteModal(false);
            loadAnalisis();
        } catch (err) {
            console.error('Error al eliminar:', err);
            showAlert('Error al eliminar el análisis', 'danger');
        }
    };

    // Ejecutar análisis
    const handleRun = async (id) => {
        try {
            await analysisApi.run(id);
            showAlert('Análisis ejecutado exitosamente', 'success');
            loadAnalisis();
        } catch (err) {
            console.error('Error al ejecutar:', err);
            showAlert('Error al ejecutar el análisis', 'danger');
        }
    };

    // Obtener color del badge según estado
    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'Completado': return 'success';
            case 'En Proceso': return 'warning';
            case 'Fallido': return 'danger';
            default: return 'secondary';
        }
    };

    // Formatear fecha
    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('es-CO');
    };

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
                    {/* Alertas */}
                    {alert.show && (
                        <Alert variant={alert.variant} dismissible onClose={() => setAlert({ show: false })}>
                            {alert.message}
                        </Alert>
                    )}

                    {/* Header */}
                    <Row className="mb-4">
                        <Col>
                            <div className="p-4 rounded shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                <h1 className="display-6 fw-bold text-white mb-2">
                                    📈 Análisis de Datos Geográficos
                                </h1>
                                <p className="mb-0 text-white" style={{ opacity: 0.85 }}>
                                    Herramientas avanzadas para el procesamiento y análisis de información geoespacial
                                </p>
                            </div>
                        </Col>
                    </Row>

                    {/* Herramientas de Análisis */}
                    <Row className="g-4 mb-4">
                        <Col md={6} lg={3}>
                            <Card className="shadow-sm border-0 h-100 hover-card">
                                <Card.Body className="text-center p-4">
                                    <div 
                                        className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                        style={{ width: '80px', height: '80px', fontSize: '2.5rem' }}
                                    >
                                        🗺️
                                    </div>
                                    <h5 className="fw-bold mb-2">Análisis Espacial</h5>
                                    <p className="text-muted small mb-3">
                                        Evaluación de patrones y relaciones geográficas
                                    </p>
                                    <Button variant="outline-primary" size="sm" onClick={handleCreate}>Nuevo Análisis</Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={3}>
                            <Card className="shadow-sm border-0 h-100 hover-card">
                                <Card.Body className="text-center p-4">
                                    <div 
                                        className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                        style={{ width: '80px', height: '80px', fontSize: '2.5rem' }}
                                    >
                                        🌡️
                                    </div>
                                    <h5 className="fw-bold mb-2">Datos Ambientales</h5>
                                    <p className="text-muted small mb-3">
                                        Monitoreo de variables climáticas y ambientales
                                    </p>
                                    <Badge bg="success">{analisis.filter(a => a.tipo === 'Ambiental').length}</Badge>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={3}>
                            <Card className="shadow-sm border-0 h-100 hover-card">
                                <Card.Body className="text-center p-4">
                                    <div 
                                        className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                        style={{ width: '80px', height: '80px', fontSize: '2.5rem' }}
                                    >
                                        📊
                                    </div>
                                    <h5 className="fw-bold mb-2">Estadísticas</h5>
                                    <p className="text-muted small mb-3">
                                        Análisis estadístico de datos recopilados
                                    </p>
                                    <Badge bg="warning" text="dark">{analisis.filter(a => a.tipo === 'Estadístico').length}</Badge>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={3}>
                            <Card className="shadow-sm border-0 h-100 hover-card">
                                <Card.Body className="text-center p-4">
                                    <div 
                                        className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                        style={{ width: '80px', height: '80px', fontSize: '2.5rem' }}
                                    >
                                        🔍
                                    </div>
                                    <h5 className="fw-bold mb-2">Predicciones</h5>
                                    <p className="text-muted small mb-3">
                                        Modelos predictivos y proyecciones
                                    </p>
                                    <Badge bg="info">{analisis.filter(a => a.tipo === 'Predicción').length}</Badge>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Tabla de Análisis */}
                    <Row className="g-4">
                        <Col lg={12}>
                            <Card className="shadow-sm border-0">
                                <Card.Header className="bg-white border-bottom d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0 fw-bold">📋 Lista de Análisis</h5>
                                    <Button variant="primary" size="sm" onClick={handleCreate}>
                                        <span className="me-2">➕</span> Nuevo Análisis
                                    </Button>
                                </Card.Header>
                                <Card.Body>
                                    {loading ? (
                                        <div className="text-center py-5">
                                            <Spinner animation="border" variant="primary" />
                                            <p className="mt-3 text-muted">Cargando análisis...</p>
                                        </div>
                                    ) : analisis.length === 0 ? (
                                        <div className="text-center py-5">
                                            <p className="text-muted">No hay análisis registrados</p>
                                            <Button variant="primary" onClick={handleCreate}>Crear el primero</Button>
                                        </div>
                                    ) : (
                                        <Table responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>Tipo</th>
                                                    <th>Fecha</th>
                                                    <th>Estado</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {analisis.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td className="fw-semibold">{item.nombre_analisis}</td>
                                                        <td>{item.tipo || 'N/A'}</td>
                                                        <td>{formatDate(item.fecha_creacion)}</td>
                                                        <td>
                                                            <Badge bg={getEstadoColor(item.estado)}>
                                                                {item.estado || 'Pendiente'}
                                                            </Badge>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                variant="outline-primary"
                                                                size="sm"
                                                                className="me-2"
                                                                onClick={() => handleEdit(item)}
                                                            >
                                                                ✏️
                                                            </Button>
                                                            <Button
                                                                variant="outline-success"
                                                                size="sm"
                                                                className="me-2"
                                                                onClick={() => handleRun(item.id)}
                                                                disabled={item.estado === 'En Proceso'}
                                                            >
                                                                ▶️
                                                            </Button>
                                                            <Button
                                                                variant="outline-danger"
                                                                size="sm"
                                                                onClick={() => confirmDelete(item)}
                                                            >
                                                                🗑️
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Modal para Crear/Editar */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentAnalisis ? '✏️ Editar Análisis' : '➕ Nuevo Análisis'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>ID Proyecto</Form.Label>
                            <Form.Control
                                type="number"
                                name="id_proyecto"
                                value={formData.id_proyecto}
                                onChange={handleChange}
                                placeholder="Ingrese el ID del proyecto"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Análisis *</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre_analisis"
                                value={formData.nombre_analisis}
                                onChange={handleChange}
                                placeholder="Ej: Calidad del Agua - Río Combeima"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tipo de Análisis *</Form.Label>
                            <Form.Select
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleChange}
                                required
                            >
                                <option value="Espacial">Espacial</option>
                                <option value="Ambiental">Ambiental</option>
                                <option value="Estadístico">Estadístico</option>
                                <option value="Predicción">Predicción</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                placeholder="Describe el análisis..."
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Estado *</Form.Label>
                            <Form.Select
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                                required
                            >
                                <option value="Pendiente">Pendiente</option>
                                <option value="En Proceso">En Proceso</option>
                                <option value="Completado">Completado</option>
                                <option value="Fallido">Fallido</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        {currentAnalisis ? 'Actualizar' : 'Crear'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de Confirmación de Eliminación */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>⚠️ Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar el análisis <strong>{currentAnalisis?.nombre_analisis}</strong>?
                    <br />
                    <small className="text-danger">Esta acción no se puede deshacer.</small>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Analisis;