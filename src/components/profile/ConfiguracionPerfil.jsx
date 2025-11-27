
import React, { useState } from 'react';
import { Card, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { updateProfile, deleteAccount } from '../../services/user.service'; 
import { logout } from '../../services/auth.service';  

const ConfiguracionPerfil = ({ user, onUpdate }) => {
    const [form, setForm] = useState({
        nombre: user.nombre || '',
        correo: user.correo || '',
        contrasena: ''
    });
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensaje(null);

        try {
            const dataToUpdate = {
                nombre: form.nombre,
                correo: form.correo
            };
            if (form.contrasena.trim() !== '') {
                dataToUpdate.contrasena = form.contrasena;
            }

            await updateProfile(dataToUpdate);
            setMensaje({ type: 'success', text: ' Perfil actualizado correctamente' });
            onUpdate(); 
            setForm({ ...form, contrasena: '' }); 
        } catch (error) {
            console.error(error);
            setMensaje({ type: 'danger', text: ' Error al actualizar. Intenta de nuevo.' });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm(" ¿ESTÁS SEGURO?\n\nEsta acción eliminará tu cuenta permanentemente.")) {
            try {
                await deleteAccount();
                alert("Cuenta eliminada.");
                logout();
            } catch (error) {
                console.error(error);
                alert("Error: No se pudo eliminar la cuenta.");
            }
        }
    };

    return (
        <Card className="shadow-sm border-0 mb-5">
            <Card.Header className="bg-white py-3">
                <h5 className="mb-0 fw-bold text-primary">⚙️ Editar Datos</h5>
            </Card.Header>
            <Card.Body className="p-4">
                
                {mensaje && (
                    <Alert variant={mensaje.type} onClose={() => setMensaje(null)} dismissible>
                        {mensaje.text}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group>
                                <Form.Label className="fw-semibold">Nombre Completo</Form.Label>
                                <Form.Control type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
                            </Form.Group>
                        </Col>

                        <Col md={12} className="mb-3">
                            <Form.Group>
                                <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
                                <Form.Control type="email" name="correo" value={form.correo} onChange={handleChange} required />
                            </Form.Group>
                        </Col>

                        <Col md={12} className="mb-4">
                            <Form.Group>
                                <Form.Label className="fw-semibold">Nueva Contraseña</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    name="contrasena" 
                                    value={form.contrasena} 
                                    onChange={handleChange} 
                                    placeholder="Dejar vacío para no cambiar" 
                                />
                                <Form.Text className="text-muted">
                                    Mínimo 6 caracteres. Déjalo en blanco si no deseas cambiarla.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-grid">
                        <Button variant="success" type="submit" disabled={loading} className="py-2 fw-bold">
                            {loading ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                                    Guardando...
                                </>
                            ) : (
                                '💾 Guardar Cambios'
                            )}
                        </Button>
                    </div>
                </Form>

                <hr className="my-5" />

                <div className="rounded p-4 border border-danger bg-danger bg-opacity-10">
                    <h6 className="text-danger fw-bold mb-2">⚠️ Zona de Peligro</h6>
                    <p className="small text-muted mb-3">
                        Esta acción es <strong>irreversible</strong>. Se eliminarán todos tus datos permanentemente.
                    </p>
                    <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={handleDeleteAccount}
                        className="fw-semibold"
                    >
                        🗑️ Eliminar mi cuenta permanentemente
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ConfiguracionPerfil;