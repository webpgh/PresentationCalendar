<?php

require_once "DB.php";

session_start();

if ($_POST) {
    $db = new Database();

    if ($_FILES['file']['tmp_name'] == "") {
        header("Location: ../html/import_students.html");
        return;
    }

    $file = $_FILES['file']['tmp_name'];
    $fileName = $_FILES['file']['name'];
    $extension = explode('.', $fileName)[1];

    if ($extension != "csv") {
        header("Location: ../html/failed-import.html");
    }

    $handle = fopen($file, "r");

    while (($line = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $userName = $line[0];
        $email = $line[1];
        $facultyNumber = $line[2];
        $role = $line[3];

        $sql = "INSERT INTO student (Email, Username, Faculty_Number, role) values ('$email', '$userName', '$facultyNumber', '$role')";

        $query = $db->importStudents($sql);
    }

    if ($query) {
        header("Location: ../html/successful-import.html");
    } else {
        header("Location: ../html/failed-import.html");
    }
}
