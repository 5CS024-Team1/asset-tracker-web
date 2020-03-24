<?php
/// Endpoint for registering a new asset into the system
include_once("../../api_config.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
// Make page display JSON_PRETTY_PRINT
header('Content-Type: application/json');

/// Creates an INSERT INTO query using the given data
function BuildQuery($idNum, $name, $Category, $Barcode, $Latitude, $Longitude)
{
    $query = "INSERT INTO assets ($id, $display_name, $category, $barcode, $latitude, $longitude)";
    $query = "$query VALUES ('$idNum', '$name', '$Category', $Barcode, $Latitude, $Longitude)";
    return $query;
}

$rest_json = file_get_contents("php://input");
$post_data = json_decode($rest_json, true);

if ( empty($post_data) ) {
    die("Require data to add asset");
}

$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}

/// Query for registering asset into database (lat and long are temporary)
$sql = BuildQuery($post_data['assetId'], $post_data['name'], $post_data['category'], $post_data['assetId'], $post_data['latitude'], $post_data['longitude']);
$result = $conn->query($sql);

if($result)
{
    echo json_encode([
        "asset_set" => true,
    ], JSON_PRETTY_PRINT);
}
else
{
    echo json_encode([
        "asset_set" => false,
        "error" => "Unable to successfully execute query '" . $sql . "'",
    ]);
}

?>