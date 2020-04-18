<?php
/*  For testing:
    Use to convert a plain text password to a has for the database */

header('Content-Type: application/json');

$password = htmlspecialchars($_GET["pass"]);
$hashed = password_hash($password, PASSWORD_DEFAULT);
if ($password) 
{
    echo json_encode([
        "password" => $password,
        "hashed_pass" => $hashed,
    ], JSON_PRETTY_PRINT);
} 
else
{
    echo json_encode([
        "error" => "Requires \"pass\" parameter in url",
    ], JSON_PRETTY_PRINT);
}

?>