<?php

session_start();

header("Content-type: application/json");
$errors = [];

if ($_GET) {
       
        $db = new Database();
        $presentations = $db->selectPresentationsQuery();

        if ($presentations["success"]) {
            $response = ["success" => true, "presentations" => $presentations["data"]];
        } else {
            $response = ["success" => false, "data" => $errors];
        }

    echo json_encode($response);

} else {
    echo json_encode(array("success" => false, "error" => "No presentations."));
}