<?php
/// Entrypoint for getting all assets available in the database
include_once("../../api_config.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
// Make page display JSON_PRETTY_PRINT
header('Content-Type: application/json');

$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}
// echo "Successfully connected <br/>";

/// SQL Query command to select all from the 'assets' table
$sql = "SELECT * FROM " . $ASSETS_TABLE;
$result = $conn->query($sql);

class Asset { }

if ($result->num_rows > 0) 
{
    // Create a new array and store all data from table into it
    $db_array = array();
    while($row = $result->fetch_assoc()) {
        $asset = new Asset();
        $asset->id = $row["PK_ID"];
        $asset->display_name = $row["Name"];
        $asset->category = $row["Category"];
        //$asset->latitude = doubleval($row[$latitude]);
        //$asset->longitude = doubleval($row[$longitude]);
        $asset->last_ping_time = $row["Ping_Time"];

        //$asset->purchase_cost;
        //$asset->origin = $row["origin"];
        //$asset->owner_name = $row["owner_name"];
        //$asset->owner_address = $row["owner_address"];
        //$asset->owner_date_recieved = $row["owner_date_recieved"];

        $asset->owner_date_return = $row["Return_due"];

        // Add asset to array
        $db_array[] = $asset;
    }

    // Return the array of assets
    echo json_encode(array(
        "asset" => $db_array
    ), JSON_PRETTY_PRINT);
} 
else 
{
    // Unable to get any data from table or table is empty, return null array
    $arr = array(
        "asset" => null
    );
    echo json_encode($arr);
}

// Close connection on finish
$conn->close();

?>