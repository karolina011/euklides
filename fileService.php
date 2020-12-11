<?php

function createFile($type, $keyArray)
{
    $myfile = fopen($type.".key", "w+") or die("Unable to open file!");
    fwrite($myfile, $keyArray[0] . "\n");
    fwrite($myfile, $keyArray[1] . "\n");
    fclose($myfile);
}

/**
 * Saving keys
 */
if ($_POST && $_POST['action'] == 'saveKeys')
{
    /**
     * Saving public key
     */
    $publicKeyArray = explode(',', $_POST['publicKey']);

    createFile('public', $publicKeyArray);

    /**
     * Saving private key
     */
    $privateKeyArray = explode(',', $_POST['privateKey']);

    createFile('private', $privateKeyArray);

}

die('cxcxc');