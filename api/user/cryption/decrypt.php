<?php

/// Decrypts a payload section of a JWT
function DecryptPayload($payloadToken)
{
    $result = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+', $payloadToken))));
    return $result;
}

?>