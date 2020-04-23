<?php
/// Entrypoint for getting the next available id number for when adding a new asset
include_once("../../../api_config.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

// Use @ to suppress the warning and handle it ourselves
@$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if(!$conn) 
{
    echo json_encode([
        "userId" => -1,
        "error" => $e->getMessage(),
    ], JSON_PRETTY_PRINT);
    die();
}

/// Query to determine the next available asset id in table
$sql = "SELECT $idsstaff FROM $ID_TABLE WHERE $idsstaff LIKE '%AD%' ORDER BY $idsstaff DESC";
//$sql = "SELECT IDs_Staff FROM ids WHERE IDs_Staff LIKE '%STF%' ORDER BY IDs_Staff DESC";
$result = $conn->query($sql);


// Return determined free index
if ($result && $result->num_rows > 0)
{
    $row = $result->fetch_assoc();
    
    // Get the last index and increment by one
    $newId = "AD";
    $tempId = $row[$idsstaff];
    $tempId1 = substr($tempId,2);
    $intvar = (int)$tempId1 + 1;
    $newId .= strval($intvar);
    echo json_encode([
        "userId" => $newId,
    ], JSON_PRETTY_PRINT);
}
else
{
    echo json_encode([
        "userId" => -1,
        "error" => "Unable to find any data",
    ], JSON_PRETTY_PRINT);
}
/// Query to determine the next available asset id in table
// $sql = "sql query";
// $result = $conn->query($sql);

// Return determined free index
//$array = array("userId" => rand(0, 999));
//echo json_encode($array);

?>