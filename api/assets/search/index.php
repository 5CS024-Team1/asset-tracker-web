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
if (!Authentication::requestContainsAuth($API_SECRET_KEY)) {
    echo json_encode([
        "assets" => null,
        "error" => "Authorization token is required",
    ], JSON_PRETTY_PRINT);
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
        $sql = "SELECT * FROM $ASSETS_TABLE WHERE $eqid LIKE '%$query%'";
        $res = mysqli_query($conn, $sql);

        if(mysqli_num_rows($res) > 0)
        {
            $results->assets = array();
            while($row = $res->fetch_assoc()) {
                $asset = new Asset();
                $asset->id = $row[$eqid];
                $asset->barcode = $row[$barcode];
                $asset->display_name = $row[$eqname];
                $asset->category = $row[$category];
                $asset->latitude = doubleval($row[$latitude]);
                $asset->longitude = doubleval($row[$longitude]);
                $asset->last_ping_time = $row[$last_ping_time];
                $asset->eqpatid = $row[$eqpatid];
                $asset->date_loaned = $row[$loaned];
                $asset->date_return = $row[$owner_date_return];
                $asset->eqdept = $row[$eqdept];
                $asset->last_cleaned = $row[$last_cleaned];
                $check = $row[$eqpatid];
        
                if (!empty($row[$eqpatid]))
                {
                    $sqlquery = "SELECT $surname, $forename, $personaddress, $personidspatient FROM $USER_TABLE WHERE $personidspatient = $check";
                    $sqlresult = $conn->query($sqlquery);
                    if ($sqlresult->num_rows > 0)
                        {
                        while($rows = $sqlresult->fetch_assoc()) {
                            $asset->surname = $rows[$surname];
                            $asset->forename = $rows[$forename];
                            $asset->personaddress = $rows[$personaddress];
                            $asset->personidspatient = $rows[$personidspatient];
                        }
                    }
                }
                else
                {
                    $asset->surname = Null;
                    $asset->forename = Null;
                    $asset->personaddress = Null;
                    $asset->personidspatient = Null;
                }
                
                
        
                //$asset->purchase_cost;
                //$asset->origin = $row["origin"];
        
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