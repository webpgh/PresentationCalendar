<?php

require_once "Student.php";

session_start();

header("Content-type: application/json");
$errors = [];

if ($_POST) {
    $data = json_decode($_POST["data"], true);

    if ($data["userName"] && $data["facultyNumber"]) {
        $student = new Student($data["userName"], $data["facultyNumber"]);
        $isValid = $student->isValid();

        if ($isValid["success"]) {
            $_SESSION["userName"] = $student->getUsername();
            $_SESSION["password"] = $student->getFacultyNumber();
        } else {
            $errors[] = $isValid["error"];
        }
    }

    if ($errors) {
        $response = ["success" => false, "data" => $errors];
    } else {
        $response = ["success" => true];
    }

    /**
     * Return response to the user
     */
    echo json_encode($response);
} else {
    echo json_encode(array("succes" => false, "error" => "No such user found!"));
}
