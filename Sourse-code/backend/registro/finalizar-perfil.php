<?php
/**
 * FINALIZAR REGISTRO DE CLIENTE
 * Actualiza dirección y foto en la tabla 'usuario'
 */
session_start();
require_once '../config/conexion.php';

// Verificamos sesión activa del usuario que se está registrando
if (!isset($_SESSION['user_email'])) {
    header("Location: ../../frontend/html/registro.html");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_SESSION['user_email'];
    $direccion = mysqli_real_escape_string($conexion, $_POST['direccion']);
    
    // Manejo básico de la foto
    $nombre_foto = "default.png";
    if (isset($_FILES['foto']) && $_FILES['foto']['error'] == 0) {
        $nombre_foto = time() . "_" . $_FILES['foto']['name'];
        move_uploaded_file($_FILES['foto']['tmp_name'], "../../frontend/assets/perfiles/" . $nombre_foto);
    }

    // Actualizamos los campos en la base de datos
    $sql = "UPDATE usuario SET 
            direccion = '$direccion', 
            foto = '$nombre_foto',
            estado_cuenta = 'Activo' 
            WHERE correo = '$email'";

    if (mysqli_query($conexion, $sql)) {
        echo "<script>
                alert('¡Registro completado con éxito!');
                window.location.href = '../../frontend/html/login.html';
              </script>";
    } else {
        echo "Error al actualizar: " . mysqli_error($conexion);
    }
}
?>