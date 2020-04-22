<?php
/// Entrypoint for getting the next available id number for when adding a new asset
include_once("../../../api_config.php");
include_once("../../../user/authentication.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header('Content-Type: application/json');

// Check if request contains user auth
if (!Authentication::requestContainsAuth($API_SECRET_KEY)) {
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
$sql = "SELECT $eqid FROM $ASSETS_TABLE ORDER BY $eqid DESC LIMIT 1";
$result = $conn->query($sql);

// Return determined free index
if ($result && $result->num_rows > 0)
{
    $row = $result->fetch_assoc();
    
    // Get the last index and increment by one
    $newId = $row[$eqid] + 1;
    echo json_encode([
        "assetId" => $newId,
    ], JSON_PRETTY_PRINT);
}
else
{
    echo json_encode([
        "assetId" => -1,
        "error" => "Unable to find any data",
    ], JSON_PRETTY_PRINT);
}

// Close connection when complete
$conn->close();

?>