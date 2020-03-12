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

// Parse deallocate id from url
$asset_id = htmlspecialchars($_GET["id"]);
if (!$asset_id) {
    die("Unable to parse asset id - No id specified");
}

// Open connected to database
$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}

function BuildQuery($id)

{
    //The Query is retured in paramaters.
    $query = ("UPDATE assets SET owner_name = NULL, owner_address = NULL, owner_date_recieved = NULL, owner_date_return = NULL WHERE assets.id = ?)";
    $query->bind_param("s", $id)
    return $query;

}

// Perform SQL command to deallocate asset from person
$sql = BuildQuery($asset_id);
$result = $conn->query($sql);

if ($result)  //&& $conn->affected_rows > 0 
{
    echo json_encode([
        "changes_set" => true,
    ], JSON_PRETTY_PRINT);
} 
else 
{
    echo json_encode([
        "changes_set" => false,
    ], JSON_PRETTY_PRINT);
}

?>
