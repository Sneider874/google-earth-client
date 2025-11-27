
import React, { useState, useEffect } from 'react';
import { Card, Badge, Form, Spinner } from 'react-bootstrap';
import { updatePrivacy, uploadAvatar } from '../../services/user.service';

const InfoPerfil = ({ user, onUpdate }) => {
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    
    useEffect(() => {
        console.log('👤 Usuario completo:', user);
        console.log('🖼️ imagenUrl:', user.imagenUrl);
        console.log('🌐 URL completa:', user.imagenUrl ? `http://localhost:3000${user.imagenUrl}` : 'No hay imagen');
    }, [user]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validar tamaño 
            if (file.size > 5 * 1024 * 1024) {
                alert(' La imagen no puede pesar más de 5MB');
                return;
            }

            // Validar tipo
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                alert(' Solo se permiten imágenes (JPG, PNG, GIF, WEBP)');
                return;
            }

            // Mostrar preview local inmediatamente
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
            setUploading(true);

            // Subir al servidor
            const formData = new FormData();
            formData.append('avatar', file);

            try {
                const response = await uploadAvatar(formData);
                console.log(' Avatar subido:', response);

                // Limpiar preview local
                setPreview(null);

                // Actualizar datos del usuario
                if (onUpdate) {
                    await onUpdate();
                }

                alert(' Imagen actualizada correctamente');
            } catch (error) {
                console.error(' Error al subir imagen:', error);
                alert(' Error al subir la imagen. Intenta de nuevo.');
                setPreview(null);
            } finally {
                setUploading(false);
            }
        }
    };

    const handlePrivacyToggle = async () => {
        try {
            await updatePrivacy(!user.isPublic);
            if (onUpdate) {
                await onUpdate();
            }
        } catch (error) {
            console.error(" Error cambiando privacidad:", error);
            alert(" Error al cambiar la privacidad. Revisa tu conexión.");
        }
    };

    // Construir URL de la imagen
    const imageUrl = preview || (user.imagenUrl 
        ? `http://localhost:3000${user.imagenUrl}` 
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nombre)}&background=random`
    );

    return (
        <Card className="shadow-sm border-0 mb-4 h-100">
            <Card.Body className="text-center p-4 d-flex flex-column align-items-center justify-content-center">

                {/* Avatar */}
                <div className="position-relative mb-3">
                    <div
                        className="rounded-circle overflow-hidden border border-4 border-white shadow"
                        style={{ width: '140px', height: '140px', backgroundColor: '#e9ecef' }}
                    >
                        <img
                            src={imageUrl}
                            alt="Perfil"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onLoad={() => console.log(' Imagen cargada:', imageUrl)}
                            onError={(e) => {
                                console.error(' Error al cargar imagen:', imageUrl);
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nombre)}&background=random`;
                            }}
                        />
                        {uploading && (
                            <div
                                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                            >
                                <Spinner animation="border" variant="light" />
                            </div>
                        )}
                    </div>
                    <Form.Label
                        className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                        style={{
                            width: '40px',
                            height: '40px',
                            cursor: uploading ? 'not-allowed' : 'pointer',
                            border: '2px solid white',
                            opacity: uploading ? 0.5 : 1
                        }}
                    >
                        📷
                        <Form.Control
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageChange}
                            disabled={uploading}
                        />
                    </Form.Label>
                </div>

                {/* Datos */}
                <h3 className="fw-bold mb-1">{user.nombre}</h3>
                <p className="text-muted mb-2">{user.correo}</p>

                <div className="mb-4">
                    <Badge bg={user.rol === 1 ? 'warning' : 'info'} text="dark" className="px-3 py-2 rounded-pill">
                        {user.rol === 1 ? '👑 Administrador' : '👤 Usuario Estándar'}
                    </Badge>
                </div>

                <hr className="w-100 opacity-25" />

                {/* Privacidad */}
                <div className="w-100 bg-light p-3 rounded d-flex justify-content-between align-items-center">
                    <div className="text-start">
                        <small className="text-muted d-block">Visibilidad</small>
                        <span className={`fw-bold ${user.isPublic ? 'text-success' : 'text-secondary'}`}>
                            {user.isPublic ? 'PÚBLICO' : 'PRIVADO'}
                        </span>
                    </div>
                    <Form.Check
                        type="switch"
                        id="privacy-switch"
                        checked={!!user.isPublic}
                        onChange={handlePrivacyToggle}
                        style={{ transform: 'scale(1.2)' }}
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default InfoPerfil;