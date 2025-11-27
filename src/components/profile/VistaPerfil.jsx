
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../services/user.service';
import InfoPerfil from './InfoPerfil';

const VistaPerfil = () => {
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
            <Alert variant="danger">Error al cargar perfil</Alert>
        </Container>
    );

    return (
        <div style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '6rem' }}>
            <Container className="py-4">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <h2 className="mb-4 text-center fw-bold text-secondary">Mi Perfil</h2>
                        
                        {/* Renderizamos solo la tarjeta de información */}
                        <InfoPerfil user={user} onUpdate={fetchData} />

                        {/* Botón para ir rápido a configuración */}
                        <div className="text-center mt-4 mb-5">
                            <Button variant="outline-primary" onClick={() => navigate('/configuracion')}>
                                ⚙️ Ir a Configuración de Cuenta
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default VistaPerfil;