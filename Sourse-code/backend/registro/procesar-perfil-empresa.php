<?php
session_start();
require_once '../config/conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_SESSION['user_email'];
    $razon = mysqli_real_escape_string($conexion, $_POST['razon_social']);
    $nit = mysqli_real_escape_string($conexion, $_POST['nit']);
    $sector = mysqli_real_escape_string($conexion, $_POST['sector']);
    $direccion = mysqli_real_escape_string($conexion, $_POST['direccion']);

    // Obtener ID
    $res = mysqli_query($conexion, "SELECT id_usuario FROM usuario WHERE correo = '$email'");
    $user = mysqli_fetch_assoc($res);
    $id_u = $user['id_usuario'];

    // Actualizar usuario
    mysqli_query($conexion, "UPDATE usuario SET direccion = '$direccion', tipo_usuario = 'Empresa' WHERE id_usuario = '$id_u'");

    // Insertar en empresa (Asegúrate que los nombres coincidan con tu DB)
    $sql = "INSERT INTO empresa (id_usuario, nit, razon_social, sector) 
            VALUES ('$id_u', '$nit', '$razon', '$sector')";

    if (mysqli_query($conexion, $sql)) {
        header("Location: ../../frontend/html/metodo-pago.html");
    } else {
        echo "Error en la base de datos: " . mysqli_error($conexion);
    }
}
?>