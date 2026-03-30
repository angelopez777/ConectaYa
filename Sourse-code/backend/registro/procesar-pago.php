<?php
/**
 * PROYECTO: CONECTAYA
 * ARCHIVO: procesar-pago.php
 */
session_start();
require_once '../config/conexion.php';

if (!isset($_SESSION['user_email'])) {
    header("Location: ../../frontend/html/registro.html");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_SESSION['user_email'];
    $metodo = mysqli_real_escape_string($conexion, $_POST['metodo_pago']);

    $res = mysqli_query($conexion, "SELECT id_usuario, nombre, tipo_usuario FROM usuario WHERE correo = '$email'");
    $user = mysqli_fetch_assoc($res);
    
    $id_u = $user['id_usuario'];
    $nombre = $user['nombre'];
    $tipo = $user['tipo_usuario'];

    $sql_pago = "INSERT INTO metodo_pago_usuario (id_usuario, tipo_metodo) VALUES ('$id_u', '$metodo')";
    
    if (mysqli_query($conexion, $sql_pago)) {
        mysqli_query($conexion, "UPDATE usuario SET estado_cuenta = 'Activo' WHERE id_usuario = '$id_u'");

        // Login automático para entrar directo al Dashboard
        $_SESSION['id_usuario'] = $id_u;
        $_SESSION['nombre'] = $nombre;
        $_SESSION['tipo_usuario'] = $tipo;

        if ($tipo == 'Trabajador') {
            header("Location: ../../frontend/html/dashboards/inicio-trabajador.html");
        } elseif ($tipo == 'Empresa') {
            header("Location: ../../frontend/html/dashboards/inicio-empresa.html");
        } else {
            header("Location: ../../frontend/html/dashboards/inicio-cliente.html");
        }
        exit();
    }
}
?>