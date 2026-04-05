<?php
/**
 * PROYECTO: ConectaYa
 * ARCHIVO: logout.php
 */
session_start();
session_unset();
session_destroy();

// Redirigir al login
header("Location: ../../frontend/html/login.html");
exit;
?>