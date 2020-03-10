<?php
/// Entrypoint for getting all assets available in the database
include_once("../../api_config.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
// Make page display JSON_PRETTY_PRINT
header('Content-Type: application/json');

$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}
// echo "Successfully connected <br/>";

/// SQL Query command to select all from the 'assets' table
$sql = "SELECT * FROM " . $USER_TABLE;
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

        // Add user to array
        $db_array[] = $user;
    }

    // Return the array of assets
    echo json_encode(array(
        "user" => $db_array
    ), JSON_PRETTY_PRINT);
} 
else 
{
    // Unable to get any data from table or table is empty, return null array
    $arr = array(
        "user" => null
    );
    echo json_encode($arr);
}

// Close connection on finish
$conn->close();

?>