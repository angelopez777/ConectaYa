<?php
/**
 * PROYECTO: ConectaYa
 * ARCHIVO: backend/config/conexion.php
 * DESCRIPCIÓN: Conexión híbrida (Localhost / Remoto) con detección automática.
 */

// Detectar si estamos en el servidor local o en el hosting
$is_localhost = ($_SERVER['REMOTE_ADDR'] === '127.0.0.1' || $_SERVER['REMOTE_ADDR'] === '::1');

if ($is_localhost) {
    // Configuración para pruebas en tu PC (XAMPP)
    $host = "localhost";
    $user = "root";
    $pass = "";
    $db   = "conectaya";
} else {
    // Configuración para producción en InfinityFree
    $host = "sql111.infinityfree.com";
    $user = "if0_41587753";
    $pass = "angelopez30";
    $db   = "if0_41587753_conectay";
}

// Intentar establecer la conexión
$conexion = mysqli_connect($host, $user, $pass, $db);

// Verificación de seguridad
if (!$conexion) {
    $ambiente = $is_localhost ? "Local" : "Remoto";
    die("Error de conexión a ConectaYa ($ambiente): " . mysqli_connect_error());
}

// Forzar set de caracteres para evitar errores con tildes o Ñ
mysqli_set_charset($conexion, "utf8mb4");

?>