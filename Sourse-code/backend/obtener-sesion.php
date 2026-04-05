<?php
/**
 * PROYECTO: ConectaYa
 * UBICACIÓN: /backend/obtener-sesion.php
 * REGLA: Código desde 0.
 */

session_start();
// Ajustamos la ruta al config ya que este archivo subió un nivel
include_once 'config/conexion.php';

header('Content-Type: application/json');
header("Cache-Control: no-cache, must-revalidate");

$response = ['success' => false, 'rol' => ''];

if (isset($_SESSION['id_usuario'])) {
    $id = $_SESSION['id_usuario'];
    
    $sql = "SELECT tipo_usuario FROM usuario WHERE id_usuario = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $res = $stmt->get_result();
    
    if ($fila = $res->fetch_assoc()) {
        $response['success'] = true;
        // Limpiamos espacios y pasamos a minúsculas para las rutas HTML
        $response['rol'] = strtolower(trim($fila['tipo_usuario']));
    }
    $stmt->close();
}

echo json_encode($response);
exit();