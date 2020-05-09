<?php
/// Endpoint for registering a new asset into the system
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
        "asset_set" => false,
        "error" => "Authorization token is required",
    ], JSON_PRETTY_PRINT);
    exit();
}

/// Creates an INSERT INTO query using the given data
function BuildQuery($ASSETS_TABLE, $idNum, $Barcode, $Name, $Category, $Latitude, $Longitude, $Eqdept, $Eqzone)
{
    $query = "INSERT INTO $ASSETS_TABLE (Equi_ID, Equi_Barcode, Equi_Name, Equi_Category, Equi_Latittude, Equi_Longitude, Equi_Dept, Equi_Zone)";
    $query = "$query VALUES ('$idNum', '$Barcode', '$Name', '$Category', '$Latitude', '$Longitude', '$Eqdept', '$Eqzone')";
    return $query;
}

$rest_json = file_get_contents("php://input");
$post_data = json_decode($rest_json, true);

if ( empty($post_data) ) {
    die("Require data to add asset");
}

$conn = mysqli_connect($SERVER_LOCATION, $SERVER_USERNAME, $SERVER_PASSWORD, $DB_NAME);
if (!$conn) {
    die("Unable to open connection - " . mysqli_connect_error());
}

/// Query for registering asset into database (lat and long are temporary)
$assedId = filter_var($post_data['assetId']);
$EqName = filter_var($post_data['name']);
$Category = filter_var($post_data['category']);
$Latitude = filter_var($post_data['latitude']);
$Longitude = filter_var($post_data['longitude']);
$Dept = filter_var($post_data['department']);
$EqZone = filter_var($post_data['zone']);

$sql1 = "SELECT $eqid FROM $ASSETS_TABLE ORDER BY $eqid DESC LIMIT 1";
$result1 = $conn->query($sql1);

// Return determined free index
if ($result1 && $result1->num_rows > 0)
{
    $row = $result1->fetch_assoc();
    
    // Get the last index and increment by one
    $assedId = $row[$eqid] + 1;

    if (preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $assedId) || preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $EqName ) || preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $Category) || preg_match('/[\'^£$%&*()}{@#~?><>,|=_¬]/', $Latitude) || preg_match('/[\'^£$%&*()}{@#~?><>,|=_¬]/', $Longitude) || preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $Dept) || preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $EqZone)) {
        echo json_encode([
            "asset_set" => false,
            "error" => "Unable to successfully execute query '" . $sql . "'",
        ]);
    }
    else {
        if (empty($assedId) || empty($EqName) || empty($Category) || empty($Latitude) || empty($Longitude) || empty($Dept) || empty($EqZone)) {
            echo json_encode([
                "asset_set" => false,
                "error" => "Unable to successfully execute query '" . $sql . "'",
            ]);
        }
        else {
            $sql = BuildQuery($ASSETS_TABLE, $assedId, $assedId, $EqName, $Category, $Latitude, $Longitude, $Dept, $EqZone);
            $result = $conn->query($sql);
        
            if($result)
            {
                echo json_encode([
                    "asset_set" => true,
                ], JSON_PRETTY_PRINT);
            }
            else
            {
                echo json_encode([
                    "asset_set" => false,
                    "error" => "Unable to successfully execute query '" . $sql . "'",
                ]);
            }
        }
    }
}
else
{
    echo json_encode([
        "asset_set" => false,
        "error" => "Unable to successfully execute query '" . $sql . "'",
    ], JSON_PRETTY_PRINT);
}

?>