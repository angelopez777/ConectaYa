<?php
/**
 * PROYECTO: ConectaYa
 * ARCHIVO: backend/config/conexion.php
 * DESCRIPCIÓN: Conexión centralizada adaptada para el servidor InfinityFree.
 */

// Datos del servidor remoto (Sustituye 'TU_PASSWORD' y el nombre de la DB)
$host = "sql111.infinityfree.com"; // 👈 Mira tu panel, suele ser sqlXXX.epizy.com o ftpupload.net
$user = "if0_41587753";     // 👈 Tu usuario de MySQL que aparece en el panel
$pass = "angelopez30";  // 👈 La clave que usaste para el FTP (Secrets)
$db   = "if0_41587753_conectay"; // 👈 El nombre COMPLETO de la DB que creaste en el panel

$conexion = mysqli_connect($host, $user, $pass, $db);

if (!$conexion) {
    // Error detallado para depuración en el servidor
    die("Error de conexión a ConectaYa (Remoto): " . mysqli_connect_error());
}

// Forzar set de caracteres para evitar errores con tildes o Ñ
mysqli_set_charset($conexion, "utf8mb4");
?>