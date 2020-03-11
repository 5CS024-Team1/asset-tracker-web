<?php

/// Decrypts a potential API token using a secret key
function DecryptPayload($apiToken, $secretKey)
{
    $result = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+', explode('.', $apiToken)[1]))));
    return $result;
}

?>