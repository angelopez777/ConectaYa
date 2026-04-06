<?php
/**
 * PROYECTO: ConectaYa
 * ARCHIVO: backend/notificaciones/check-bienvenida.php
 * DESCRIPCIÓN: Valida y crea la notificación de bienvenida si no existe.
 */

// Aseguramos la conexión usando la ruta absoluta basada en este directorio
require_once __DIR__ . '/../config/conexion.php';

// Verificamos que exista una sesión y que la conexión a la BD esté abierta
if (isset($_SESSION['id_usuario']) && $conexion) {
    
    $id_user = $_SESSION['id_usuario'];
    $nombre_user = $_SESSION['nombre'] ?? 'Usuario';
    $titulo_bienvenida = "¡Bienvenido a ConectaYa!";

    // 1. Buscamos si ya existe esta notificación específica para el usuario
    $sql_check = "SELECT id_notificacion FROM notificaciones WHERE id_usuario = ? AND titulo = ?";
    $stmt_check = mysqli_prepare($conexion, $sql_check);
    
    if ($stmt_check) {
        mysqli_stmt_bind_param($stmt_check, "is", $id_user, $titulo_bienvenida);
        mysqli_stmt_execute($stmt_check);
        $res_check = mysqli_stmt_get_result($stmt_check);

        // 2. Si no hay registros (mysqli_num_rows == 0), procedemos a insertar
        if (mysqli_num_rows($res_check) === 0) {
            $mensaje = "Hola $nombre_user, estamos felices de tenerte aquí. Explora nuestros servicios y conecta con expertos.";
            
            $sql_ins = "INSERT INTO notificaciones (id_usuario, titulo, mensaje, leido) VALUES (?, ?, ?, 0)";
            $stmt_ins = mysqli_prepare($conexion, $sql_ins);
            
            if ($stmt_ins) {
                mysqli_stmt_bind_param($stmt_ins, "iss", $id_user, $titulo_bienvenida, $mensaje);
                mysqli_stmt_execute($stmt_ins);
                mysqli_stmt_close($stmt_ins);
            }
        }
        mysqli_stmt_close($stmt_check);
    }
}
?>