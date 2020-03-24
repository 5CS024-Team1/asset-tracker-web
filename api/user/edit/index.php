<?php
// ToDo: Able to set new user details

/// Entrypoint for getting all assets available in the database
include_once("../../api_config.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
// Make page display JSON_PRETTY_PRINT
header('Content-Type: application/json');

echo json_encode([
    "success" => true,
], JSON_PRETTY_PRINT);

?>