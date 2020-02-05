<?php
require_once "DB.php";

/**
 * Use this class to manage a given user
 * Only this class will have direct access to user's data
 */
class Student
{
    private $id;
    private $email;
    private $userName;
    private $facultyNumber;
    private $role;

    /**
     * This is an object of type Database, which we will use to make queries to the DB
     */
    private $db;

    public function __construct($userName, $facultyNumber)
    {
        // $this->email = $email;
        $this->userName = $userName;
        $this->facultyNumber = $facultyNumber;
        // $this->role = $role;

        $this->db = new Database();
    }

    public function isValid()
    {
        $this->facultyNumber = intval($this->facultyNumber);
        $query = $this->db->selectUserQuery(array("user" => $this->userName, "faculty_number" => $this->facultyNumber));

        if ($query["success"]) {
            /**
             * $query["data"] holds a PDO object with the result of the executed query.
             * We can get the data from the returned result as associative array, calling 
             * the fetch(PDO::FETCH_ASSOC) method on $query["data"].
             */
            $user = $query["data"]->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                return array("success" => true);
            }
        } else {
            return array("success" => false, "error" => $query["error"]);
        }
    }

    /**
     * Get the user name of the user
     */
    public function getUsername()
    {
        return $this->userName;
    }

    /**
     * Get the password of the user
     */
    public function getFacultyNumber()
    {
        return $this->facultyNumber;
    }

    /**
     * Get the email of the user
     */
    public function getEmail()
    {
        return $this->email;
    }
}
