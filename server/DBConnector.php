
<?php
/**
 * Class that contains returns instances of database connection.
 * It contains the connection object and establishes connection to database
 * 
 * @author Lujja Henry Bbosa
 */ 
class DBConnector 
{

	private $conn;
 
    function __construct() {        
    }
 
    /**
     * Establishing database connection
     * @return database connection handler
     */
    function connect() {
        require_once 'config.php';
 
        // Connecting to mysql database
 		$this->conn = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8',DB_UNAME,DB_PASS);
 		$this->conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

        // Check for database connection error
        if (mysqli_connect_errno()) {
            echo "database connection failed: " . mysqli_connect_error();
        }
 
        // returning connection PDO object
        return $this->conn;
    }
	
	
	

	



}

?>