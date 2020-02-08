<?php

require_once "DB.php";

session_start();

header("Content-type: application/json");
$errors = [];

$db = new Database();
$themes = $db->getThemes();

if ($themes["success"]) {
    $response = ["success" => true, "themes" => $themes["data"]];
} else {
    $response = ["success" => false, "data" => $errors];
}

echo json_encode($response);
