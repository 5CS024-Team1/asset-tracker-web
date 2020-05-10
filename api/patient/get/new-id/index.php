<?php
/// Entrypoint for getting next available patient id
include_once("../../../api_config.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header('Content-Type: application/json');

// Use @ to suppress the warning and handle it ourselves
@$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if(!$conn) 
{
    echo json_encode([
        "patientId" => -1,
        "error" => $e->getMessage(),
    ], JSON_PRETTY_PRINT);
    die();
}

/// Query to determine the next available asset id in table
$sql = "SELECT $personidspatient FROM $ID_TABLE WHERE $personidspatient ORDER BY $personidspatient DESC";
//$sql = "SELECT IDs_Staff FROM ids WHERE IDs_Staff LIKE '%STF%' ORDER BY IDs_Staff DESC";
$result = $conn->query($sql);

// Return determined free index
if ($result && $result->num_rows > 0)
{
    $row = $result->fetch_assoc();
    
    // Get the last index and increment by one
    $tempId = $row[$personidspatient];
    $intvar = (int)$tempId + 1;

    $newId = strval($intvar);
    echo json_encode([
        "patientId" => $newId,
    ], JSON_PRETTY_PRINT);
}
else
{
    echo json_encode([
        "patientId" => -1,
        "error" => "Unable to find any data",
    ], JSON_PRETTY_PRINT);
}

$conn->close();

?>