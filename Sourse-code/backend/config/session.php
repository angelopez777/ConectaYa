<?php
// backend/config/session.php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
// Opcional: Para debugear si la sesión tiene algo
// error_log("ID de sesión actual: " . session_id());
?>