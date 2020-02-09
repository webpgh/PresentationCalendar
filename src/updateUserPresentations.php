<?php

require_once "DB.php";

session_start();
header("Content-type: application/json");

$errors = [];
$students = [];

$data = json_decode($_POST["data"], true);
$db = new Database();

$query = $db->updateUserPresentations(array(
    "currentUser" => $data["currentUserID"],
    "presentationID" => $data["presentationID"],
    "startDate" => $data["startDate"],
    "endDate" => $data["endDate"]
));

if ($query["success"]) {
    $response = ["success" => true];
} else {
    $response = ["success" => false];
}

/**
 * Return response to the user
 */
echo json_encode($response);
