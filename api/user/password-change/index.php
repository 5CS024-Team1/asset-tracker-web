<?php
include_once("../../api_config.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$rest_json = file_get_contents("php://input");
$post_data = json_decode($rest_json, true);

if ( empty($post_data["pass_new"]) || empty($post_data["pass_newCheck"]) ) {
    exit("Require new password to set");
}

if ( $post_data["pass_new"] != $post_data["pass_newCheck"] ) {
    echo json_encode([
        "success" => false,
        "error" => "New passwords don't match",
    ], JSON_PRETTY_PRINT);
    exit();
}

$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}

$user_id = $post_data["id"];
/// SQL Query command to select all from the 'assets' table
$sql = "SELECT * FROM `user` WHERE `admin_id` = " . $user_id;
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) 
{
    $row = $result->fetch_assoc();
    // Check current password matches one in database 
    if ( $row["admin_password"] == $post_data["pass_current"]) 
    {
        // Set new password in db
        $updateSql = "UPDATE `user` SET `admin_password` = \"" . $post_data["pass_new"] . "\" WHERE `user`.`admin_id` = 1";
        $result = $conn->query($updateSql);

        if ($result) {
            echo json_encode([
                "success" => true,
            ], JSON_PRETTY_PRINT);
        } else {
            echo json_encode([
                "success" => false,
            ], JSON_PRETTY_PRINT);
        }
    }
    else 
    {
        exit("Current passwords don't match");
        echo json_encode([
            "success" => false,
        ], JSON_PRETTY_PRINT);
    }
}
else
{
    echo json_encode([
        "success" => false,
    ], JSON_PRETTY_PRINT);
}

?>