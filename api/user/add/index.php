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

function checkUsername($username)
{
    if ($username != null) {
        return TRUE;
    }
    else {
        return FALSE;
    }
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
$result = null;
$result1 = null;
if (checkPassword($post_data['password'])) {
    if (checkUsername($post_data['username'])) {
        $check = $post_data['username'];
        $sql2 = "SELECT * FROM user WHERE Username='$check'";
        $result2 = $conn->query($sql2);
            if ($result2->num_rows > 0) {
                echo json_encode([
                    "user_set" => false,
                    "error" => "Username must be unique/not empty",
                ]);
                exit();
            }
            else
            {
                $passwordHash = password_hash($post_data['password'], PASSWORD_DEFAULT);

                $sql = BuildQuery($ID_TABLE, $post_data['userId']);
                $result = $conn->query($sql);
        
                $sql1 = BuildQuery1($LOGIN_TABLE, $post_data['username'], $passwordHash, $post_data['userId']);
                $result1 = $conn->query($sql1);
            }
    }
    else
    {
        echo json_encode([
            "user_set" => false,
            "error" => "Username must be unique/not empty",
        ]);
        exit();
    }
}
else
{
    echo json_encode([
        "user_set" => false,
        "error" => "Password isn't string enough. Try again with a stronger password. Make sure it contains an uppercase, a lowercase and a symbol and is longer than 8 characters",
    ]);
    exit();
}

if($result && $result1)
{
    echo json_encode([
        "user_set" => true,
    ], JSON_PRETTY_PRINT);
}
else
{
    echo json_encode([
        "user_set" => false,
        "error" => "Unable to create the new user",
    ], JSON_PRETTY_PRINT);
}

?>