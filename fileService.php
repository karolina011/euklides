<?php

function createFile($type, $keyArray)
{
    $myfile = fopen($type.".key", "w+") or die("Unable to open file!");
    fwrite($myfile, $keyArray[0] . "\n");
    fwrite($myfile, $keyArray[1]);
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

    exit;
}


if ($_POST && $_POST['action'] == 'saveFile')
{
    print_r($_POST);
    $file = fopen($_POST['fileName'], "w+") or die("Unable to open file!");
    fwrite($file, $_POST['fileContent']);
    fclose($file);
    exit;
}


if ($_GET && $_GET['action'] == 'getKeys')
{
    $privateKey = file_get_contents("private.key");
    $privateKey = str_replace("\n", ',', $privateKey);

    $publicKey  = file_get_contents("public.key");
    $publicKey = str_replace("\n", ',', $publicKey);

    echo json_encode(['publicKey' => $publicKey, 'privateKey' => $privateKey]);
    die;
}

if ($_GET && $_GET['action'] == 'getFileContent')
{
    echo json_encode(['fileContent' => file_get_contents($_GET['fileName'])]);
    die;
}
