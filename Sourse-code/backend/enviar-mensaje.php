<?php
/**
 * PROYECTO: ConectaYa
 * RUTA: /backend/enviar-mensaje.php
 * REGLA: Código limpio, validación de sesión y respuesta JSON.
 */

include 'config/conexion.php';
include 'config/session.php';

header('Content-Type: application/json');

$response = ['status' => 'error', 'message' => 'Error desconocido'];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['id_usuario'])) {
    $id_solicitud = $_POST['id_solicitud'];
    $emisor = $_SESSION['id_usuario'];
    $contenido = trim($_POST['contenido']);

    if (!empty($contenido)) {
        try {
            $stmt = $conexion->prepare("INSERT INTO mensajes (id_solicitud, id_emisor, contenido) VALUES (?, ?, ?)");
            $stmt->bind_param("iis", $id_solicitud, $emisor, $contenido);
            
            if ($stmt->execute()) {
                $response = ['status' => 'success', 'message' => 'Mensaje enviado'];
                
                // Actualizamos el estado de la solicitud a 'En_Chat' si estaba en 'Pendiente'
                $update = $conexion->prepare("UPDATE solicitudes_contacto SET estado_contacto = 'En_Chat' WHERE id_solicitud = ? AND estado_contacto = 'Pendiente'");
                $update->bind_param("i", $id_solicitud);
                $update->execute();
            }
        } catch (Exception $e) {
            $response['message'] = $e->getMessage();
        }
    }
}

echo json_encode($response);