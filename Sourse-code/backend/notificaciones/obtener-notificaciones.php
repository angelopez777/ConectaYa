<?php
/**
 * PROYECTO: ConectaYa
 * ARCHIVO: backend/notificaciones/obtener-notificaciones.php
 */

session_start();
header('Content-Type: application/json');

// Ajuste de ruta para tu nueva estructura de config
require_once('../config/conexion.php'); 

if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(["success" => false, "message" => "Sesión expirada"]);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];

$sql = "SELECT id_notificacion, titulo, mensaje, leido, fecha_creacion 
        FROM notificaciones 
        WHERE id_usuario = ? 
        ORDER BY fecha_creacion DESC";

try {
    $stmt = mysqli_prepare($conexion, $sql);
    mysqli_stmt_bind_param($stmt, "i", $id_usuario);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    $notificaciones = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $notificaciones[] = $row;
    }

    echo json_encode([
        "success" => true, 
        "notificaciones" => $notificaciones
    ]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error DB: " . $e->getMessage()]);
} finally {
    mysqli_close($conexion);
}
?>