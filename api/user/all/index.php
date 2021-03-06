<?php
/// Entrypoint for getting all accounts in the database
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

/// SQL Query command to select all accounts from the ID_TABLE
$sql = "SELECT * FROM $ID_TABLE WHERE $idsstaff IS NOT NULL";
$result = $conn->query($sql);

class User { }

if ($result->num_rows > 0) 
{
    // Create a new array and store all data from table into it
    $db_array = array();
    while($row = $result->fetch_assoc()) {
        $user = new User();
        $user->user_id = $row[$idsstaff];

        // Add user to array
        $db_array[] = $user;
    }

    // Return the array of assets
    echo json_encode(array(
        "users" => $db_array
    ), JSON_PRETTY_PRINT);
} 
else 
{
    // Unable to get any data from table or table is empty, return null array
    $arr = array(
        "users" => null
    );
    echo json_encode($arr);
}

// Close connection on finish
$conn->close();

?>