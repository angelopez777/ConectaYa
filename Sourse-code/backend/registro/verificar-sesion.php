<?php
/**
 * PROYECTO: ConectaYa
 * ARCHIVO: backend/registro/verificar-sesion.php
 */
// Cabeceras para evitar que el navegador guarde la sesión vieja
header("Cache-Control: no-cache, must-revalidate"); 
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); 
header('Content-Type: application/json');

session_start();

if (isset($_SESSION['auth']) && $_SESSION['auth'] === true) {
    echo json_encode([
        'autenticado' => true,
        'nombre' => $_SESSION['nombre_usuario'],
        'rol' => $_SESSION['tipo_usuario']
    ]);
} else {
    echo json_encode(['autenticado' => false]);
}
exit();