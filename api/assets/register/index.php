<?php
/// Endpoint for registering a new asset into the system
include_once("../../api_config.php");
include_once("../../user/authentication.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
// Make page display JSON_PRETTY_PRINT
header('Content-Type: application/json');

// Check if request contains user auth
if (!Authentication::requestContainsAuth($API_SECRET_KEY)) {
    echo json_encode([
        "asset_set" => false,
        "error" => "Authorization token is required",
    ], JSON_PRETTY_PRINT);
    exit();
}

/// Creates an INSERT INTO query using the given data
function BuildQuery($ASSETS_TABLE, $idNum, $Barcode, $Name, $Category, $Latitude, $Longitude, $Eqdept)
{
    $query = "INSERT INTO $ASSETS_TABLE (Equi_ID, Equi_Barcode, Equi_Name, Equi_Category, Equi_Latittude, Equi_Longitude, Equi_Dept)";
    $query = "$query VALUES ('$idNum', '$Barcode', '$Name', '$Category', '$Latitude', '$Longitude', '$Eqdept')";
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
$sql = BuildQuery($ASSETS_TABLE, $post_data['assetId'], $post_data['assetId'], $post_data['name'], $post_data['category'], $post_data['latitude'], $post_data['longitude'], $post_data['department']);
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