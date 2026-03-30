<?php
/* ============================================================
   PROYECTO: ConectaYa
   ARCHIVO: backend/registro/procesar-paso2.php
   OBJETIVO: Recibir el rol del Paso 2 y actualizar al usuario
   ============================================================ */

session_start();

// Conexión a la base de datos (Ruta validada según tu estructura)
require_once '../config/conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    /* CAPTURAR EL ROL:
       Cambiado a 'rol' para coincidir exactamente con el <input name="rol"> 
       del archivo registro-paso2.html 
    */
    $rol = $_POST['rol']; 
    $email = $_SESSION['user_email'];

    /* ACTUALIZACIÓN:
       Se ejecuta el UPDATE usando el correo guardado en la sesión.
    */
    $query = "UPDATE usuario SET tipo_usuario = '$rol' WHERE correo = '$email'";
    mysqli_query($conexion, $query);

    /* LÓGICA DE REDIRECCIÓN:
       Las rutas apuntan a la carpeta 'frontend/html/'.
       Se usa exit() para detener la ejecución tras el redireccionamiento.
    */
    if ($rol == 'trabajador') {
        header("Location: ../../frontend/html/perfil-trabajador.html");
        exit();
    } elseif ($rol == 'empresa') {
        header("Location: ../../frontend/html/perfil-empresa.html");
        exit();
    } else {
        // Por defecto o si es 'cliente'
        header("Location: ../../frontend/html/perfil-cliente.html");
        exit();
    }
}
?>