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
        "changes_set" => false,
        "error" => "Authorization token is required",
    ], JSON_PRETTY_PRINT);
    //http_response_code(401);
    exit();
}

// Parse deallocate id from url
$assetid = htmlspecialchars($_GET["id"]);
if (!$assetid) {
    die("Unable to parse asset id - No id specified");
}

$rest_json = file_get_contents("php://input");

function BuildQuery($ASSETS_TABLE, $assetid)
{
    //The Query is retured in paramaters.
    $query = "UPDATE $ASSETS_TABLE SET Equi_Assigned_Pats_IDs = NULL, Equi_Loaned = NULL, Equi_Return_due = NULL WHERE Equi_ID=$assetid";
    return $query;
}

/*
function DeletePatient($USER_TABLE, $ID_TABLE, $patID)
{
    //The Query is retured in paramaters.
    $query = "DELETE $USER_TABLE, $ID_TABLE FROM $USER_TABLE INNER JOIN $ID_TABLE ON $USER_TABLE.IDs_Patient = $ID_TABLE.IDs_Patient WHERE $USER_TABLE.IDs_Patient=$patID";
    return $query;
}
*/

// Open connected to database
$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}

// Perform SQL command to deallocate asset from person
$sql1 = "SELECT $eqpatid FROM $ASSETS_TABLE WHERE $eqid = $assetid";
$result1 = $conn->query($sql1);

$row = $result1->fetch_assoc();
$patID = $row[$eqpatid];

$sql = BuildQuery($ASSETS_TABLE, $assetid);
$result = $conn->query($sql);

/*
$sql2 = DeletePatient($USER_TABLE, $ID_TABLE, $patID);
$result2 = $conn->query($sql2);
*/

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
        "VAR_VARIABLE" => $assetid,
        "error" => "Unable to successfully execute query '" . $sql . "'",
    ], JSON_PRETTY_PRINT);
}

?>
