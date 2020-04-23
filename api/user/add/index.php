<?php
/// Endpoint for registering a new user into the system
include_once("../../api_config.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
// Make page display JSON_PRETTY_PRINT
header('Content-Type: application/json');

/// Creates an INSERT INTO query using the given data
function BuildQuery($ID_TABLE, $stfid)
{
    $query = "INSERT INTO $ID_TABLE (ids_staff)";
    $query = "$query VALUES ('$stfid')";
    return $query;
}

function BuildQuery1($LOGIN_TABLE, $username, $password, $stfid)
{
    $query = "INSERT INTO $LOGIN_TABLE (Username, User_Pass, STAFF_ID)";
    $query = "$query VALUES ('$username', '$password', '$stfid')";
    return $query;
}

/*
function BuildQuery2($USER_TABLE, $usid, $first_name, $last_name, $email, $password, $account)
{
    $query = "INSERT INTO $USER_TABLE (admin_id, admin_name, admin_email, admin_password, admin_type)";
    $query = "$query VALUES ('$usid', '$name', '$email', '$password', '$account')";
    return $query;
}
*/

$rest_json = file_get_contents("php://input");
$post_data = json_decode($rest_json, true);

if ( empty($post_data) ) {
    die("Require data to add user");
}

$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}

/// Query for registering user into database
$passwordHash = password_hash($post_data['password'], PASSWORD_DEFAULT);

$sql = BuildQuery($ID_TABLE, $post_data['userId']);
$result = $conn->query($sql);

$sql1 = BuildQuery1($LOGIN_TABLE, $post_data['userName'], $passwordHash, $post_data['userId']);
$result1 = $conn->query($sql1);

if($result)
{
    if($result1)
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

/*
if($result)
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
*/

?>