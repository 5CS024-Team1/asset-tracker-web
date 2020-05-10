<?php
/// Entrypoint for getting all patients
include_once("../../api_config.php");
include_once("../../user/authentication.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
// Make page display JSON_PRETTY_PRINT
header('Content-Type: application/json');

// Check if request contains user auth
if (!Authentication::requestContainsAuth($API_SECRET_KEY)) {
    echo json_encode([
        "assets" => null,
        "error" => "Authorization token is required",
    ], JSON_PRETTY_PRINT);
    //http_response_code(401);
    exit();
}

$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}

/// SQL Query command to select all accounts from the ID_TABLE
$sql = "SELECT * FROM $USER_TABLE WHERE $idspatient IS NOT NULL";
$result = $conn->query($sql);

class Patient { }

if ($result->num_rows > 0) 
{
    // Create a new array and store all data from table into it
    $db_array = array();
    while($row = $result->fetch_assoc()) {
        $patient = new Patient();
        $patient->id = $row[$idspatient];
        $patient->forename = $row[$forename];
        $patient->surname = $row[$surname];
        $patient->address = $row[$personaddress];
        $patient->town = $row[$persontown];
        $patient->county = $row[$personcounty];

        // Add user to array
        $db_array[] = $patient;
    }

    // Return the array of assets
    echo json_encode([
        "patients" => $db_array,
    ], JSON_PRETTY_PRINT);
} 
else 
{
    // Unable to get any data from table or table is empty, return null array
    echo json_encode([
        "patients" => null,
    ], JSON_PRETTY_PRINT);
}

// Close connection on finish
$conn->close();

?>