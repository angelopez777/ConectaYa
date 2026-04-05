<?php
/**
 * PROYECTO: ConectaYa - Finalización de Registro
 */
include_once '../config/conexion.php';
include_once '../config/session-start.php';

header('Content-Type: application/json');

if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(['success' => false, 'message' => 'Sesión no iniciada']);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];

try {
    // 1. Activar cuenta en DB
    $conexion->query("UPDATE usuario SET estado_cuenta = 'Activo' WHERE id_usuario = $id_usuario");

    // 2. Obtener tipo_usuario para decidir el dashboard
    $res = $conexion->query("SELECT tipo_usuario FROM usuario WHERE id_usuario = $id_usuario");
    $user = $res->fetch_assoc();

    // 3. Definir ruta según el rol
    $ruta = ($user['tipo_usuario'] === 'Cliente') 
            ? 'dashboards/inicio-cliente.html' 
            : 'dashboards/inicio-trabajador.html';

    echo json_encode([
        'success' => true,
        'redirect' => $ruta
    ]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}