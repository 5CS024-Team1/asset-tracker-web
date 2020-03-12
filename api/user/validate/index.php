<?php

include_once("../../api_config.php");
include_once("../cryption/validate.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
// Make page display JSON_PRETTY_PRINT
header('Content-Type: application/json');

$token = htmlspecialchars($_GET["token"]);

$isValid = ValidatePayload($token, $API_SECRET_KEY);
echo json_encode([
    "isValid" => $isValid,
], JSON_PRETTY_PRINT);

?>