<?php

require_once "DB.php";

session_start();

header("Content-type: application/json");
$errors = [];

$db = new Database();
$availablePresentations = $db->getAvailablePresentations();

if ($availablePresentations["success"]) {
    $response = ["success" => true, "themes" => $availablePresentations["data"]];
} else {
    $response = ["success" => false, "data" => $errors];
}

echo json_encode($response);
