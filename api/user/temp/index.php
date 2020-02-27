<?php
/* Used for adding a user(admin just for now) to the database
* path
* "api/user/add"
* Used variables: 
    admin_id: Id of the user
    admin_name: Name of the user
    admin_email: Email of the user
    admin_password: Password of the user (plain text for now will need to be encrypted later)
*/

include_once("../../api_config.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

/// Builds the full UPDATE query (UPDATE table SET values WHERE condition)
function BuildQuery($post) {
    $query = "UPDATE users SET admin_name=\"" . $post['admin_name'];

    // Adds email address if it is formatted correctly (may need changing within front end instead too)
    if ($admin_email != NULL) 
    {
        //checks that the email contains a character/text if not it returns a false
        $has_at = stripos($admin_email, '@') !== false;
        $has_com = stripos($admin_email, '.com') !== false;
        $has_co = stripos($admin_email, '.co.uk') !== false;
        if ($has_at != false && ($has_com != false || $has_co != false))
        {
            $query = $query .  ", admin_email=\"" . $post['admin_email'] . "\"";
        }
    }
    //no checking on password yet
    $query = $query . " WHERE admin_password=" . $post['admin_password'];

    $query = $query . " WHERE admin_id=" . $post['admin_id'];
    return $query;
}

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

//Check variables contain data
if ( empty($_POST['admin_id']) 
    || empty($_POST['admin_name']) 
    || empty($_POST['admin_email']) 
    || empty($_POST['address_password'])  ) 
{
    //One or more of the variables is missing data
    echo json_encode([
        "changes_set" => false,
        "error" => "Missing required data to update database",
    ]);
    exit();
}

// Do any checks to make sure no malicious or unwanted data
// To Do

// Open a connection to the db
$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}

// Use UPDATE command to set the new values
$sql = BuildQuery($_POST);
$result = $conn->query($sql);

if ($result) 
{
    echo json_encode(
        [
        "changes_set" => true,
        ]
    );
} 
else 
{
    echo json_encode(
        [
        "changes_set" => false,
        ]
    );
}
?>