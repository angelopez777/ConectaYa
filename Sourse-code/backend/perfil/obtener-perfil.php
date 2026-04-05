<?php
/**
 * PROYECTO: ConectaYa
 * ARCHIVO: obtener-perfil.php
 * REGLA DE ORO: Reescribir desde 0. Sincronización con metodo_pago_usuario.
 */

// Evitar que cualquier error de PHP rompa el JSON
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json');

include_once '../config/conexion.php';
include_once '../config/session.php';

if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(['success' => false, 'message' => 'Sesión no iniciada']);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];

try {
    // Consulta que une Usuario con sus detalles de Pago reales
    $query = "SELECT 
                u.nombre, u.correo, u.telefono, u.foto, u.direccion, 
                m.tipo_metodo, m.proveedor, m.numero_cuenta_enmascarado 
              FROM usuario u 
              LEFT JOIN metodo_pago_usuario m ON u.id_usuario = m.id_usuario 
              WHERE u.id_usuario = ?";
    
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("i", $id_usuario);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $datos = $resultado->fetch_assoc();

    if ($datos) {
        echo json_encode([
            'success' => true,
            'nombre' => $datos['nombre'],
            'correo' => $datos['correo'],
            'telefono' => $datos['telefono'] ?? 'No registrado',
            'direccion' => $datos['direccion'] ?? 'Sin dirección',
            'foto' => $datos['foto'] ?? 'default.png',
            'tipo_metodo' => $datos['tipo_metodo'] ?? 'No especificado',
            'proveedor' => $datos['proveedor'] ?? '',
            'numero_cuenta_enmascarado' => $datos['numero_cuenta_enmascarado'] ?? ''
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Datos no encontrados']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}