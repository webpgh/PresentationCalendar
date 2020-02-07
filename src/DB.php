<?php

class Database
{

    private $connection;
    private $selectUser;
    private $selectedPresentations;

    public function __construct()
    {
        $this->init();
    }

    /**
     * Create connection to the database on given host, database name, user name and password
     * Then create some prepared statements, which we will use frequently
     */
    private function init()
    {
        
        $config = parse_ini_file("..\config\config.ini", true);

        $host = $config['db']['host'];
        $dbname = $config['db']['name'];
        $user = $config['db']['user'];
        $password = $config['db']['password'];

        try {
            $this->connection = new PDO(
                "mysql:host=$host;dbname=$dbname",
                $user,
                $password,
                array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")

            );

            $this->prepareStatements();
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }


    /**
     * Create some prepared statements, which we will use frequently
     */
    private function prepareStatements()
    {
        $sql = "SELECT * FROM student WHERE Username=:user AND Faculty_Number=:faculty_number";
        $this->selectUser = $this->connection->prepare($sql);

        $selectPresentationsQuery = "SELECT Username, Theme, Type, Start_Time 
                                     FROM Student_Presentation JOIN Presentation ON Ref_Presentation_ID = Presentation.ID
                                                               JOIN Student ON Ref_Student_ID = Student.ID
                                                               JOIN PresentationType ON Presentation.Presentation_Type_ID = PresentationType.ID";

        $this->selectedPresentations = $this->connection->prepare($selectPresentationsQuery);
    }

    /**
     * We use this method to execute select queries
     * We only execute the created prepared statement for selecting user in DB with new database
     * If the query was executed successfully, we return the result of the executed query
     */
    public function selectUserQuery($data)
    {
        try {
            // $this->selectUser->bindValue()

            $this->selectUser->execute($data);
            return array("success" => true, "data" => $this->selectUser);

        } catch (PDOException $e) {

            echo "Connection failed: " . $e->getMessage();
            return (array("success" => false, "error" => $e->getMessage()));
        }
    }

    public function selectPresentationsQuery()
    {
        try {

            $this->selectedPresentations->execute();

            $result = $this->selectedPresentations->fetchAll();
            $jsonData = json_encode($result);

            return array("success" => true, "data" => $result); 
            
        } catch(PDOException $e) {

            echo "Connection failed: " . $e->getMessage();
            return (array("success" => false, "error" => $e->getMessage()));
        }
    }

    /**
     * Close the connection to the DB
     */
    function __destruct()
    {
        $this->connection = null;
    }
}