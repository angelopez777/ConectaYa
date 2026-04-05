<?php
session_start();
include_once '../config/conexion.php';

header('Content-Type: application/json');
$response = ['success' => false, 'message' => ''];

if (!isset($_SESSION['id_usuario'])) {
    $response['message'] = "Sesión no válida";
    echo json_encode($response);
    exit();
}

$id_usuario = $_SESSION['id_usuario'];
$tipo_usuario = $_POST['tipo_usuario'] ?? '';

if ($tipo_usuario === 'cliente' || $tipo_usuario === 'trabajador') {
    $tipo_final = ucfirst($tipo_usuario); // Cliente o Trabajador

    $sql = "UPDATE usuario SET tipo_usuario = ? WHERE id_usuario = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("si", $tipo_final, $id_usuario);

    if ($stmt->execute()) {
        $response['success'] = true;
    } else {
        $response['message'] = "Error al actualizar en DB";
    }
    $stmt->close();
} else {
    $response['message'] = "Rol no permitido";
}

echo json_encode($response);
exit();