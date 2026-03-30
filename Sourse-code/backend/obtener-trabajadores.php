<?php
/**
 * PROYECTO: CONECTAYA
 * ARCHIVO: obtener-trabajadores.php
 */
require_once 'config/conexion.php';
header('Content-Type: application/json');

// Consulta para traer nombre, especialidad y calificación (RF02)
$sql = "SELECT u.nombre, t.especialidad, t.calificacion_promedio, u.foto_perfil 
        FROM trabajador t 
        JOIN usuario u ON t.id_usuario = u.id_usuario 
        ORDER BY t.calificacion_promedio DESC 
        LIMIT 6";

$result = mysqli_query($conexion, $sql);
$trabajadores = [];

while ($row = mysqli_fetch_assoc($result)) {
    // Si no tiene foto, usamos la default
    if (empty($row['foto_perfil'])) {
        $row['foto_perfil'] = 'default-cliente.png';
    }
    $trabajadores[] = $row;
}

echo json_encode($trabajadores);