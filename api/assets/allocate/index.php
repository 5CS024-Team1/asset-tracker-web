<?php
/* Endpoint for allocating an asset to a user or business
* "api/assets/allocate"
* Params: 
    id: Id of the asset to assign to owner
    owner_name: Name of the owner
    address: Address of owner
    date_recieved: Date owner recieved asset
    date_return: Date owner will return asset
*/

include_once("../../api_config.php");
include_once("../../user/authentication.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header('Content-Type: application/json');

// Check if request contains user auth
if (!Authentication::requestContainsAuth($API_SECRET_KEY)) {
    echo json_encode([
        "changes_set" => false,
        "error" => "Authorization token is required",
    ], JSON_PRETTY_PRINT);
    exit();
}

/// Creates an INSERT INTO query using the given data
function BuildQuery($ID_TABLE, $patid)
{
    $query = "INSERT INTO $ID_TABLE (IDs_Patient)";
    $query = "$query VALUES ('$patid')";
    return $query;
}

function BuildQuery1($USER_TABLE, $surname, $forename, $address, $town, $county, $patid, $stfid)
{
    $query = "INSERT INTO $USER_TABLE (Pers_Surname, Pers_Forename, Pers_Address, Pers_Town, Pers_County, IDs_Patient, IDs_Staff)";
    $query = "$query VALUES ('$surname', '$forename', '$address', '$town', '$county', '$patid', NULL)";
    return $query;
}

function BuildQuery2($ASSETS_TABLE, $patid, $assetid)
{
    $query = "UPDATE $ASSETS_TABLE SET Equi_Assigned_Pats_IDs='$patid' WHERE Equi_ID='$assetid'";
    return $query;
}

function BuildQuery3($ASSETS_TABLE, $loanDate, $assetid)
{
    $query = "UPDATE $ASSETS_TABLE SET Equi_Loaned='$loanDate' WHERE Equi_ID='$assetid'";
    return $query;
}

function BuildQuery4($ASSETS_TABLE, $returnDate, $assetid)
{
    $query = "UPDATE $ASSETS_TABLE SET Equi_Loaned='$returnDate' WHERE Equi_ID='$assetid'";
    return $query;
}

function formatDate($date, $time)
{
    $newDate = $date.$time;
    return $newDate;
}

// Executes an sql query and dies if an error occured
function sqlExecuteValidate($connection, $sqlStatement) {
    $sqlResult = $connection->query($sqlStatement);
    if (!$sqlResult)
    {
        echo json_encode([
            "user_set" => false,
            "error" => "Unable to successfully execute query '" . mysqli_error($connection) . "'",
        ]);
        die();
    }
    return $sqlResult;
}

$rest_json = file_get_contents("php://input");
$post_data = json_decode($rest_json, true);

if ( empty($post_data) ) {
    die("Require data to allocate user");
}

$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}

$isCreatingNewPatient = $post_data['newPatientId'] >= 0 ? true : false;
// Get new patient id from create new patient
$patientId = (int)$post_data['newPatientId'];
// If empty, user chose to select an existing patient
if (!$isCreatingNewPatient)
    $patientId = $post_data['selectedPatientId'];

$assetId = $post_data['id'];

$loanDate = formatDate($post_data['recieved_date'], $post_data['recieved_time']);
$returnDate = formatDate($post_data['retrieval_date'], $post_data['retrieval_time']);

$currentSql = null;
$sqlResult = null;

if ($isCreatingNewPatient)
{
    $currentSql = BuildQuery($ID_TABLE, $patientId);
    $sqlResult = sqlExecuteValidate($conn, $currentSql);
    
    $currentSql = BuildQuery1($USER_TABLE, $post_data['owner_surname'], $post_data['owner_forename'], $post_data['address_line_1'], $post_data['address_city'], $post_data['address_region'], $patientId, NULL);
    $sqlResult = sqlExecuteValidate($conn, $currentSql);
}

$currentSql = BuildQuery2($ASSETS_TABLE, $patientId, $assetId);
$sqlResult = sqlExecuteValidate($conn, $currentSql);

$currentSql = BuildQuery3($ASSETS_TABLE, $loanDate, $assetId);
$sqlResult = sqlExecuteValidate($conn, $currentSql);

$currentSql = BuildQuery4($ASSETS_TABLE, $returnDate, $assetId);
$sqlResult = sqlExecuteValidate($conn, $currentSql);

if($sqlResult)
{
    echo json_encode([
        "allocated_asset" => true,
    ], JSON_PRETTY_PRINT);
}
else
{
    echo json_encode([
        "allocated_asset" => false,
        "error" => "Unable to successfully execute query '" . mysqli_error($conn) . "'",
    ]);
}
?>
