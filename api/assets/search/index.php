<?php
/* Endpoint for allocating an asset to a user or business
* "api/assets/deallocate?id={assetId}"
* Requires paramater id specifying which asset id to deallocate person from
*/

include_once("../../api_config.php");
include_once("../../user/authentication.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
// Make page display JSON_PRETTY_PRINT
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

// Get query from url
$query = htmlspecialchars($_GET["q"]);
if (!$query) {
    die("Unable to get a query");
}

// Open connected to database
$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}

// ToDo: Get relevent results to query
class Results { }
class Asset { }


$results = new Results();
// Store relevent assets in array that is initialized as null
$results->assets = null;

if($query)
{
    // If is a number, search only through ids
    if (is_numeric($query)) 
    {
        $sql = "SELECT * FROM assets WHERE $id LIKE '%$query%'";
        $res = mysqli_query($conn, $sql);

        if(mysqli_num_rows($res) > 0)
        {
            $results->assets = array();
            while($row = $res->fetch_assoc()) {
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
        
                // Add asset to array
                $results->assets[] = $asset;
            }
        }
    }
    else
    {
        // Isnt a number, search by phrase
        //ToDo
    }
}

echo json_encode([
    "assets" => $results->assets,
], JSON_PRETTY_PRINT);

?>