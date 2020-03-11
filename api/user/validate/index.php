<?php

include_once("../../api_config.php");
include_once("../cryption/decrypt.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
// Make page display JSON_PRETTY_PRINT
header('Content-Type: application/json');

$token = htmlspecialchars($_GET["token"]);

$decrypted = DecryptPayload($token, $API_SECRET_KEY);
$jsonData = json_encode($decrypted, JSON_PRETTY_PRINT);

$date = $decrypted->start_datetime;
echo "Time: " . $date;

?>