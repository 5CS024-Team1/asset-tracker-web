<?php
/// Entrypoint for getting all assets that have been assigned with a date
include_once("../../api_config.php");
include_once("../../user/authentication.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
// Make page display JSON_PRETTY_PRINT
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

$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}
// echo "Successfully connected <br/>";

/// SQL Query command to select assets that have been assigned from the 'assets' table
$sql = "SELECT * FROM $ASSETS_TABLE WHERE $owner_date_return";
//$sql = "SELECT * FROM $ASSETS_TABLE WHERE $owner_date_return IS NOT NULL AND owner_name IS NOT NULL";
$result = $conn->query($sql);

class Asset { }

if ($result->num_rows > 0) 
{
    // Create a new array and store all data from table into it
    $db_array = array();
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

        // Add asset to array
        $db_array[] = $asset;
    }

    // Return the array of assets
    echo json_encode(array(
        "assets" => $db_array
    ), JSON_PRETTY_PRINT);
} 
else 
{
    // Unable to get any data from table or table is empty, return null array
    $arr = array(
        "assets" => null
    );
    echo json_encode($arr);
}

// Close connection on finish
$conn->close();

?>