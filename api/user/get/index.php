<?php
/* Get user based on admin_id
* "api/assets/get?id={admin_id}"
* Requires paramater id specifying which asset id to retrieve
*/
include_once("../../api_config.php");
include_once("../authentication.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Methods: GET");
header('Content-Type: application/json');

// Check if authorization header is set, exit if not
if (!Authentication::requestContainsAuth($API_SECRET_KEY)) {
    echo json_encode([
        "user" => null, 
        "error" => "No Authorization found in request"
    ], JSON_PRETTY_PRINT);
    exit();
}

/// Check we have required data to do the request
if (!isset($_GET["id"])) {
    echo json_encode([
        "user" => null,
        "error" => "Unable to get asset id - Id parameter is missing",
    ], JSON_PRETTY_PRINT);
    die();
}

$usid = htmlspecialchars($_GET["id"]);
if (!$usid) {
    echo json_encode([
        "user" => null,
        "error" => "Unable to parse user id - No id specified",
    ], JSON_PRETTY_PRINT);
    die();
}

/// Open a connection to the database
$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    echo json_encode([
        "user" => null,
        "error" => "Unable to open connection - " . mysqli_connect_error(),
    ], JSON_PRETTY_PRINT);
    die();
}

// Depending on Id, check the relevant column
// Check id_readme for more info
$sql = "SELECT * FROM $ID_TABLE WHERE ";
if (strpos($usid, 'AD') !== false) 
{
    $sql = $sql . $idsstaff . "=\"" . $usid . "\"";
} 
else if (strpos( $usid, 'STF') !== false) 
{
    $sql = $sql . $idsstaff . "=\"" . $usid . "\"";
}
else
{
    $sql = $sql . $idspatient . "=\"" . $usid . "\"";
}

/// Query to determine the next available user id in table
$result = $conn->query($sql);

class User { }

if ($result && $result->num_rows > 0) 
{
    // Map individual user onto single object and cast to correct data types
    while($row = $result->fetch_assoc()) {
        $user = new User();
        $user->admin_id = $row[$idsstaff];
    }

    // Return the array of assets
    echo json_encode([
        "user" => $user
    ], JSON_PRETTY_PRINT);
} 
else 
{
    // Unable to get any data from table or table is empty, return null array
    $arr = array(
        "user" => null,
        "error" => "Unable to find any data",
    );
    echo json_encode($arr, JSON_PRETTY_PRINT);
}

// Close connection on finish
$conn->close();

?>