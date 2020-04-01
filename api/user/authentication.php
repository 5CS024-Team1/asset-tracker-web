<?php

class Authentication
{
    // Validates a payload using it's signature token against a secret key
    public static function validatePayload($apiToken, $secretKey)
    {
        // Split apiToken and check it has a signature
        $contents = explode('.', $apiToken);
        // Check string has exactly 3 parts
        // The header, contents and signature
        
        if (sizeof($contents) != 3)
            return false;

        $signature = $contents[2];

        // Decrypt input apiToken payload and then re-encrypt with secret key
        $payload = Authentication::DecryptPayload($contents[1]);
        $encrypt = Authentication::EncryptPayload($payload, $secretKey);
        
        // Explode and combare
        $encryptedExploded = explode('.', $encrypt);
        $encryptedSignature = $encryptedExploded[2];
        // Does the original apiToken signature match the new one
        return $signature == $encryptedSignature;
    }

    /// Encrypts a payload with a secret key
    public static function encryptPayload($data, $secretKey)
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

    /// Decrypts a payload section of a JWT
    public static function decryptPayload($payloadToken)
    {
        $result = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+', $payloadToken))));
        return $result;
    }

    // Check if authorization header is set and validates the auth token
    public static function requestContainsAuth($server, $secretKey)
    {
        $isValidAuth = false;
        if (isset($server["HTTP_AUTHORIZATION"])) {
            $auth = $server["HTTP_AUTHORIZATION"];
            $split = explode(' ', $auth);
            $isValidAuth = Authentication::validatePayload($split[1], $secretKey);
        }

        return $isValidAuth;
    }
}



?>