<?php
include_once("../../api_config.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');

/* 
echo "Logging In<br />";
echo "Server Name: " . $SERVER_LOCATION . "<br />";
echo "Username: " . $SERVER_USERNAME . "<br />";
echo "Pass: " . $SERVER_PASSWORD . "<br />";
echo "DB Name: " . $DB_NAME . "<br/>";
echo "Table Name: " . $ASSETS_TABLE;
echo "<br /><br />";
*/

$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}
// echo "Successfully connected <br/>";

/// SQL Query command to select all from the 'assets' table
$sql = "SELECT * FROM " . $ASSETS_TABLE;
$result = $conn->query($sql);

if ($result->num_rows > 0) 
{
    // Create a new array and store all data from table into it
    $db_array = array();
    while($row = $result->fetch_assoc()) {
        $db_array[] = $row;
    }

    // Return the array of assets
    echo json_encode(array(
        "assets" => $db_array
    ));
} 
else 
{
    // Unable to get any data from table, return null array
    $arr = array(
        "assets" => array(null)
    );
    echo json_encode($arr);
}

// Close connection on finish
$conn->close();

?>