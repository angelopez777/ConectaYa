<?php
/**
 * PROYECTO: ConectaYa
 * REGLA: Escritura desde cero.
 * FUNCION: Actualización de perfil y creación de registro en tabla 'cliente'.
 */

session_start();
include_once '../config/conexion.php';

header('Content-Type: application/json');
$response = ['success' => false, 'message' => ''];

// Verificación de seguridad
if (!isset($_SESSION['id_usuario'])) {
    $response['message'] = "SESIÓN PERDIDA";
    echo json_encode($response);
    exit();
}

$id_usuario = $_SESSION['id_usuario'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $direccion = mysqli_real_escape_string($conexion, $_POST['direccion'] ?? '');
    
    // 1. Procesar Imagen de Perfil
    $nombre_foto = null;
    if (isset($_FILES['foto']) && $_FILES['foto']['error'] === 0) {
        $extension = pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION);
        $nombre_foto = "perfil_" . $id_usuario . "_" . time() . "." . $extension;
        $ruta_destino = "../../img/perfiles/" . $nombre_foto;
        
        if (!is_dir("../../img/perfiles/")) {
            mkdir("../../img/perfiles/", 0777, true);
        }
        move_uploaded_file($_FILES['foto']['tmp_name'], $ruta_destino);
    }

    $conexion->begin_transaction();

    try {
        // 2. Actualizar tabla Usuario (Foto y Dirección)
        if ($nombre_foto) {
            $sqlUser = "UPDATE usuario SET foto = ?, direccion = ? WHERE id_usuario = ?";
            $stmtUser = $conexion->prepare($sqlUser);
            $stmtUser->bind_param("ssi", $nombre_foto, $direccion, $id_usuario);
        } else {
            $sqlUser = "UPDATE usuario SET direccion = ? WHERE id_usuario = ?";
            $stmtUser = $conexion->prepare($sqlUser);
            $stmtUser->bind_param("si", $direccion, $id_usuario);
        }
        $stmtUser->execute();

        // 3. Crear o actualizar registro en tabla Cliente (Sin fk_metodo_pago problemática)
        $sqlCli = "INSERT INTO cliente (id_usuario) VALUES (?) 
                   ON DUPLICATE KEY UPDATE id_usuario = id_usuario";
        $stmtCli = $conexion->prepare($sqlCli);
        $stmtCli->bind_param("i", $id_usuario);
        $stmtCli->execute();

        $conexion->commit();
        $response['success'] = true;
        $response['message'] = "Perfil completado con éxito";
        
    } catch (Exception $e) {
        $conexion->rollback();
        $response['message'] = "Error interno: " . $e->getMessage();
    }
}

echo json_encode($response);
exit();