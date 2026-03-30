<?php
session_start();
require_once '../config/conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = mysqli_real_escape_string($conexion, $_POST['nombre']);
    $correo = mysqli_real_escape_string($conexion, $_POST['correo']);
    $telefono = mysqli_real_escape_string($conexion, $_POST['telefono']);
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    $check_email = mysqli_query($conexion, "SELECT id_usuario FROM usuario WHERE correo = '$correo'");
    
    if (mysqli_num_rows($check_email) > 0) {
        header("Location: ../../frontend/html/registro.html?error=email_existe");
        exit();
    }

    $sql = "INSERT INTO usuario (nombre, correo, telefono, password, estado_cuenta) 
            VALUES ('$nombre', '$correo', '$telefono', '$password', 'Pendiente')";

    if (mysqli_query($conexion, $sql)) {
        $_SESSION['user_email'] = $correo;
        header("Location: ../../frontend/html/registro-paso2.html");
    } else {
        echo "Error: " . mysqli_error($conexion);
    }
}
?>