<?php
/// Entrypoint for getting all assets that have been assigned with a date
include_once("../../api_config.php");
include_once("../authentication.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
// Make page display JSON_PRETTY_PRINT
header('Content-Type: application/json');

$rest_json = file_get_contents("php://input");
$postData = json_decode($rest_json, true);

// Check if email and password are set
if ( empty($postData['email']) && empty($postData['password']) ) {
    exit("No username or password recieved");
}

//mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}

// Filter email to prevent SQL injection
$user_id = $postData['id'];
if ( !filter_var($user_id, FILTER_SANITIZE_STRING) ) 
{
    echo json_encode([
        "success" => false,
        "error" => "Unable to sanitize user id",
    ]);
    die();
}

// Bind email and run query
$sql = "SELECT * FROM $LOGIN_TABLE WHERE $loginame=?";
$statement = $conn->prepare($sql);
$statement->bind_param("s", $user_id);
$statement->execute();
$result = $statement->get_result();

class User { }

// Gets a string representation of the current user
function getUserType($id)
{
    if (strpos($id, "AD") !== false)
    {
        return "admin";
    }
    else if (strpos($id, "REG") !== false)
    {
        return "staff";
    }
    return "user";
}

if ($result && $result->num_rows > 0) 
{
    // Create a new array and store all data from table into it
    $user = null;
    while($row = $result->fetch_assoc()) {
        $user = new User();
        $user->id = $row["Username"];
        $user->password = $row["User_Pass"];
    }

    if(!$user) {
        exit("Unable to parse any user data from database");
    }

    if ($user_id == $user->id && password_verify($postData['password'], $user->password)) 
    {
        $encodedToken = Authentication::encryptPayload([
            "user_id" => $user->id,
            "user_type" => getUserType($user->id),
            "expiry_time" => time() + (60 * $API_TOKEN_VALID_DURATION),
        ], $API_SECRET_KEY);
        
        echo json_encode([
            "success" => true,
            "api_token" => $encodedToken,
        ], JSON_PRETTY_PRINT);
    }
    else
    {
        echo json_encode([
            "success" => false,
            "error" => "Username and password combination doesn't match. Check you have typed the correct username & password"
        ], JSON_PRETTY_PRINT);
    }
} 
else 
{
    echo json_encode([
        "success" => false,
        "error" => "Unable to find any data",
    ], JSON_PRETTY_PRINT);
}

// Close connection on finish
$conn->close();

?>