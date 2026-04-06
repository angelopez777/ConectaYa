<?php
/**
 * PROYECTO: ConectaYa
 * ARCHIVO: backend/notificaciones/check-bienvenida.php
 * DESCRIPCIÓN: Genera notificación automática al entrar si no existe.
 */

// No cerramos la sesión aquí, asumimos que ya viene del dashboard
require_once(__DIR__ . '/../config/conexion.php');

if (isset($_SESSION['id_usuario'])) {
    $id_user = $_SESSION['id_usuario'];
    $nombre = $_SESSION['nombre'] ?? 'Usuario';

    // 1. Verificar si ya existe una notificación de bienvenida para este ID
    $check_sql = "SELECT id_notificacion FROM notificaciones WHERE id_usuario = ? AND titulo = '¡Bienvenido a ConectaYa!'";
    $stmt_check = mysqli_prepare($conexion, $check_sql);
    mysqli_stmt_bind_param($stmt_check, "i", $id_user);
    mysqli_stmt_execute($stmt_check);
    $resultado = mysqli_stmt_get_result($stmt_check);

    // 2. Si no existe, la creamos
    if (mysqli_num_rows($resultado) == 0) {
        $titulo = "¡Bienvenido a ConectaYa!";
        $msj = "Hola $nombre, estamos felices de tenerte aquí. Explora nuestros servicios y conecta con expertos.";
        
        $insert_sql = "INSERT INTO notificaciones (id_usuario, titulo, mensaje, leido) VALUES (?, ?, ?, 0)";
        $stmt_ins = mysqli_prepare($conexion, $insert_sql);
        mysqli_stmt_bind_param($stmt_ins, "iss", $id_user, $titulo, $msj);
        mysqli_stmt_execute($stmt_ins);
    }
}
?>