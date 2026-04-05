<?php
/**
 * PROYECTO: ConectaYa
 * RUTA: /backend/agendar-servicio.php
 */

include 'config/conexion.php';
include 'config/session.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['id_usuario'])) {
    $id_solicitud = $_POST['id_solicitud'];
    $fecha = $_POST['fecha_encuentro']; // Formato YYYY-MM-DD HH:MM:SS
    $cliente_id = $_POST['id_cliente'];

    try {
        $conexion->begin_transaction();

        // 1. Crear el servicio programado
        $stmt = $conexion->prepare("INSERT INTO servicios_programados (id_solicitud, fecha_encuentro) VALUES (?, ?)");
        $stmt->bind_param("is", $id_solicitud, $fecha);
        $stmt->execute();

        // 2. Notificar al cliente
        $msg_notif = "Se ha programado tu encuentro para el " . $fecha;
        $notif = $conexion->prepare("INSERT INTO notificaciones (id_usuario, titulo, mensaje) VALUES (?, 'Cita Programada', ?)");
        $notif->bind_param("is", $cliente_id, $msg_notif);
        $notif->execute();

        // 3. Actualizar la solicitud original
        $upd = $conexion->prepare("UPDATE solicitudes_contacto SET estado_contacto = 'Agendada' WHERE id_solicitud = ?");
        $upd->bind_param("i", $id_solicitud);
        $upd->execute();

        $conexion->commit();
        echo json_encode(['status' => 'success']);

    } catch (Exception $e) {
        $conexion->rollback();
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}