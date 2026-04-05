<?php
/**
 * PROYECTO: ConectaYa
 * ARCHIVO: backend/registro/procesar-pago.php
 */

include_once '../config/conexion.php';
include_once '../config/session-start.php';

header('Content-Type: application/json');

// Verificación de sesión
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(['success' => false, 'message' => 'Sesión no encontrada.']);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];

// Captura de datos desde el POST (Asegúrate que los 'name' en el HTML coincidan)
$tipo_metodo = $_POST['metodo_pago'] ?? null; 
$proveedor   = $_POST['banco_entidad'] ?? null;
$numero      = $_POST['numero_cuenta'] ?? null;
$titular     = $_POST['titular'] ?? null;

// Validación básica
if (empty($tipo_metodo) || empty($numero) || empty($titular)) {
    echo json_encode(['success' => false, 'message' => 'Por favor completa todos los campos obligatorios.']);
    exit;
}

try {
    $conexion->begin_transaction();

    // 1. Guardar en la tabla de métodos de pago
    $sqlDetalle = "INSERT INTO metodo_pago_usuario 
                  (id_usuario, tipo_metodo, proveedor, numero_cuenta_enmascarado, titular) 
                  VALUES (?, ?, ?, ?, ?)";
    $stmt1 = $conexion->prepare($sqlDetalle);
    $stmt1->bind_param("issss", $id_usuario, $tipo_metodo, $proveedor, $numero, $titular);
    $stmt1->execute();

    // 2. Sincronizar preferencia en la tabla cliente
    // ¡IMPORTANTE!: Debes haber ejecutado el ALTER TABLE primero.
    $sqlCliente = "UPDATE cliente SET metodo_pago_pref = ? WHERE id_usuario = ?";
    $stmt2 = $conexion->prepare($sqlCliente);
    $stmt2->bind_param("si", $tipo_metodo, $id_usuario);
    $stmt2->execute();

    $conexion->commit();

    echo json_encode([
        'success' => true, 
        'message' => '¡Método de pago guardado con éxito!',
        'redirect' => 'terminos.html'
    ]);

} catch (Exception $e) {
    $conexion->rollback();
    // Este mensaje te dirá exactamente qué columna falta si el SQL falla
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
} finally {
    if (isset($stmt1)) $stmt1->close();
    if (isset($stmt2)) $stmt2->close();
}