<?php

function EncryptPayload($data, $secretKey)
{
    // Email and password are the same. Encrypt
    // Create token header as a JSON string
    $header = json_encode([
        'alg' => 'HS256',
        'typ' => 'JWT'
    ]);

    // Create token payload as a JSON string
    $payload = json_encode($data);

    // Encode Header to Base64Url String
    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

    // Encode Payload to Base64Url String
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

    // Create Signature Hash using secret key from "api_config"
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secretKey, true);

    // Encode Signature to Base64Url String
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

    // Create JWT (json web token)
    $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    return $jwt;
}

?>