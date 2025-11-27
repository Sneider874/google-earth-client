import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../services/user.service';
import InfoPerfil from '../profile/InfoPerfil'; 

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

    if (loading) return <Container className="p-5 text-center"><Spinner animation="border" /></Container>;
    if (!user) return <Container className="p-5"><Alert variant="danger">Error al cargar perfil</Alert></Container>;

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <h2 className="mb-4 text-center fw-bold text-secondary">Mi Perfil</h2>
                    
                    {/* Tarjeta de Información */}
                    <InfoPerfil user={user} onUpdate={fetchData} />

                    {/* Navegación rápida */}
                    <div className="text-center mt-4">
                        <Button variant="outline-primary" onClick={() => navigate('/configuracion')}>
                            ⚙️ Editar Información
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default VistaPerfil;