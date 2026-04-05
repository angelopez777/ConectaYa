<?php
/**
 * PROYECTO: ConectaYa
 * ARCHIVO: actualizar-perfil.php
 * REGLA DE ORO: Escritura desde cero. Sincronización total Usuario-Cliente-Pago.
 */

// Bloqueo de salida para JSON limpio
error_reporting(0);
ini_set('display_errors', 0);
ob_start();

header('Content-Type: application/json');

include_once '../config/conexion.php';
include_once '../config/session.php';

$res = ["success" => false, "message" => ""];

if (!isset($_SESSION['id_usuario'])) {
    $res["message"] = "Sesión no iniciada";
    ob_end_clean();
    echo json_encode($res);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];

// Captura de datos
$nombre    = $_POST['nombre'] ?? '';
$telefono  = $_POST['telefono'] ?? '';
$direccion = $_POST['direccion'] ?? '';

// Datos de pago
$metodo    = $_POST['tipo_metodo'] ?? '';
$proveedor = $_POST['proveedor'] ?? '';
$numero    = $_POST['numero_cuenta'] ?? '';
$titular   = $_POST['titular'] ?? '';

try {
    mysqli_begin_transaction($conexion);

    // 1. Actualizar tabla 'usuario'
    $stmt1 = $conexion->prepare("UPDATE usuario SET nombre = ?, telefono = ?, direccion = ? WHERE id_usuario = ?");
    $stmt1->bind_param("sssi", $nombre, $telefono, $direccion, $id_usuario);
    $stmt1->execute();

    // 2. Gestión de Foto
    if (isset($_FILES['foto']) && $_FILES['foto']['error'] === 0) {
        $ext = pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION);
        $nuevoNombre = "perfil_" . $id_usuario . "_" . time() . "." . $ext;
        $rutaDestino = "../../img/perfiles/" . $nuevoNombre;

        if (move_uploaded_file($_FILES['foto']['tmp_name'], $rutaDestino)) {
            $stmtFoto = $conexion->prepare("UPDATE usuario SET foto = ? WHERE id_usuario = ?");
            $stmtFoto->bind_param("si", $nuevoNombre, $id_usuario);
            $stmtFoto->execute();
        }
    }

    // 3. Sincronizar 'metodo_pago_usuario' Y 'cliente'
    if (!empty($metodo)) {
        // A. Actualizar/Insertar en metodo_pago_usuario (Detalle técnico)
        $check = $conexion->prepare("SELECT id_metodo FROM metodo_pago_usuario WHERE id_usuario = ?");
        $check->bind_param("i", $id_usuario);
        $check->execute();
        $existe = $check->get_result()->num_rows > 0;

        if ($existe) {
            $stmtPago = $conexion->prepare("UPDATE metodo_pago_usuario SET tipo_metodo=?, proveedor=?, numero_cuenta_enmascarado=?, titular=?, fecha_registro=NOW() WHERE id_usuario=?");
            $stmtPago->bind_param("ssssi", $metodo, $proveedor, $numero, $titular, $id_usuario);
        } else {
            $stmtPago = $conexion->prepare("INSERT INTO metodo_pago_usuario (id_usuario, tipo_metodo, proveedor, numero_cuenta_enmascarado, titular) VALUES (?, ?, ?, ?, ?)");
            $stmtPago->bind_param("issss", $id_usuario, $metodo, $proveedor, $numero, $titular);
        }
        $stmtPago->execute();

        // B. Actualizar 'metodo_pago_pref' en tabla CLIENTE (¡CRUCIAL PARA EL DASHBOARD!)
        // Buscamos el id_cliente asociado al id_usuario
        $stmtCliente = $conexion->prepare("UPDATE cliente SET metodo_pago_pref = ? WHERE id_usuario = ?");
        $stmtCliente->bind_param("si", $metodo, $id_usuario);
        $stmtCliente->execute();
    }

    mysqli_commit($conexion);
    $res["success"] = true;

} catch (Exception $e) {
    mysqli_rollback($conexion);
    $res["message"] = $e->getMessage();
}

// Limpiar buffer y enviar JSON puro
ob_end_clean();
echo json_encode($res);