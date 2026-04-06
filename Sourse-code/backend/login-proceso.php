<?php
/**
 * PROYECTO: ConectaYa
 * REGLA: Escritura desde cero. Sin resumen.
 */
session_start();
include_once 'config/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = mysqli_real_escape_string($conexion, $_POST['correo']);
    $password = $_POST['password'];

    $sql = "SELECT id_usuario, nombre, password, tipo_usuario FROM usuario WHERE correo = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($usuario = $resultado->fetch_assoc()) {
        if (password_verify($password, $usuario['password'])) {
            $_SESSION['id_usuario'] = $usuario['id_usuario'];
            $_SESSION['nombre'] = $usuario['nombre'];
            $_SESSION['tipo_usuario'] = $usuario['tipo_usuario'];

            // RUTAS SEGÚN TU ÁRBOL DE ARCHIVOS
            if ($usuario['tipo_usuario'] === 'Cliente') {
                header("Location: ../frontend/html/dashboards/inicio-cliente.html");
            } else {
                header("Location: ../frontend/html/dashboards/inicio-trabajador.html");
            }
            exit();
}

