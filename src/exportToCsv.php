<?php

session_start();

header("Content-type: application/json");
$errors = [];
$rows = [];
$headers = array("Username", "Faculty Number", "Email", "Theme", "Type", "Start Time");


if($_POST) {
    $data = json_decode($_POST["data"], true);

    foreach($data as $user) {
        $row = array("Username" => $user["Username"],
                     "Faculty Number" => $user["Faculty_Number"],
                     "Email" => $user["Email"],
                     "Theme" => $user["Theme"],
                     "Type" => $user["Type"],
                     "Start Time" => $user["Start_Time"]);

        array_push($rows, $row);
    }
    
    $fh = fopen("../exportedStudents/exported.csv", "w");

    fputcsv($fh, $headers);

    foreach($rows as $row) {
        fputcsv($fh, $row);
    }

    echo $fh;
    fclose($fh);

}