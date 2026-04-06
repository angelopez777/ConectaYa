<?php
/**
 * PROYECTO: ConectaYa
 * ARCHIVO: backend/login-proceso.php
 * REGLA: Escritura desde cero. Sin estilos internos.
 */

session_start();
// Ajustamos la ruta para que encuentre tu conexión híbrida en backend/config/
require_once 'config/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Saneamiento de datos
    $correo = mysqli_real_escape_string($conexion, $_POST['correo']);
    $password = $_POST['password'];

    // Consulta preparada para seguridad
    $sql = "SELECT id_usuario, nombre, password, tipo_usuario FROM usuario WHERE correo = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($usuario = $resultado->fetch_assoc()) {
        // Verificación de contraseña hash
        if (password_verify($password, $usuario['password'])) {
            
            // 1. Crear variables de sesión necesarias
            $_SESSION['id_usuario'] = $usuario['id_usuario'];
            $_SESSION['nombre'] = $usuario['nombre'];
            $_SESSION['tipo_usuario'] = $usuario['tipo_usuario'];

            // 2. Ejecutar el check de bienvenida (Genera notificación si no existe)
            // La ruta es relativa a este archivo (estamos en backend/)
            require_once 'notificaciones/check-bienvenida.php';

            // 3. Redirección según rol (Rutas de tu árbol de archivos)
            if ($usuario['tipo_usuario'] === 'Cliente') {
                header("Location: ../frontend/html/dashboards/inicio-cliente.html");
            } else {
                header("Location: ../frontend/html/dashboards/inicio-trabajador.html");
            }
            exit();
        }
    }

    // Si falló el login, regresamos con error
    header("Location: ../frontend/html/login.html?error=auth");
    exit();
} else {
    // Si intentan entrar al archivo sin POST, al login de una
    header("Location: ../frontend/html/login.html");
    exit();
}