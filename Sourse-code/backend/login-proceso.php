<?php
/**
 * PROYECTO: ConectaYa
 * ARCHIVO: backend/login-proceso.php
 * REGLA: Escritura desde cero. Sin estilos internos.
 */

session_start();
// Usamos __DIR__ para rutas absolutas internas en el servidor
require_once __DIR__ . '/config/conexion.php';

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
            
            // Variables de sesión
            $_SESSION['id_usuario'] = $usuario['id_usuario'];
            $_SESSION['nombre'] = $usuario['nombre'];
            $_SESSION['tipo_usuario'] = $usuario['tipo_usuario'];

            // Generar notificación de bienvenida si no existe
            require_once __DIR__ . '/notificaciones/check-bienvenida.php';

            // Redirección profesional según rol
            if ($usuario['tipo_usuario'] === 'Cliente') {
                header("Location: ../frontend/html/dashboards/inicio-cliente.html");
            } else {
                header("Location: ../frontend/html/dashboards/inicio-trabajador.html");
            }
            exit();
        }
    }
    header("Location: ../frontend/html/login.html?error=auth");
    exit();
} else {
    header("Location: ../frontend/html/login.html");
    exit();
}