
/**
 * View  models
 * Conatins Models of datas to be displayed on the Ui
 *
 * @author Lujja Henry Bbosa +256 777 777 557
 */

var Currency = (function(){
	var name ='';
	var id ='';

	var getId =() => id;
	
	var getName = ()=> name;
	
	var setId =function(para_id){id = para_id;return this};
	
	var setName = function(para_name,para_symbol){name = para_name;return this;}
	
	return {

		getName : getName,
		getId : getId,
		setName : setName,
		setId : setId

	}
});

var TransactionType =(function(){
	var name ;
	var id ;

	var getName = () => name;
	var setName = (para_name) => { name = para_name ;} 

	var getId = () => id;
	var setId = (para_id) => {id = para_id ;}

	return{

		getId :  getId,
		setId : setId ,
		getName : getName,
		setName : setName
	}

	
});

var Transaction =(function()
{
	var id ;
	var transaction_code;
	var remmiter ;
	var beneficiary;
	var transaction_type;
	var amount;
	var currency;
	var number ;

	var getTransactionCode=()=>transaction_code;
	var getRemmiter =()=>remmiter;
	var getTransactionType = () => transaction_type;
	var getBeneficiary=()=> beneficiary;
	var getAmount =()=>amount;
	var getCurrency=()=>currency;
	var getId =()=>id;
	var getNumber = ()=> number;

	var setTransactionCode =function(x){transaction_code=x; }
	var setRemmiter = function(x){ remmiter=x;}
	var setTransactionType =function(x){ transaction_type = x ;  }
	var setBeneficiary =function(x){ beneficiary=x;  }
	var setAmount =function(x){ amount = x;  }
	var setCurrency =function(x){ currency = x; }
	var setId = function(x){ id = x;  }
	var setNumber = function(x){ number = x;  }

	return{

		getTransactionCode : getTransactionCode,
		getRemmiter : getRemmiter,
		getTransactionType : getTransactionType,
		getBeneficiary : getBeneficiary,
		getAmount : getAmount,
		getCurrency : getCurrency,
		getId :getId,
		getNumber : getNumber,

		setTransactionCode : setTransactionCode,
		setTransactionType : setTransactionType,
		setRemmiter : setRemmiter,
		setBeneficiary : setBeneficiary,
		setAmount  : setAmount,
		setCurrency : setCurrency,
		setId : setId ,
		setNumber : setNumber

	}


	
	
});

var Branch = (function()
 {
	var id;
	var name;
	var location;

	var getName =()=>name;
	var getId =()=> id;
	var getLocation =() => location;

	var setId=(c)=>{id=c;}
	var setName = (c)=>{name=c;}
	var setLocation = (c)=>{location=c;}

	return{

		getName : getName,
		getId : getId,
		getLocation:getLocation,

		setName : setName,
		setId : setId,
		setLocation: setLocation

	}

});

var User = (function()
{
	var user_name;
	var time ;
	var name;
	var email;
	var phone ;
	var id;

	var getUserName=()=>user_name;
	var getName=()=>name;
	var getEmail=()=>email;
	var getPhone=()=>phone;
	var getTime=()=>time;
	var getId =()=> id;

	var setUserName=(x)=>{user_name=x ;}
	var setName = (x,y)=>{name=x+' '+y ;}
	var setEmail = (x)=>{email=x; }
	var setPhone = (x)=>{phone=x;}
	var setTime =(x)=>{time=x;}
	var setId = (x)=>{id=x;}
	
	return {

		getUserName : getUserName,
		getName : getName,
		getEmail : getEmail,
		getPhone : getPhone,
		getTime : getTime,
		getId : getId,
		setUserName : setUserName,
		setName : setName,
		setEmail : setEmail,
		setPhone : setPhone,
		setTime : setTime,
		setId : setId

	}
	

});

var Country = (function(){
	var id;
	var name;
    
    var getId= ()=>id;
    var getName =()=>name;

    var setId =(x)=>{id=x;}
    var setName = (x)=>{name=x;}
	return{
		getId : getId,
		getName : getName,

		setName : setName,
		setId  : setId

	}
});


var IdType = (function(){
	var id;
	var name;
    
    var getId= ()=>id;
    var getName =()=>name;

    var setId =(x)=>{id=x;}
    var setName = (x)=>{name=x;}
	return{
		getId : getId,
		getName : getName,

		setName : setName,
		setId  : setId

	}
});

var UserType = (function(){
	var id;
	var name;
    
    var getId= ()=>id;
    var getName =()=>name;

    var setId =(x)=>{id=x;}
    var setName = (x)=>{name=x;}
	return{
		getId : getId,
		getName : getName,

		setName : setName,
		setId  : setId

	}
});

var AccountType =(function()
{
	var id;
	var name;
	var description;

	var getDescription = ()=>description;
	var getName =()=>name;
	var getId = ()=>id;

	var setDescription = (x)=>{description=x;}
	var setName =(x)=>{name=x;}
	var setId =(x)=>{id=x;}
	
	return{

		getName:getName,
		getId : getId,
		getDescription : getDescription,

		setDescription : setDescription,
		setName : setName,
		setId : setId

	}
});

var Account = (function()
{
	var id;
	var name;
    
    var getId= ()=>id;
    var getName =()=>name;

    var setId =(x)=>{id=x;}
    var setName = (x)=>{name=x;}

	return{
		getId : getId,
		getName : getName,

		setName : setName,
		setId  : setId

	};

});