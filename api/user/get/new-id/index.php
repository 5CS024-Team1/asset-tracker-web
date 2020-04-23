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
$sql = "SELECT $idsstaff FROM $ID_TABLE WHERE $idsstaff LIKE '%STF%' ORDER BY $idsstaff DESC";
$result = $conn->query($sql);


// Return determined free index
if ($result && $result->num_rows > 0)
{
    $row = $result->fetch_assoc();
    
    // Get the last index and increment by one(does this by getting the number after the string and adding 1 to it the re-adding the string to it)
    $newId = "STF";
    $tempId = $row[$idsstaff];
    $tempId1 = substr($tempId,3);
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
?>