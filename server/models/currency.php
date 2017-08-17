<?php

/**
 * Currency data Model
 * Model construct for currency database information
 *
 * @author Lujja Henry Bbosa +256 777 777 557
 */

class Currency
{
	private $id = 0 ;
	private $name;
	private $symbol;
	private $country;
	private $active

	function __construct($name,$symbol,$country,$active)
	{
		$this->name= $name;
		$this->symbol = $symbol;
		$this ->country = $country;
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
	
	public function getSymbol()
	{
		return $this->symbol;

	}
	public function setSymbol($symbol)
	{
		$this->symbol =$symbol
	}

	public function getCountry()
	{
		return $this->country;
	}
	public function setCountry($country)
	{
		$this->country =$country
	}

	public function getId()
	{
		return $this->id;
	}
	public function setId($id)
	{
		$this->id = $id;
	}

	public function getActive()
	{
		return $this->active;
	}
	public function setActive($active)
	{
		$this->active =$active;
	}


}

 ?>