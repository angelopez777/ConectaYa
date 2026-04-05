<?php
/**
 * PROYECTO: ConectaYa
 * RUTA: /backend/obtener-datos-dashboard.php
 */

// Rutas de configuración basadas en tu imagen de carpetas
include 'config/conexion.php'; 
include 'config/session.php'; 

header('Content-Type: application/json');

$response = [
    'nombre' => '',
    'solicitudes' => 0,
    'calificacion' => '0.0'
];

// El id_usuario viene de tu login-proceso.php
if (isset($_SESSION['id_usuario'])) {
    $id = $_SESSION['id_usuario'];

    // Consulta limpia a la tabla usuario de XAMPP
    $stmt = $conexion->prepare("SELECT nombre FROM usuario WHERE id_usuario = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $res = $stmt->get_result();
    
    if ($user = $res->fetch_assoc()) {
        // Obtenemos el nombre tal cual está en la base de datos
        $nombreCompleto = trim($user['nombre']);
        // Enviamos solo el primer nombre para el saludo
        $response['nombre'] = explode(' ', $nombreCompleto)[0];
    }
}

echo json_encode($response);