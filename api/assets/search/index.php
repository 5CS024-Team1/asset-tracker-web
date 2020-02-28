<?php
/* Endpoint for allocating an asset to a user or business
* "api/assets/deallocate?id={assetId}"
* Requires paramater id specifying which asset id to deallocate person from
*/

include_once("../../api_config.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
// Make page display JSON_PRETTY_PRINT
header('Content-Type: application/json');

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
        $sql = "SELECT * FROM assets WHERE id LIKE '%$query%'";
        $res = mysqli_query($conn, $sql);

        if(mysqli_num_rows($res) > 0)
        {
            $results->assets = array();
            while($row = $res->fetch_assoc()) {
                $asset = new Asset();
                $asset->id = intval($row["id"]);
                $asset->display_name = $row["display_name"];
                $asset->category = $row["category"];
                $asset->location = $row["location"];
                $asset->last_ping_time = $row["last_ping_time"];
                $asset->purchase_cost = doubleval($row["purchase_cost"]);
                $asset->origin = $row["origin"];
                $asset->owner_name = $row["owner_name"];
                $asset->owner_address = $row["owner_address"];
                $asset->owner_date_recieved = $row["owner_date_recieved"];
                $asset->owner_date_return = $row["owner_date_return"];
        
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