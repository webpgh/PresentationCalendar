<?php

require_once "DB.php";

session_start();

if ($_POST) {
    $db = new Database();

    if ($_FILES['file']['tmp_name'] == "") {
        header("Location: ../html/calendar.html");
    }

    $file = $_FILES['file']['tmp_name'];
    $fileName = $_FILES['file']['name'];
    $extension = explode('.', $fileName)[1];

    if ($extension != "csv") {
        echo 'Extension of the file must be .csv';
        return;
    }

    $handle = fopen($file, "r");
    $counter = 0;

    while (($line = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $userName = $line[0];
        $email = $line[1];
        $facultyNumber = $line[2];
        $role = $line[3];

        // $sql = "INSERT INTO student (Email, Username, Faculty_Number, role) values ('$email', '$userName', '$facultyNumber', '$role')";

        $query = $db->importStudents(array("Email"=>$email ,"Username" => $this->userName, "Faculty_Number" => $this->facultyNumber, "role" => $role));

        $counter = $counter + 1;
    }

    if ($query) {
        echo "Data inserted successfully";
    } else {
        echo "Error occured";
    }
}
