<?php

include_once("encrypt.php");
include_once("decrypt.php");

// Validates a payload using it's signature token against a secret key
function ValidatePayload($apiToken, $secretKey)
{
    // Split apiToken and check it has a signature
    $contents = explode('.', $apiToken);
    $signature = $contents[2];
    if (!$signature)
        return false;

    // Decrypt input apiToken payload and then re-encrypt with secret key
    $payload = DecryptPayload($contents[1]);
    $encrypt = EncryptPayload($payload, $secretKey);
    
    // Explode and combare
    $encryptedExploded = explode('.', $encrypt);
    $encryptedSignature = $encryptedExploded[2];
    // Does the original apiToken signature match the new one
    return $signature == $encryptedSignature;
}

?>