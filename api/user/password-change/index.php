<?php
include_once("../../api_config.php");
include_once("../authentication.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Authorization, Content-Type');
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

function checkPassword($password)
{
    if (strlen($password) >= 8) {
        if (preg_match('/[A-Za-z]/', $password) && preg_match('/[0-9]/', $password) && preg_match('/[\'\/~`\!@#\$%\^&\*\(\)_\-\+=\{\}\[\]\|;:"\<\>,\.\?\\\]/', $password)) {
            return TRUE;
        }
    }
    else {
        return FALSE;
    }
}

// Check if authorization header is set, exit if not
if (!Authentication::requestContainsAuth($API_SECRET_KEY)) {
    echo json_encode([
        "user" => null, 
        "error" => "No Authorization found in request"
    ], JSON_PRETTY_PRINT);
    exit();
}

$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}

$user_id = $post_data["id"];

/// Check for if the current auth token is editing the current user id
$authUser = Authentication::getUser();
if ($authUser) {
    if ($authUser->user_type != "admin" && $authUser->user_id != $user_id) {
        echo json_encode([
            "error" => "User is trying to change the password of a different user. Naughty naughty!",
            "user" => null,
        ], JSON_PRETTY_PRINT);
        exit();
    }    
}

/// Create SQL statement to get the user that matches the id
$sql = "SELECT * FROM $LOGIN_TABLE WHERE `STAFF_ID` = ?";
$statement = $conn->prepare($sql);
$statement->bind_param("s", $user_id);
$statement->execute();
$result = $statement->get_result();

if ($result && $result->num_rows > 0) 
{
    $row = $result->fetch_assoc();

    // Check current password matches one in database 
    if ( password_verify($post_data["pass_current"], $row["User_Pass"]) ) 
    {
        if (checkPassword($post_data["pass_new"])) {
            // Set new password in db
            $passwordHash = password_hash($post_data["pass_new"], PASSWORD_DEFAULT);
            $updateSql = "UPDATE user SET User_Pass='$passwordHash' WHERE STAFF_ID='$user_id'";
            $result = $conn->query($updateSql);

            if ($result) {
                echo json_encode([
                    "success" => true,
                ], JSON_PRETTY_PRINT);
            } else {
                echo json_encode([
                    "success" => false,
                    "error" => "Error passing to database",
                ], JSON_PRETTY_PRINT);
                exit();
            }
        }
        else
        {
            echo json_encode([
                "success" => false,
                "error" => "Password must be 8 character long and contain at least 1: special character, upper case, number",
            ], JSON_PRETTY_PRINT);
            exit();
        }
    }
    else 
    {
        echo json_encode([
            "success" => false,
            "success" => "Current passwords don't match",
        ], JSON_PRETTY_PRINT);
        exit();
    }
}
else
{
    echo json_encode([
        "success" => false,
        "error" => "Error fetching from database",
    ], JSON_PRETTY_PRINT);
    exit();
}

?>