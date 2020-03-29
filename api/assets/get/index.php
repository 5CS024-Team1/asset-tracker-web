<?php
/* Entrypoint for getting a specific asset from the database from it's id
* "api/assets/get?id={assetId}"
* Requires paramater id specifying which asset id to retrieve
*/
include_once("../../api_config.php");
include_once("../../user/authentication.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header('Content-Type: application/json');

// Check if request contains user auth
if (!Authentication::requestContainsAuth($_SERVER)) {
    echo json_encode([
        "assets" => null,
        "error" => "Authorization token is required",
    ], JSON_PRETTY_PRINT);
    http_response_code(401);
    exit();
}

/// Check we have required data to do the request
if (!isset($_GET["id"])) {
    die("Unable to get asset id - Id parameter is missing");
}

$asset_id = htmlspecialchars($_GET["id"]);
if (!$asset_id) {
    die("Unable to parse asset id - No id specified");
}

/// Open a connection to the database
$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}

/// Query to determine the next available asset id in table
$sql = "SELECT * FROM assets WHERE id=" . $asset_id;
$result = $conn->query($sql);

class Asset { }

if ($result->num_rows > 0) 
{
    // Map individual asset onto single object and cast to correct data types
    while($row = $result->fetch_assoc()) {
        $asset = new Asset();
        $asset->id = $row[$id];
        $asset->display_name = $row[$display_name];
        $asset->category = $row[$category];
        $asset->latitude = doubleval($row[$latitude]);
        $asset->longitude = doubleval($row[$longitude]);
        $asset->last_ping_time = $row[$last_ping_time];
        $asset->barcode = $row[$barcode];

        //$asset->purchase_cost;
        //$asset->origin = $row["origin"];
        //$asset->owner_name = $row["owner_name"];
        //$asset->owner_address = $row["owner_address"];
        
        $asset->date_loaned = $row[$loaned];
        $asset->date_return = $row[$owner_date_return];
        $asset->date_last_cleaned = $row[$last_cleaned];
    }

    // Return the array of assets
    echo json_encode([
        "assets" => $asset
    ], JSON_PRETTY_PRINT);
} 
else 
{
    // Unable to get any data from table or table is empty, return null array
    $arr = array(
        "assets" => null
    );
    echo json_encode($arr, JSON_PRETTY_PRINT);
}

?>