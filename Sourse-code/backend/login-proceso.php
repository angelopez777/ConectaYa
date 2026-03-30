<?php
/**
 * PROYECTO: CONECTAYA
 * ARCHIVO: login-proceso.php
 * UBICACIÓN: backend/
 */
session_start();
require_once 'config/conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = mysqli_real_escape_string($conexion, $_POST['correo']);
    $password = $_POST['password'];

    // Buscamos el usuario (RF01)
    $query = "SELECT * FROM usuario WHERE correo = '$correo' LIMIT 1";
    $result = mysqli_query($conexion, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $usuario = mysqli_fetch_assoc($result);

        // Verificamos contraseña
        if (password_verify($password, $usuario['password'])) {
            
            // GUARDAMOS NOMBRE Y ROL (Para que el dashboard no salga vacío)
            $_SESSION['id_usuario'] = $usuario['id_usuario'];
            $_SESSION['nombre'] = $usuario['nombre'];
            $_SESSION['tipo_usuario'] = $usuario['tipo_usuario'];

            // Redirección por roles según tus carpetas
            $rol = $usuario['tipo_usuario'];
            if ($rol == 'Trabajador') {
                header("Location: ../frontend/html/dashboards/inicio-trabajador.html");
            } elseif ($rol == 'Empresa') {
                header("Location: ../frontend/html/dashboards/inicio-empresa.html");
            } else {
                header("Location: ../frontend/html/dashboards/inicio-cliente.html");
            }
            exit();
        } else {
            header("Location: ../frontend/html/login.html?error=1");
            exit();
        }
    } else {
        header("Location: ../frontend/html/login.html?error=1");
        exit();
    }
}