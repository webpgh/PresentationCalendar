<?php

require_once "DB.php";

session_start();

header("Content-type: application/json");
$errors = [];

$db = new Database();
$presentations = $db->selectPresentationsQuery();

if ($presentations["success"]) {
    $response = ["success" => true, "presentations" => $presentations["data"]];
} else {
    $response = ["success" => false, "data" => $errors];
}

echo json_encode($response);
