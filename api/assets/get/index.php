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
if (!Authentication::requestContainsAuth($_SERVER, $API_SECRET_KEY)) {
    echo json_encode([
        "assets" => null,
        "error" => "Authorization token is required",
    ], JSON_PRETTY_PRINT);
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
$sql = "SELECT * FROM $ASSETS_TABLE WHERE $eqid=" . $asset_id;
$result = $conn->query($sql);

class Asset { }

if ($result->num_rows > 0) 
{
    // Map individual asset onto single object and cast to correct data types
    while($row = $result->fetch_assoc()) {
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
    }

    // Return single asset
    echo json_encode([
        "asset" => $asset
    ], JSON_PRETTY_PRINT);
} 
else 
{
    // Unable to get any data from table or table is empty, return null asset
    $arr = array(
        "asset" => null
    );
    echo json_encode($arr, JSON_PRETTY_PRINT);
}

?>