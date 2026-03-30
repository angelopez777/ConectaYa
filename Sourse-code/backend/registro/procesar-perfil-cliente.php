<?php
session_start();
require_once '../config/conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_SESSION['user_email'];
    $direccion = mysqli_real_escape_string($conexion, $_POST['direccion']);
    
    // Procesar foto
    $foto_nombre = "default-cliente.png";
    if (isset($_FILES['foto']) && $_FILES['foto']['error'] === 0) {
        $foto_nombre = "cliente_" . time() . ".jpg";
        move_uploaded_file($_FILES['foto']['tmp_name'], "../../frontend/assets/perfiles/" . $foto_nombre);
    }

    $sql = "UPDATE usuario SET 
            direccion = '$direccion', 
            foto = '$foto_nombre', 
            estado_cuenta = 'Activo' 
            WHERE correo = '$email'";

    if (mysqli_query($conexion, $sql)) {
        header("Location: ../../frontend/html/metodo-pago.html");
    }
}
?>