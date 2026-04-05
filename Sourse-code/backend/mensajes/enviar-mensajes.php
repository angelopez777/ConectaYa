<?php
/**
 * PROYECTO: ConectaYa
 * REGLA DE ORO: Escritura desde cero.
 */
header('Content-Type: application/json');
include_once '../config/conexion.php';
include_once '../config/session.php';

if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(['success' => false, 'message' => 'Sesión no iniciada']);
    exit;
}

$id_emisor = $_SESSION['id_usuario'];
$id_solicitud = $_POST['id_solicitud'] ?? 0;
$contenido = $_POST['contenido'] ?? '';

if (empty($contenido)) {
    echo json_encode(['success' => false, 'message' => 'El mensaje está vacío']);
    exit;
}

try {
    $query = "INSERT INTO mensajes (id_solicitud, id_emisor, contenido) VALUES (?, ?, ?)";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("iis", $id_solicitud, $id_emisor, $contenido);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        throw new Exception("Error al insertar mensaje");
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}