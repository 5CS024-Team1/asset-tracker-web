<?php
/* Endpoint for allocating an asset to a user or business
* "api/assets/allocate"
* Params: 
    id: Id of the asset to assign to owner
    owner_name: Name of the owner
    address: Address of owner
    date_recieved: Date owner recieved asset
    date_return: Date owner will return asset
*/

include_once("../../api_config.php");

// Include cross origin headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

/// Builds the full address string from each part
function GetFullAddress($line_1, $city, $region, $postcode) {
    // Check we have all info before proceeding
    if (empty($line_1) || empty($city) || empty($region) || empty($postcode)) {
        return NULL;
    }
    return $line_1 . ", " . $city . ", " . $region . ", " . $postcode;
}

/// Builds the full UPDATE query (UPDATE table SET values WHERE condition)
function BuildQuery($post, $address) {
    $query = "UPDATE assets SET owner_name=\"" . $post['owner_name'] . 
        "\", owner_address=\"" . $address . "\"";
    
    // Format and append recieved date/time
    $recieve_datetime = $post['recieved_date'] . " " . $post['recieved_time'];
    $query = $query . ", owner_date_recieved=\"" . $recieve_datetime ."\"" ;

    // Append retrieval date if exists
    if ( !empty($post['retrieval_date']) && !empty($post['retrieval_time']) )
    {
        $retrieval_datetime = $post['retrieval_date'] . " " . $post['retrieval_time'];
        $query = $query . ", owner_date_return=\"" . $retrieval_datetime . "\"";
    }
    
    // Add address to query if it was made correctly
    if ($address != NULL) 
    {
        $query = $query .  ", owner_date_recieved=\"" . $post['recieved_date'] . "\"";
    }

    $query = $query . " WHERE id=" . $post['id'];
    return $query;
}

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

// Make sure we have required data to do request
if ( empty($_POST['id']) 
    || empty($_POST['owner_name']) 
    || empty($_POST['address_line_1']) 
    || empty($_POST['address_city'])
    || empty($_POST['address_region'])
    || empty($_POST['address_postcode'])
    || empty($_POST['recieved_date'])
    || empty($_POST['recieved_time']) ) 
{
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
$full_address = GetFullAddress($_POST['address_line_1'], $_POST['address_city'], $_POST['address_region'], $_POST['address_postcode']);
$sql = BuildQuery($_POST, $full_address);
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