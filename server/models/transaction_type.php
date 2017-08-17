<?php

/**
 * Transaction Type data Model
 * Model construct for Transaction Type database information
 *
 * @author Lujja Henry Bbosa +256 777 777 557
 */


class TransactionType
{
	private $id =0;
	private $name;
	private $description;
	private $date_created;
	private $active;

	function __construct($name,$description,$date_created,$active)
	{
		$this->name = $name;
		$this->description = $description;
		$this->date_created = $date_created;
		$this->active =$active;
	}

	public function getName()
	{
      return $this->name;
	}
	public function setName($name)
	{
       $this->name =$name;
	}

	public function getDescription()
	{
		return $this->description;
	}

	public function setDescription($description)
	{
		 $this->description = $description;
	}


	public function getDateCreated()
	{
		return $this->date_created;
	}
	public function setDateCreated($date_created)
	{
		$this->date_created = $date_created;
	}


	public function getActive()
	{
		return $this->active;
	}

	public function setActive($active)
	{
		$this->active = $active;
	}

	

	public  function getId()
	{
		return $this->id;
	}
	public function setId($id)
	{
       $this->id = $id;
	}


}

 ?>