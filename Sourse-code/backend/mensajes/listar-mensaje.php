<?php
/**
 * PROYECTO: ConectaYa
 * REGLA DE ORO: Escritura desde cero.
 * FUNCIONALIDAD: Listar historial de mensajes por solicitud.
 */
header('Content-Type: application/json');
include_once '../config/conexion.php';
include_once '../config/session.php';

if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(['success' => false, 'message' => 'Sesión no iniciada']);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];
$id_solicitud = $_GET['id_solicitud'] ?? 0;

try {
    // Consulta que trae los mensajes y el nombre del emisor
    $query = "SELECT m.*, u.nombre AS emisor_nombre 
              FROM mensajes m 
              JOIN usuario u ON m.id_emisor = u.id_usuario 
              WHERE m.id_solicitud = ? 
              ORDER BY m.fecha_envio ASC";
    
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("i", $id_solicitud);
    $stmt->execute();
    $resultado = $stmt->get_result();
    
    $mensajes = [];
    while ($fila = $resultado->fetch_assoc()) {
        $fila['es_mio'] = ($fila['id_emisor'] == $id_usuario);
        $mensajes[] = $fila;
    }

    echo json_encode(['success' => true, 'mensajes' => $mensajes]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}