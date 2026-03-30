<?php
// Configuración de conexión local (XAMPP)
$host = "localhost";
$user = "root";
$pass = "";
$db   = "conectaya"; // Asegúrate de que este sea el nombre de tu base de datos

$conexion = mysqli_connect($host, $user, $pass, $db);

// Verificar si la conexión falló
if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

// Configurar caracteres para aceptar tildes y eñes
mysqli_set_charset($conexion, "utf8");
?>