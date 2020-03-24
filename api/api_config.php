<?php
/// Constants file for global variables to use in backend
/// Name all variables in all capitals to show that it is a global constant

// Location of the server
$SERVER_LOCATION = "localhost";
// Username of the server
$SERVER_USERNAME = "root";
// Password for the username of the server
$SERVER_PASSWORD = "";

// Name of the database
$DB_NAME = "db1824591";
// Name of the table that holds all assets
$ASSETS_TABLE = "equipment";
$USER_TABLE = "person";

/// Secret key for decoding login data info
$API_SECRET_KEY = "abC123!";
/// Duration in minutes of how long an API token (JWT/Login auth) is valid 
$API_TOKEN_VALID_DURATION = 60;

//equipment Table
$id = "PK_ID";
$barcode = "Barcode";
$display_name = "Name";
$category = "Category";
$latitude = "Latittude"; //Yes I know it's spelt wrong, thats how its in the database
$longitude = "Longitude";
$last_ping_time = "Ping_Time";
$loaned = "Loaned";
$owner_date_return = "Return_due";
$last_cleaned = "Last_Cleaned";

//In but not from right table
///$origin = $row["origin"];
///$owner_name = $row["owner_name"];
///$owner_address = $row["owner_address"];
///$owner_date_recieved = $row["owner_date_recieved"];

//To do
///$purchase_cost = doubleval($row["purchase_cost"]);
?>