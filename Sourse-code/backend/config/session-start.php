<?php
/**
 * PROYECTO: ConectaYa
 * MODULO: Configuración de Sesión Seguro
 */

// Configuración de cookies de sesión para mayor seguridad
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_samesite', 'Lax');

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Regenerar ID de sesión periódicamente para evitar fijación de sesiones
if (!isset($_SESSION['last_regeneration'])) {
    session_regenerate_id(true);
    $_SESSION['last_regeneration'] = time();
} else {
    $intervalo = 60 * 30; // 30 minutos
    if (time() - $_SESSION['last_regeneration'] > $intervalo) {
        session_regenerate_id(true);
        $_SESSION['last_regeneration'] = time();
    }
}
// NO CERRAR LA ETIQUETA PHP PARA EVITAR EL ERROR DE LA CAPTURA