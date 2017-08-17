<?php
/**
 * Endpoint file : Api file where connections hit from and to the front end.
 * It accesses methods for login signup and login with facebook
 * @author Lujja Henry Bbosa
 */

require_once 'Dao.php';

$dao = new Dao();

	switch(true)
	{
		case (isset($_POST['login'])) :

			$email = $_POST['email'];
			$password = $_POST['password'];
			$status=1;
			$res=$dao->loginUser($email, $password);
			//echo json_encode($res);

			 if($res==-1 || $res == 0)
			 {
			 	$result =array( 'login_status' => 0 );
			 	echo json_encode($result);
			 }else{
			 	echo json_encode($res);
			 }

			

		break;
		case (isset($_POST['social_login'])) :

			$res=$dao->socialLogin($_POST);
			echo json_encode($res);

		break;
		case (isset($_POST['transaction_form'])) :

			$transaction = new Transaction($_POST['remmiter'],$_POST['beneficiary'],$_POST['branch_id'],$_POST['user_id'],$_POST['transaction_amount'],$_POST['transaction_type_id'],time(),$_POST['transaction_code'],$_POST['currency_id'],$_POST['transaction_status_id']);
			$res = $dao->registerData($transaction);

			$currency =$dao->getOne("SELECT symbol,name FROM currency WHERE id ='".$res['currency_id']."'");
			$transaction_type =$dao->getOne("SELECT name FROM transaction_type WHERE id ='".$res['transaction_type_id']."'");
			$res['currency'] = $currency['symbol']. ' ' .$currency['name'];
			$res['transaction_type']=$transaction_type['name'];
			echo json_encode($res);

		break;
		case (isset($_GET['currencies'])) :

		    $currencies = $dao->getAll("SELECT * FROM currency WHERE active = 1");
		    echo json_encode($currencies);


		break;
		case (isset($_GET['transaction_types'])) :

			$transaction_types =$dao->getAll("SELECT *FROM transaction_type WHERE active =1");
			echo json_encode($transaction_types);

		break;
		case (isset($_GET['transactions'])&&isset($_GET['user_id'])&&isset($_GET['branch_id'])) :

		    $final_res = [];

		   $res  = $dao->getAll("SELECT *FROM transaction WHERE user_id='".$_GET['user_id']."' AND branch_id='".$_GET['branch_id']."' ORDER BY id DESC ");

		   foreach($res as $result)
		   {
		   		 $transaction_type = $dao->getOne("SELECT name FROM transaction_type WHERE id='".$result['transaction_type_id']."'");
		         $currency = $dao->getOne("SELECT name,symbol FROM currency WHERE id ='".$result['currency_id']."'");

		          $result['transaction_type']=$transaction_type['name'];
		          $result['currency']=$currency['symbol']. ' ' .$currency['name'];

		         array_push($final_res,$result);
		   }
		  
		   switch(true)
		   {
		   	case($_GET['transactions']=='mine'):
		   		echo json_encode($final_res);
		   	break;
		   	case($_GET['transactions']=='report'):
		   		echo json_encode($final_res);
		   	break;
		   	default:
		   	    echo "no transactions";
		   	break;
		   }
		    
		   

		break;

		case(isset($_GET['report'])&&isset($_GET['branch_id'])&&isset($_GET['user_id'])):


		break;
		case (isset($_GET['login_branches'])):
			$branches = $dao->getAll("SELECT *FROM branch");
			echo json_encode($branches);
		break;
		default:
		   echo "Noting is set";
		break;
	}



// if(isset($_POST['login']))
// {

// 	$email = $_POST['email'];
// 	$password = $_POST['password'];
// 	$status=1;
// 	$res=$dao->loginUser($email, $password);
// 	echo json_encode($res);

// }else if(isset($_POST['social_login']))
// {
// 	$res=$dao->socialLogin($_POST);
// 	echo json_encode($res);
	
// }else if(isset($_POST['transaction_form']))
// {

// 	$transaction = new Transaction($_POST['remmiter'],$_POST['beneficiary'],$_POST['branch_id'],$_POST['user_id'],$_POST['transaction_amount'],$_POST['transaction_amount'],$_POST['transaction_type_id'],time(),$_POST['transaction_code'],$_POST['currency_id'],$_POST['transaction_status_id']);

// 	$res = $dao->registerData($transaction);
	

// }else if(isset($_GET['currencies']))
// {

// }

 ?>