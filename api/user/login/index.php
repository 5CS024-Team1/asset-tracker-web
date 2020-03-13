<?php
/// Entrypoint for getting all assets that have been assigned with a date
include_once("../../api_config.php");
include_once("../cryption/encrypt.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
// Make page display JSON_PRETTY_PRINT
header('Content-Type: application/json');

$rest_json = file_get_contents("php://input");
$postData = json_decode($rest_json, true);

if ( empty($postData['email']) || empty($postData['password']) ) {
    exit("No username or password recieved");
}

$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}
// echo "Successfully connected <br/>";

$email = $postData['email'];
$sql = "SELECT * FROM $USER_TABLE WHERE admin_email='$email'";
$result = $conn->query($sql);

class User { }

if ($result->num_rows > 0) 
{
    // Create a new array and store all data from table into it
    $db_array = array();
    while($row = $result->fetch_assoc()) {
        $user = new User();
        $user->admin_id = intval($row["admin_id"]);
        $user->admin_name = $row["admin_name"];
        $user->admin_email = $row["admin_email"];
        $user->admin_type = $row["admin_type"];
        $user->admin_password = $row["admin_password"];

        // Add asset to array
        $db_array[] = $user;
    }

    $password = $postData['password'];
    if ($email == $user->admin_email && $password == $user->admin_password) 
    {
        $encodedToken = EncryptPayload([
            "user_id" => $user->admin_id,
            "user_type" => $user->admin_type,
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
    ], JSON_PRETTY_PRINT);
}

// Close connection on finish
$conn->close();

?>