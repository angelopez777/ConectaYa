<?php
/**
 * PROYECTO: ConectaYa
 * ARCHIVO: backend/obtener-contratos.php
 * DESCRIPCIÓN: Recupera servicios programados vinculando tablas de usuario y trabajador.
 */

session_start();
require_once 'config/conexion.php';

header('Content-Type: application/json');

// Verificar sesión activa
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(['error' => 'Sesión no iniciada']);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];

// Consulta SQL para traer datos del servicio, nombre del trabajador y su foto
$query = "SELECT 
            sp.id_servicio, 
            t.profesion AS servicio, 
            u.nombre AS profesional, 
            u.foto AS profesional_img, 
            sp.fecha_encuentro AS fecha, 
            sp.estado_servicio AS estado
          FROM servicios_programados sp
          JOIN solicitudes_contacto sc ON sp.id_solicitud = sc.id_solicitud
          JOIN trabajador t ON sc.id_trabajador = t.id_trabajador
          JOIN usuario u ON t.id_usuario = u.id_usuario
          WHERE sc.id_cliente = (SELECT id_cliente FROM cliente WHERE id_usuario = ?)
          ORDER BY sp.fecha_encuentro DESC";

$stmt = mysqli_prepare($conexion, $query);
mysqli_stmt_bind_param($stmt, "i", $id_usuario);
mysqli_stmt_execute($stmt);
$resultado = mysqli_stmt_get_result($stmt);

$contratos = [];
while ($fila = mysqli_fetch_assoc($resultado)) {
    // Formatear fecha para el frontend
    $fecha_formateada = date("d M, Y", strtotime($fila['fecha']));
    
    $contratos[] = [
        'id' => 'CY-' . $fila['id_servicio'],
        'servicio' => $fila['servicio'],
        'profesional' => $fila['profesional'],
        'profesional_img' => '../../../assets/img/perfiles/' . $fila['profesional_img'],
        'fecha' => $fecha_formateada,
        'monto' => 'Ver acuerdo', // El monto se puede añadir a la tabla servicios_programados si lo deseas
        'estado' => $fila['estado']
    ];
}

echo json_encode($contratos);
?>