<?php
/**
 * ACTUALIZAR ROL DEL USUARIO
 * Este archivo recibe el rol y lo guarda en la base de datos 'conectaya'
 */

session_start();
require_once '../config/conexion.php'; // Ruta según tu estructura

// Verificamos que el usuario venga de completar el paso 1 (tener el correo en sesión)
if (!isset($_SESSION['user_email'])) {
    header("Location: ../../frontend/html/registro.html");
    exit();
}

if (isset($_GET['rol'])) {
    $rol = mysqli_real_escape_string($conexion, $_GET['rol']);
    $email = $_SESSION['user_email'];

    // Actualizamos el campo 'tipo_usuario' en la tabla 'usuario'
    $query = "UPDATE usuario SET tipo_usuario = '$rol' WHERE correo = '$email'";

    if (mysqli_query($conexion, $query)) {
        // Según el rol, podrías redirigir a un perfil específico o al dashboard
        echo "<script>
                alert('Rol seleccionado: " . $rol . "');
                window.location.href = '../../frontend/html/login.html'; 
              </script>";
    } else {
        echo "Error al actualizar el rol: " . mysqli_error($conexion);
    }
}
?>