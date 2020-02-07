<?php

require_once "DB.php";

session_start();


if ($_POST) {

    $db = new Database();
    $file = $_FILES['file']['tmp_name'];

    $handle = fopen($file, "r");
    $counter = 0;

    while (($line = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $userName = $line[0];
        $email = $line[1];
        $facultyNumber = $line[2];
        $role = $line[3];

        $sql = "INSERT INTO student (Email, Username, Faculty_Number, role) values ('$email', '$userName', '$facultyNumber', '$role')";

        $query = $db->executeQuery($sql);

        $counter = $counter + 1;
    }

    if ($query) {
        echo "Data inserted successfully";
    } else {
        echo "Error occured";
    }
}
