<?php
/// Endpoint for registering a new user into the system
include_once("../../api_config.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
// Make page display JSON_PRETTY_PRINT
header('Content-Type: application/json');

/// Creates an INSERT INTO query using the given data
function BuildQuery($usid, $name, $email, $password, $account)
{
    $query = "INSERT INTO user (admin_id, admin_name, admin_email, admin_password, admin_type)";
    $query = "$query VALUES ('$usid', '$name', '$email', '$password', '$account')";
    return $query;
}

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
$sql = BuildQuery($post_data['userId'], $post_data['name'], $post_data['email'], $post_data['password'], $post_data['account']);
$result = $conn->query($sql);

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

?>