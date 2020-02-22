<?php
/// Endpoint for registering a new asset into the system
include_once("../../api_config.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');

/// Creates an INSERT INTO query using the given data
function BuildQuery($idNum, $name, $origin, $cost, $category)
{
    $query = "INSERT INTO assets (id, display_name, purchase_cost, origin, category) ";
    $query = $query . "VALUES ('" . $idNum . "', '" . $name . "', '" . $cost . "', '" . $origin . "', '" . $category . "')";
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

/// Query for registering asset into database
$sql = BuildQuery($post_data['assetId'], $post_data['name'], $post_data['origin'], $post_data['purchase_cost'], $post_data['category']);
$result = $conn->query($sql);

if($result)
{
    echo json_encode(
        [
            "asset_set" => true,
        ]
    );
}
else
{
    echo json_encode(
        [
            "asset_set" => false,
            "error" => "Unable to successfully execute query '" . $sql . "'",
        ]
    );
}

?>