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

$rest_json = file_get_contents("php://input");
$post_data = json_decode($rest_json, true);

if ( empty($post_data) ) {
    die("Require data to allocate user");
}

$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}

$loanDate = formatDate($post_data['recieved_date'], $post_data['recieved_time']);
$returnDate = formatDate($post_data['retrieval_date'], $post_data['retrieval_time']);

$sql = BuildQuery($ID_TABLE, $post_data['patientId']);
$result = $conn->query($sql);

$sql1 = BuildQuery1($USER_TABLE, $post_data['owner_surname'], $post_data['owner_forname'], $post_data['address_line_1'], $post_data['address_city'], $post_data['address_region'], $post_data['patientId'], $post_data['userId']);
$result1 = $conn->query($sql1);

$sql2 = BuildQuery2($ASSETS_TABLE, $post_data['patientId'], $post_data['assetId']);
$result2 = $conn->query($sql2);

$sql3 = BuildQuery3($ASSETS_TABLE, $loanDate, $post_data['assetId']);
$result3 = $conn->query($sql3);

$sql4 = BuildQuery4($ASSETS_TABLE, $returnDate, $post_data['assetId']);
$result4 = $conn->query($sql4);

if($result)
{
    if($result1)
    {
        if($result2)
        {
            if($result3)
            {
                if($result4)
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
