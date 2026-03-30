<?php
require_once '../config/conexion.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_usuario = $_SESSION['user_id'] ?? null;

    if (!$id_usuario) {
        header("Location: ../../frontend/html/login.html");
        exit();
    }

    // Procesar Horarios
    $disponibilidad = [
        "dias" => $_POST['dias'] ?? [],
        "rangos" => []
    ];

    if (isset($_POST['h_ini'])) {
        foreach ($_POST['h_ini'] as $i => $h_ini) {
            if (!empty($h_ini)) {
                $disponibilidad["rangos"][] = [
                    "desde" => $h_ini,
                    "hasta" => $_POST['h_fin'][$i]
                ];
            }
        }
    }

    // Procesar Especialidades
    $labores = [];
    if (isset($_POST['labor'])) {
        foreach ($_POST['labor'] as $i => $nombre) {
            if (!empty($nombre)) {
                $labores[] = [
                    "puesto" => $nombre,
                    "exp" => $_POST['exp'][$i] ?? '0'
                ];
            }
        }
    }

    $direccion = $_POST['direccion'] ?? '';
    $horarios_json = json_encode($disponibilidad);
    $especialidades_json = json_encode($labores);
    $formacion_json = json_encode($_POST['titulo'] ?? []);

    try {
        $stmt = $pdo->prepare("INSERT INTO perfiles_trabajador 
            (id_usuario, direccion, horarios, especialidades, formacion) 
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
            direccion = VALUES(direccion),
            horarios = VALUES(horarios),
            especialidades = VALUES(especialidades),
            formacion = VALUES(formacion)");

        $stmt->execute([$id_usuario, $direccion, $horarios_json, $especialidades_json, $formacion_json]);

        header("Location: ../../frontend/html/dashboards/inicio-cliente.html");
        exit();

    } catch (PDOException $e) {
        die("Error: " . $e->getMessage());
    }
}