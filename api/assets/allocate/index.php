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
    http_response_code(401);
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
    $query = "$query VALUES ('$surname', '$forename', '$address', '$town', '$county', '$patid', '$stfid')";
    return $query;
}

function BuildQuery2($ASSET_TABLE, $patid, $assetid)
{
    $query = "UPDATE $ASSETS_TABLE SET Equi_Assigned_Pats_IDs=$patid WHERE Equi_ID=$assetid";
    $query = "$query VALUES ('$patid', '$assetid')";
    return $query;
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

$sql = BuildQuery($ID_TABLE, $post_data['patientId']);
$result = $conn->query($sql);

$sql1 = BuildQuery1($USER_TABLE, $post_data['surname'], $post_data['forname'], $post_data['address'], $post_data['town'], $post_data['county'], $post_data['patientId'], $post_data['userId']);
$result1 = $conn->query($sql1);

$sql2 = BuildQuery2($ASSETS_TABLE, $post_data['patientId'], $post_data['assetId']);
$result2 = $conn->query($sql2);

if($result)
{
    if($result1)
    {
        if($result2)
        {
            echo json_encode([
                "user_set" => true,
            ], JSON_PRETTY_PRINT);
        }
        else
        {
            echo json_encode([
                "user_set" => false,
                "error" => "Unable to successfully execute query '" . $sql . "'",
            ]);
        }
    }
    else
    {
        echo json_encode([
            "user_set" => false,
            "error" => "Unable to successfully execute query '" . $sql . "'",
        ]);
    }
}
else
{
    echo json_encode([
        "user_set" => false,
        "error" => "Unable to successfully execute query '" . $sql . "'",
    ]);
}
?>
