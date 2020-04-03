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
$DB_NAME = "nhs_asset_tracker";
// Name of the table that holds all assets
$DEPARTMENT_TABLE = "department";
$ASSETS_TABLE = "equipment";
$HOSPITAL_TABLE = "hospital";
$ID_TABLE = "ids";
$MAINTENANCE_TABLE = "maintenance";
$USER_TABLE = "person";
$LOGIN_TABLE = "user";

/// Secret key for decoding login data info
$API_SECRET_KEY = "abC123!";
/// Duration in minutes of how long an API token (JWT/Login auth) is valid 
$API_TOKEN_VALID_DURATION = 60;

//department Table
$deptid = "Dept_ID";
$deptname = "Dept_Name";
$depthospid = "Hosp_ID";
$depthospfloor = "Hosp_Floor";
$depthospward = "Hosp_Ward";

//equipment Table
$eqid = "Equi_ID";
$barcode = "Equi_Barcode";
$eqname = "Equi_Name";
$category = "Equi_Category";
$latitude = "Equi_Latittude"; //Yes I know it's spelt wrong, thats how its in the database
$longitude = "Equi_Longitude";
$last_ping_time = "Equi_Timestamp";
$eqpatid = "Equi_Assinged_Pats_IDs";
$loaned = "Equi_Loaned";
$owner_date_return = "Equi_Return_due";
$eqdept = "Equi_Dept";
$last_cleaned = "Equi_Main_Last_Cleaned";

//hospital Table
$hospid = "Hosp_ID";
$hospname = "Hosp_Name";
$hospaddress = "Hosp_Address";
$hosptown = "Hosp_Town";
$hospcounty = "Hosp_County";
$hospfloor = "Hosp_Floor";
$hospward = "Hosp_Ward";

//ids Table
$idspatient = "IDs_Patient";
$idsstaff = "IDs_Staff";
$idsinpatient = "IDs_Inpatient";

//Maintenance Table
$issue = "Issue #";
$details = "Details";
$cleaningrecord = "Cleaning_Record";
$mhospid = "Hosp_ID";
$mainlastcleaned = "Main_Last_Cleaned";

//Person(user) Table
$surname = "Person_Surname";
$forename = "Person_Forename";
$personaddress = "Person_Address";
$persontown = "Person_Town";
$personcounty = "Person_County";
$personidspatient = "IDs_Patient";
$personidsstaff = "IDs_Staff";

//Login Table
$loginame = "Username";
$loginpass = "User_Pass"
?>