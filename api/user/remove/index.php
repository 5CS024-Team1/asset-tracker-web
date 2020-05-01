<?php
/// Endpoint for registering a new user into the system
include_once("../../api_config.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
// Make page display JSON_PRETTY_PRINT
header('Content-Type: application/json');

/// Updates USER_TABLE IDs_Staff to null
function BuildQuery($USER_TABLE, $stfid)
{
    $query = "UPDATE $USER_TABLE SET IDs_Staff=NULL WHERE IDs_Staff='$stfid'";
    $query = "$query VALUES ('$stfid')";
    return $query;
}

function BuildQuery1($LOGIN_TABLE, $stfid)
{
    $query = "DELETE FROM $LOGIN_TABLE WHERE STAFF_ID='$stfid'";
    $query = "$query VALUES ('$stfid')";
    return $query;
}

function BuildQuery2($ID_TABLE, $stfid)
{
    $query = "DELETE FROM $ID_TABLE WHERE IDs_Staff='$stfid'";
    $query = "$query VALUES ('$stfid')";
    return $query;
}

$rest_json = file_get_contents("php://input");
$post_data = json_decode($rest_json, true);

if ( empty($post_data) ) {
    die("Require data to remove user");
}

$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}

$sql = BuildQuery($USER_TABLE, $post_data['deleteId']);
$result = $conn->query($sql);

$sql1 = BuildQuery1($LOGIN_TABLE, $post_data['deleteId']);
$result1 = $conn->query($sql1);

$sql2 = BuildQuery2($ID_TABLE, $post_data['deleteId']);
$result2 = $conn->query($sql2);

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

?>