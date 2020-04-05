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
    http_response_code(401);
    exit();
}

/// Check we have required data to do the request
if (!isset($_GET["Equi_ID"])) {
    die("Unable to get asset id - Id parameter is missing");
}

$asset_id = htmlspecialchars($_GET["Equi_ID"]);
if (!$eqid) {
    die("Unable to parse asset id - No id specified");
}

/// Open a connection to the database
$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}

/// Query to determine the next available asset id in table
$sql = "SELECT * FROM assets WHERE Equi_ID=" . $eqid;
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

        $sqlquery = "SELECT $surname, $forename, $personaddress, $personidspatient FROM $USER_TABLE WHERE $personidspatient = $eqid";
        $sqlresult = $conn->query($sqlquery);
        if ($sqlresult->num_rows > 0) 
        {
            while($row = $sqlresult->fetch_assoc()) {
                $asset->surname = $row[$surname];
                $asset->forename = $row[$forename];
                $asset->personaddress = $row[$personaddress];
                $asset->personidspatient = $row[$personidspatient];
            }
        }

        //$asset->purchase_cost;
        //$asset->origin = $row["origin"];
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