<?php 

/**
 * Transaction data Model
 * Model construct for Transaction database information
 *
 * @author Lujja Henry Bbosa +256 777 777 557
 */

class Transaction
{

	private $id;
	private $remmiter;
	private $beneficiary;
	private $branch_id;
	private $user_id;
	private $amount;
	private $transaction_type_id;
	private $date_created;
	private $transaction_code;
	private $currency_id;
	private $transaction_status_id;
		
 
    function __construct($remmiter,$beneficiary,$branch_id,$user_id,$amount,$transaction_type_id,$date_created,$transaction_code,$currency_id,$transaction_status_id) { 

    	$this->remmiter = $remmiter;
    	$this->beneficiary = $beneficiary;
    	$this->branch_id =$branch_id; 
    	$this->user_id = $user_id;
    	$this->amount =$amount;
    	$this->transaction_type_id = $transaction_type_id;
    	$this->date_created = time();
    	$this->transaction_code = $transaction_code;
    	$this->currency_id = $currency_id;
    	$this->transaction_status_id = $transaction_status_id;



    }

    public function getRemmiter()
    {
    	return $this->remmiter;
    }

    public function setRemmiter( $remmiter)
    {
        $this->remmiter = $remmiter;
    }
    
    public function getBeneficiary()
    {
    	return $this->beneficiary;
    }
    public function setBeneficiary($beneficiary)
    {
        $this->beneficiary = $beneficiary;
    }
    
    public function getBranchId()
    {
    	return $this->branch_id;
    }
    public function setBranchId($branchId)
    {
        $this->branchId = $branchId;
    }

    public function getUserId()
    {
    	return $this->user_id;
    }
    public function setUserId ($user_id)
    {
        $this->user_id = $user_id;
    }


    public function getAmount()
    {
    	return $this->amount;
    }
    public function setAmount($amount)
    {
        $this->amount = $amount;
    }

    public function getTransactionTypeId()
    {
    	return $this->transaction_type_id;
    }
    public function setTransactionTypeId($transaction_type_id)
    {
        $this->transaction_type_id = $transaction_type_id;
    }

    public function getDateCreated()
    {
    	return $this->date_created;
    }
    public function setDateCreated($date_created)
    {
        $this->date_created = $date_created;
    }

    public function getTransactionCode()
    {
    	return $this->transaction_code;
    }
    public function setTransactionCode($transaction_code)
    {
        $this->transaction_code = $transaction_code;
    }

    public function getCurrencyId()
    {
    	return $this->currency_id;
    }
    public function setCurrencyId($currency_id)
    {
        $this->currency_id = $currency_id;
    }

    public function getTransactionStatusId()
    {
    	return $this->transaction_status_id;
    }
    public function setTransactionStatusId($transaction_status_id)
    {
        $this->transaction_status_id = $transaction_status_id;
    }

    public function getId()
    {
        return $this->id;
    }
    public function setId($id)
    {
        $this->id = $id;
    }
}





?>

