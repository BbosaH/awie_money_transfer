<?php
 
/**
 * Class to handle all db operations . Contains functions that access the mysql database. 
 * It is the data access layer or class
 *
 * @author Lujja Henry Bbosa
 */
require_once 'models/transaction.php';
class Dao {
 
    private $conn;

    
    /**
     * Dao constructor function
     * @param none
     * @return object of type DbHandler
     */

    function __construct() {
        
        require_once 'DBConnector.php';
        require_once 'PasswordCrypt.php';
        // opening db connection
        $db = new DBConnector();
        $this->conn = $db->connect();
    }


 
     /**
     * Checking user login
     * @param String $email User signup email id
     * @param String $password User signup password
     * @param String $status User signup status active or inactive
     * @return interger indicating User signup status success or fail
     */
 
    public function signup($email,$password,$status){
        require_once 'PasswordCrypt.php';
        $response = array();
        $date_created = time();
 
       

        if (!$this->isPresent($email)) {
            // Generating password hash
            $password_hash = PasswordCrypt::password_hash($password);
            $stmt = $this->conn->prepare("INSERT INTO user(email,password,status) VALUES ('".$email."','".$password_hash."','".$status."')");
           
            $result = $stmt->execute();
 
 
            // Check for successful insertion
            if ($result) {
                
                return SUCCESSFULLY_SIGNED_UP;
                

            } else {
                
                return SIGNUP_FAILED;
            }
        } else {
            
            return USER_ALREADY_EXISTED;
        }
 
        return $response;
    }

 
    /**
     * Checking user login
     * @param String $email User login email id
     * @param String $password User login password
     * @return boolean User login status success/fail
     */
    public function loginUser($email, $password) {
       
        
        $users = $this->getAll("SELECT *FROM user WHERE email ='".$email."' AND active = 1");
        if(!empty($users))
        {
          $password_hash =$users[0]['password'];
        
       
            if (PasswordCrypt::compare_pass($password_hash, $password)) {
                
                return $users[0];
                
            } else {
                
                return 0;
            }
        } else {
            
            return -1;
        }
    }


    /**
     * Social login  to handle login with facebook or google
     * @param Object $data_obj object that contains source of data and user credentails
     * @return Integer SocialUser login status success or fail
     */

    public function socialLogin($data_obj )
    {
        $sql = "SELECT *FROM user where  email='".$data_obj['email']."'";

        $res = $this->getAll($sql);
        if(count($res)==1)
        {
            return USER_ALREADY_EXISTED;

        }else if(count($res)==0)
        {
                $querystring = "INSERT INTO user (name,email,social_id,source)VALUES ('".$data_obj['name']."','".$data_obj['email']."','".$data_obj['social_id']."','".$data_obj['source']."')";

                $query = $this->conn->prepare($querystring);
                
                try{
                    $query->execute();
                    
                    return SUCCESSFULLY_SIGNED_UP;
                   
                }catch(PDOException $ex){
                    
                     return LOGIN_FAILED;
                }

        }


    }

    
 
    /**
     *
     * Checking for if user is present using  email address
     * @param String $email user email to be checked in database
     * @return boolean indicating user exists or not
     *
     */
    private function isPresent($email) {

        $userPresent = false;
        $query = $this->conn->query("SELECT id from user WHERE email ='".$email."'");
        $rows = $query->fetchAll(PDO::FETCH_ASSOC); 
        if(count($rows)>0)
        {
            $userPresent = true;
        }else
        {
           $userPresent = false; 
        }
        return $userPresent;

        
    }

 
    /**
     *
     * Utility function to get all data from database according to querystring if type 'Select'
     * and execute all other querystrings
     * @param String $querystring any sql query passed
     * @return array rows from database
     *
     */
 
    
    public function getAll($querystring)
    {
        try{
            
            if(strpos($querystring, "SELEC") !== false){
                $query = $this->conn->query($querystring);
                $rows = $query->fetchAll(PDO::FETCH_ASSOC); 
                
                return $rows;
            }
            else
             {
                $query = $this->conn->prepare($querystring);
                $query->execute();
                return;

             } 
            


        }catch(PDOException $ex){
            die($ex->getMessage());
        }

        return;
    }

    /**
     *
     * Utility function to get a specific row of data from a databasw if
     * @param String $querystring any sql query passed
     * @return array rows from database
     *
     */

    public function getOne($querystring)
    {

        try{
            
            if(strpos($querystring, "SELEC") !== false){
                $query = $this->conn->query($querystring);
                $rows = $query->fetchAll(PDO::FETCH_ASSOC); 

                if(!empty($rows))
                {
                  return $rows[0];  
                }
                return "No data in table";
                
            }
            

        }catch(PDOException $ex){
            die($ex->getMessage());
        }
    }


     /**
     *
     * Utility function to insert  to the database
     * 
     * @param String $querystring any sql query passed
     * @return array rows from database
     *
     */

     public function registerData($data_obj)
     {

            $runCase =0;
            switch (true)
            {
                case ($data_obj instanceof Transaction):


                    $stmt = $this->conn->prepare("INSERT INTO transaction(remmiter,beneficiary,branch_id,user_id,amount,transaction_type_id,date_created,transaction_code,currency_id,transaction_status_id) VALUES ('".$data_obj->getRemmiter()."','".$data_obj->getBeneficiary()."','".$data_obj->getBranchId()."','".$data_obj->getUserId()."','".$data_obj->getAmount()."','".$data_obj->getTransactionTypeId()."','".$data_obj->getDateCreated()."','".$data_obj->getTransactionCode()."','".$data_obj->getCurrencyId()."','".$data_obj->getTransactionStatusId()."')");
                    $runCase = 1;


                break;

                case ($data_obj instanceof TransactionType):

                    $runCase =2;

                break;

                default :

                break;
            }

            try{

                $result = $stmt->execute();
                // Check for successful insertion
                if ($result) {

                    switch($runCase)
                    {
                        case 1:

                        $my_last_transaction = $this->getOne("SELECT *FROM transaction WHERE branch_id='".$data_obj->getBranchId()."' AND user_id = '".$data_obj->getUserId()."' ORDER BY id DESC LIMIT 1;");
                        
                        return $my_last_transaction ;

                        break;

                        case 2:
                    }
                            
                    return SUCCESSFULLY_SIGNED_UP;
                            

                } else {
                            
                    return SIGNUP_FAILED;
                }
            
            }catch(PDOException $ex){
                die($ex->getMessage());
            }

            
        

     }

     

    
    
    

   
}
 
?>