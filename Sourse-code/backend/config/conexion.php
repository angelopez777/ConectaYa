<?php
/**
 * PROYECTO: ConectaYa
 * ARCHIVO: backend/config/conexion.php
 * DESCRIPCIÓN: Conexión centralizada a la base de datos XAMPP.
 */

$host = "localhost";
$user = "root";
$pass = "";
$db   = "conectaya";

$conexion = mysqli_connect($host, $user, $pass, $db);

if (!$conexion) {
    die("Error de conexión a ConectaYa: " . mysqli_connect_error());
}

// Forzar set de caracteres para evitar errores con tildes o Ñ
mysqli_set_charset($conexion, "utf8mb4");
?>