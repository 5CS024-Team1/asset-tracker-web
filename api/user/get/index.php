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
$usid = htmlspecialchars($_GET["id"]);
if (!$usid) {
    echo json_encode([
        "user" => null,
        "error" => "Unable to parse user id - No id specified",
    ], JSON_PRETTY_PRINT);
    die();
}

// Check the auth header matches the requested user
$authUser = Authentication::getUser();
if ($authUser) 
{
    if ($authUser->user_type != "admin" && $authUser->user_id != $usid) {
        echo json_encode([
            "error" => "User is trying to get a different user. Not allowed!",
            "user" => null,
        ], JSON_PRETTY_PRINT);
        exit();
    }
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
    $user = null;
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