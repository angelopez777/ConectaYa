<?php
/**
 * PROYECTO: CONECTAYA
 * ARCHIVO: procesar-paso-perfil.php
 * DESCRIPCIÓN: Guarda foto, dirección, múltiples labores y múltiples estudios.
 */

session_start();
require_once '../config/conexion.php';

if (!isset($_SESSION['user_email'])) {
    header("Location: ../../frontend/html/registro.html");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_SESSION['user_email'];
    $direccion = mysqli_real_escape_string($conexion, $_POST['direccion']);
    
    // 1. Obtener ID del usuario
    $query_user = mysqli_query($conexion, "SELECT id_usuario FROM usuario WHERE correo = '$email'");
    $datos_user = mysqli_fetch_assoc($query_user);
    $id_u = $datos_user['id_usuario'];

    // 2. Procesar Foto de Perfil
    $nombre_foto = "default-worker.png";
    if (isset($_FILES['foto']) && $_FILES['foto']['error'] === 0) {
        $ext = pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION);
        $nombre_foto = "perfil_" . $id_u . "_" . time() . "." . $ext;
        $ruta_destino = "../../frontend/assets/perfiles/" . $nombre_foto;
        move_uploaded_file($_FILES['foto']['tmp_name'], $ruta_destino);
    }

    // 3. Actualizar tabla Usuario (Dirección, Foto y Rol)
    $sql_update_u = "UPDATE usuario SET 
                     direccion = '$direccion', 
                     foto = '$nombre_foto', 
                     tipo_usuario = 'Trabajador', 
                     estado_cuenta = 'Activo' 
                     WHERE id_usuario = '$id_u'";
    mysqli_query($conexion, $sql_update_u);

    // 4. Limpiar datos previos (por si es un reintento)
    mysqli_query($conexion, "DELETE FROM labor_trabajador WHERE id_usuario = '$id_u'");
    mysqli_query($conexion, "DELETE FROM estudio_trabajador WHERE id_usuario = '$id_u'");

    // 5. Insertar Labores (Array)
    if (isset($_POST['profesion'])) {
        $profesiones = $_POST['profesion'];
        $exp_nums = $_POST['exp_num'];
        $exp_unidades = $_POST['exp_unidad'];

        for ($i = 0; $i < count($profesiones); $i++) {
            $p = mysqli_real_escape_string($conexion, $profesiones[$i]);
            $n = intval($exp_nums[$i]);
            $u = mysqli_real_escape_string($conexion, $exp_unidades[$i]);

            if (!empty($p)) {
                $sql_l = "INSERT INTO labor_trabajador (id_usuario, nombre_labor, num_experiencia, unidad_experiencia) 
                          VALUES ('$id_u', '$p', '$n', '$u')";
                mysqli_query($conexion, $sql_l);
            }
        }
    }

    // 6. Insertar Estudios (Array)
    if (isset($_POST['estudio_nombre'])) {
        $estudios = $_POST['estudio_nombre'];
        $niveles = $_POST['estudio_nivel'];

        for ($j = 0; $j < count($estudios); $j++) {
            $nom = mysqli_real_escape_string($conexion, $estudios[$j]);
            $niv = mysqli_real_escape_string($conexion, $niveles[$j]);

            if (!empty($nom)) {
                $sql_e = "INSERT INTO estudio_trabajador (id_usuario, nombre_estudio, nivel) 
                          VALUES ('$id_u', '$nom', '$niv')";
                mysqli_query($conexion, $sql_e);
            }
        }
    }

    // 7. Redirección final
    $_SESSION['user_tipo'] = 'Trabajador';
    header("Location: ../../frontend/html/metodo-pago.html");
    exit();
}
?>