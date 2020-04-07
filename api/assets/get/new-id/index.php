<?php
/// Entrypoint for getting the next available id number for when adding a new asset
include_once("../../../api_config.php");
include_once("../../../user/authentication.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header('Content-Type: application/json');

// Check if request contains user auth
if (!Authentication::requestContainsAuth($_SERVER, $API_SECRET_KEY)) {
    echo json_encode([
        "assetId" => -1,
        "error" => "Authorization token is required",
    ], JSON_PRETTY_PRINT);
    die();
}

// Use @ to suppress the warning and handle it ourselves
@$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if(!$conn) 
{
    echo json_encode([
        "assetId" => -1,
        "error" => $e->getMessage(),
    ], JSON_PRETTY_PRINT);
    die();
}

/// Query to determine the next available asset id in table
// $sql = "sql query";
// $result = $conn->query($sql);

// Return determined free index

echo json_encode([
    "assetId" => rand(0, 999),
], JSON_PRETTY_PRINT);

$conn->close();

?>