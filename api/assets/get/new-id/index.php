<?php
/// Entrypoint for getting the next available id number for when adding a new asset
include_once("../../../api_config.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}

/// Query to determine the next available asset id in table
// $sql = "sql query";
// $result = $conn->query($sql);

// Return determined free index

echo json_encode([
    "assetId" => rand(0, 999),
    "name" => "testing",
], JSON_PRETTY_PRINT);

$conn->close();

?>