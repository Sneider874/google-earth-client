
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../services/user.service'; 
import ConfiguracionPerfil from './ConfiguracionPerfil';  

const VistaConfiguracion = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const data = await getProfile();
            setUser(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return (
        <Container className="p-5 text-center" style={{ minHeight: '70vh' }}>
            <Spinner animation="border" />
        </Container>
    );
    
    if (!user) return (
        <Container className="p-5" style={{ minHeight: '70vh' }}>
            <Alert variant="danger">Error al cargar datos</Alert>
        </Container>
    );

    return (
        <div style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '6rem' }}>
            <Container className="py-4">
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                            <h2 className="fw-bold text-secondary m-0">⚙️ Configuración</h2>
                            <Button 
                                variant="outline-secondary" 
                                size="sm"
                                onClick={() => navigate('/perfil')}
                            >
                                👤 Volver al Perfil
                            </Button>
                        </div>
                        
                        {/* Formulario de Configuración */}
                        <ConfiguracionPerfil user={user} onUpdate={fetchData} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default VistaConfiguracion;