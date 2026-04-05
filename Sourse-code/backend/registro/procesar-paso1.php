<?php
/**
 * PROYECTO: ConectaYa
 * ARCHIVO: /backend/registro/procesar-paso1.php
 * DESCRIPCIÓN: Registro inicial con captura de teléfono en el INSERT.
 */

session_start();
include_once '../config/conexion.php'; 

header('Content-Type: application/json');

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recibimos los 4 datos del formulario
    $nombre   = $_POST['nombre'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $correo   = $_POST['correo'] ?? '';
    $password = $_POST['password'] ?? '';

    // Validación básica: teléfono ahora es obligatorio
    if (empty($nombre) || empty($correo) || empty($password) || empty($telefono)) {
        $response['message'] = "Todos los campos son obligatorios.";
    } else {
        $pass_hash = password_hash($password, PASSWORD_DEFAULT);

        try {
            // CORRECCIÓN: Añadida la columna 'telefono' y un "?" más
            $sql = "INSERT INTO usuario (nombre, correo, password, telefono, tipo_usuario, estado_cuenta) 
                    VALUES (?, ?, ?, ?, 'Cliente', 'Pendiente')";
            
            $stmt = $conexion->prepare($sql);
            
            if ($stmt) {
                // CORRECCIÓN: "ssss" porque ahora pasamos 4 strings (nombre, correo, pass, tel)
                $stmt->bind_param("ssss", $nombre, $correo, $pass_hash, $telefono);
                
                if ($stmt->execute()) {
                    // Guardamos el ID en sesión (usa 'id_usuario' para ser consistente con tu DB)
                    $_SESSION['id_usuario'] = $conexion->insert_id;
                    
                    $response['success'] = true;
                    $response['message'] = "Registro exitoso";
                } else {
                    $response['message'] = "El correo ya está registrado o hubo un error.";
                }
                $stmt->close();
            }
        } catch (mysqli_sql_exception $e) {
            $response['message'] = "Error en DB: " . $e->getMessage();
        }
    }
}

echo json_encode($response);
exit();