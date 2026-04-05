<?php
/**
 * PROYECTO: CONECTAYA
 * ARCHIVO: procesar-paso-perfil.php
 * DESCRIPCIÓN: Guarda foto, dirección, múltiples labores y múltiples estudios.
 */

require_once __DIR__ . '/../config/session.php';
require_once '../config/conexion.php';

if (!isset($_SESSION['user_email'])) {
    header("Location: ../../frontend/html/registro.html");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_SESSION['user_email'];
    $direccion = mysqli_real_escape_string($conexion, $_POST['direccion'] ?? '');
    
    // 1. Obtener ID del usuario
    $email_esc = mysqli_real_escape_string($conexion, $email);
    $query_user = mysqli_query($conexion, "SELECT id_usuario FROM usuario WHERE correo = '$email_esc' LIMIT 1");
    $datos_user = $query_user ? mysqli_fetch_assoc($query_user) : null;
    if (!$datos_user || !isset($datos_user['id_usuario'])) {
        header("Location: ../../frontend/html/login.html?error=sesion");
        exit();
    }
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
    // Compatibilidad:
    // - Nuevo HTML: labor[] + exp[]
    // - Antiguo HTML: profesion[] + exp_num[] + exp_unidad[]
    $labores = [];
    $exp_nums = [];
    $exp_unidades = [];

    if (isset($_POST['profesion']) && is_array($_POST['profesion'])) {
        $labores = $_POST['profesion'];
        $exp_nums = (isset($_POST['exp_num']) && is_array($_POST['exp_num'])) ? $_POST['exp_num'] : [];
        $exp_unidades = (isset($_POST['exp_unidad']) && is_array($_POST['exp_unidad'])) ? $_POST['exp_unidad'] : [];
    } elseif (isset($_POST['labor']) && is_array($_POST['labor'])) {
        $labores = $_POST['labor'];
        $exp_nums = (isset($_POST['exp']) && is_array($_POST['exp'])) ? $_POST['exp'] : [];
        // Si solo viene exp[] sin unidad, asumimos años
        $exp_unidades = array_fill(0, count($labores), 'anos');
    }

    for ($i = 0; $i < count($labores); $i++) {
        $p_raw = $labores[$i] ?? '';
        $p = mysqli_real_escape_string($conexion, trim((string)$p_raw));
        if ($p === '') continue;

        $n = isset($exp_nums[$i]) ? intval($exp_nums[$i]) : 0;
        $u_raw = $exp_unidades[$i] ?? 'anos';
        $u = mysqli_real_escape_string($conexion, (string)$u_raw);

        $sql_l = "INSERT INTO labor_trabajador (id_usuario, nombre_labor, num_experiencia, unidad_experiencia) 
                  VALUES ('$id_u', '$p', '$n', '$u')";
        mysqli_query($conexion, $sql_l);
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