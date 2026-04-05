<?php
header('Content-Type: application/json');
include_once '../config/conexion.php';
include_once '../config/session-start.php';

if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(['success' => false, 'message' => 'Sesión no iniciada']);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];

// Captura de datos
$profesion      = $_POST['profesion'] ?? '';
$experiencia    = $_POST['experiencia_anios'] ?? '';
$descripcion    = $_POST['descripcion_perfil'] ?? '';
$disponibilidad = $_POST['disponibilidad'] ?? 'No definida';

if (empty($profesion) || empty($descripcion)) {
    echo json_encode(['success' => false, 'message' => 'Faltan campos obligatorios']);
    exit;
}

try {
    $sql = "INSERT INTO trabajador (id_usuario, profesion, experiencia_anios, descripcion_perfil, disponibilidad) 
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
            profesion = VALUES(profesion), 
            experiencia_anios = VALUES(experiencia_anios), 
            descripcion_perfil = VALUES(descripcion_perfil), 
            disponibilidad = VALUES(disponibilidad)";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("issss", $id_usuario, $profesion, $experiencia, $descripcion, $disponibilidad);

    if ($stmt->execute()) {
        echo json_encode([
            'success' => true, 
            'message' => 'Perfil guardado', 
            'redirect' => 'metodo-pago.html'
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error DB: ' . $conexion->error]);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Fallo: ' . $e->getMessage()]);
}