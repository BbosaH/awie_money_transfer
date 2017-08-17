/**
 * Currency data Module controllers
 * Conatins angular js AMD controllers to relay data to Ui
 *
 * @author Lujja Henry Bbosa +256 777 777 557
 */

angular.module('controllers', ['services','angularModalService'])
.controller('HomeCtrl', ['$scope','GetData','Utilities','config','ModalService', function ($scope,GetData,Utilities,config,ModalService) {

 /*section angular .ready*/
    $scope.pass_code = '123456';
    $scope.transfering=0;
    $scope.report_toggle=0;
    $scope.report_toggle_value=0;
    $scope.account_report_toggle=0;
    $scope.balancing_report_toggle=0;
    $scope.transaction_report_toggle=0;
    $scope.me =JSON.parse(window.localStorage.getItem("current_user")) || {};

  if(_.isEmpty($scope.me))
  {
    //alert("tigidi");
    window.location.href=config.BaseURL+"index.html";
  }else{
    ////console.log("me is"+$scope.me);
  }

  $scope.user_type_id = $scope.me.userTypeId;
  $scope.branch_id = $scope.me.branchId;
  console.log('the branch ID jajsja'+$scope.branch_id);

  angular.element(window).ready(function()
  {
     $scope.static_currencies =
     {
        "USD" : 5,
        "DIRHAM" : 4,
        "RMB" : 3,
        "KSH" : 2,
        "UGX" : 1
     }

     $scope.user_id = $scope.me.id;
     //$scope.user_type_id =$scope.me.user_type_id;
     $scope.session_id =$scope.me.sessionId;
  	 $scope.toggle_value = 0;


  	 $scope.needed_data = {
		controller : 'users',
		action : "formsdetails",
		userid : $scope.user_id,
		sessionid : $scope.session_id
	}

    $scope.loading = 0;
	Utilities.submitData($scope.needed_data,(response)=>{
    		//tobe continued
    		//////console.log("hihihi" +response);
    		$scope.all_data =JSON.parse(response);

    		$scope.currencies = _.map($scope.all_data.data.currencies,(x)=>{

    			let currency = Currency();
    			currency.setName(x.name,x.symbol).setId(x.id);
    			return currency;

    		});

    		$scope.users = _.map($scope.all_data.data.users,(x)=>{

    			let user = User();
    			user.setUserName(x.userName);
    			user.setName(x.firstName,x.surname);
    			user.setEmail(x.email);
    			user.setPhone(x.phone);
    			user.setTime(x.time);
    			user.setId(x.id);
    			return user;


    		})
    		$scope.countries = _.map($scope.all_data.data.countries,(x)=>{

    			let country = Country();
    			country.setName(x.name);
    			country.setId(x.id);
    			return country;
    		})

    		$scope.branches =_.map($scope.all_data.data.branches,(x)=>{

    			let branch = Branch();
    			branch.setId(x.id);
    			branch.setLocation(x.location);
    			branch.setName(x.name);
    			return branch;
    		})
    		$scope.accountTypes = _.map($scope.all_data.data.accountTypes,(x)=>{
    			let accountType = AccountType();
    			accountType.setId(x.id);
    			accountType.setName(x.type);
    			accountType.setDescription(x.description);
    			return accountType;
    		})

    		$scope.idTypes = _.map($scope.all_data.data.ids,(x)=>{

    			let idtype = IdType();
    			idtype.setId(x.id);
    			idtype.setName(x.name);
    			return idtype;

    		});

    		$scope.transfer_accounts = _.map($scope.all_data.data.accounts,(x)=>{

    			let account  = Account();
    			account.setId(x.id);
    			account.setName(x.name);
    			return account;
    		});
            $scope.user_types = _.map($scope.all_data.data.userTypes,(x)=>{

                let user_type  = UserType();
                user_type.setId(x.id);
                user_type.setName(x.name);
                return user_type;

            })

    		////console.log($scope.all_data);
    });

  	// $scope.user_id = 1; // $scope.current_user.id;
     //$scope.branch_id =1; //1window.localStorage.getItem("current_branch_id");

  	 //$scope.current_user

     $scope.loading=1;

    });



  /*end section angular. ready*/


/*section universal*/
  $scope.toggleShow=function(item)
  {
  	////alert("tigidi");

  	if(item==1)
  	{
  		//$scope.fillTable(item,'mine');
        $scope.toggle_value=item;



  	}else if (item==35) {

        //$scope.toggle_value=item;
        if($scope.user_type_id==3 || $scope.user_type_id==5){


            $scope.getAccountreport(item);

        }else{


            $scope.getAccountreport(item);

        }



    }else if(item==36)
    {
      $scope.toggle_value=item;
      $scope.getFullReport();
    }
    else{
  		$scope.toggle_value=item;
  	}
  	document.getElementById('my_nav_but').click();

  	//$scope.$apply();
  }





    //$scope.branch_id =1;
    $scope.print =function(classs)
    {
    	 //////console.log(n);
    	 var currency = classs();
    	 currency.setName("n.name");
    	 ////console.log(currency.getName());



    }




    /*section add country*/


    $scope.country_data =
    {
    	controller : "users",
    	action :'addcountry',
    	name : '',
    	user_id : $scope.user_id,
    	session_id : $scope.session_id

    }

    $scope.sendCountry =()=>{
    	//////console.log("chokolo",$scope.country_data.name);
    	Utilities.submitData($scope.country_data,(response)=>{
    		////console.log(response);
    		$scope.country_data.name ='';
    		$scope.$apply();
    	})
    }


    /* /end section add country*/

    /*section add currency*/
    $scope.currency_data =
    {
    	controller : "users",
    	action :'addcurrency',
    	name : '',
    	symbol : '',
        branch_id : '',
    	user_id : $scope.user_id,
    	session_id : $scope.session_id

    }

    $scope.sendCurrency =()=>{
    	//////console.log("chokolo",$scope.country_data.name);
    	Utilities.submitData($scope.currency_data,(response)=>{
    		////console.log(response);
    		$scope.currency_data.name ='';
    		$scope.$apply();
    	})
    }
    /* /end section add currency*/


    /*section add branch*/

    $scope.branch_data =
    {

    	controller : "users",
    	action :'addbranch',
    	name : '',
    	location :  '',
    	supervisor_id : 1,
    	country_id : 1	,
    	user_id : $scope.user_id,
    	session_id :$scope.session_id

    }

    $scope.sendBranch = () =>{
    	//////console.log("chokolo",$scope.country_data.name);
    	Utilities.submitData($scope.branch_data,(response)=>{
    		////console.log(response);
    		$scope.branch_data.name ='';
    		$scope.branch_data.location ='';
    		$scope.$apply();
    	})
    }

    /*/end section add branch*/

    /*add id type*/
    $scope.id_type_data =
    {
    	controller : "users",
    	action :'addidtype',
    	name : '',
    	user_id : $scope.user_id,
    	session_id : $scope.session_id
    }
    $scope.sendIdType=()=>{
    	Utilities.submitData($scope.id_type_data,(response)=>{
    		////console.log(response);
    		$scope.id_type_data.name ='';
    	})
    }

    /*end add idtype*/

    /*section add acount*/

    $scope.account_data =
    {
    	controller : "users",
    	action :'addaccount',
    	name : '',
    	account_type_id : '',
    	currency_id : '',
    	user_id : $scope.user_id,
    	session_id : $scope.session_id
    }

    $scope.sendAccount=()=>{
    	Utilities.submitData($scope.account_data,(response)=>{
    		////console.log(response);
    		$scope.account_data.name ='';
    	})
    }


    /*/end section add acount*/




    /*section create transfer*/
    $scope.transfer_data=
    {
    	controller :'transfers',
    	action:'createtransfer',
    	amount : '',
      transaction_type_id:1,
    	from_currency_id : '',
        to_currency_id : '',
        exchange_rate :0,
        amount_from_rate:0,
    	country_id : '',
    	charge : 0,
        charge_currency_id : '',
    	sfirst_name : '',
    	ssur_name :  '',
    	semail : '',
    	sphone_number : '',
    	sid_type_id : '',
    	sid_no : '',

        preffered_branch_id : '',
        account_no : '',

    	rfirst_name : '',
    	rsur_name :'',
    	remail : '',

    	rphone_number : '',

    	user_pass_code : $scope.pass_code,
    	transaction_password: '',

    	user_id : $scope.user_id,
    	session_id : $scope.session_id,
      branch_id : $scope.branch_id

    }
    $scope.holdTransfer =()=>{
      for(var i=0;i<$scope.currencies.length;i++)
      {
        if($scope.currencies[i].getId() == $scope.transfer_data.to_currency_id)
        {
          $scope.transfer_data.to_currency = $scope.currencies[i].getName();
        }
      }
    	$scope.toggle_value=15;

    }
    $scope.sendTransfer=()=>{
        //////console.log($scope.transfer_data.account_no);
      $scope.transfering=1;
    	Utilities.submitData($scope.transfer_data,(response)=>{
    		////console.log(response);
           $scope.transfering=0;

            var res_data = JSON.parse(response);

            if(res_data.success==1){

        		    $scope.trans_reference=res_data.data;
                $scope.transfer_data.amount ='';
                $scope.transfer_data.amount_from_rate ='';
                $scope.transfer_data.exchange_rate ='';
                $scope.transfer_data.charge ='';
        		    $scope.transfer_data.sfirst_name ='';
                $scope.transfer_data.ssur_name ='';
                $scope.transfer_data.semail ='';
                $scope.transfer_data.sphone_number ='';
                $scope.transfer_data.sid_no ='';
                $scope.transfer_data.rfirst_name ='';
                $scope.transfer_data.rsur_name ='';
                $scope.transfer_data.remail ='';
                $scope.transfer_data.remail ='';
                $scope.transfer_data.rphone_number ='';
                $scope.transfer_data.user_pass_code ='';
                $scope.transfer_data.transaction_code ='';
                $scope.toggle_value=23;
                $scope.$apply();

           }else if(res_data.success==0){
                $scope.error_msg = res_data.errormsg;
                $scope.toggle_value=22;
                $scope.$apply();
           }

    	})
    }


    $scope.xchangeInputChanged=()=>{


       if(Utilities.isEmpty($scope.transfer_data.amount)|| Utilities.isEmpty($scope.transfer_data.exchange_rate)){

       }else{

           if(Utilities.isDigit($scope.transfer_data.amount)&&Utilities.isDigit($scope.transfer_data.exchange_rate))
           {
                $scope.manageXchanges();
                $scope.$apply();
           }
       }

    }

    $scope.manageXchanges = ()=>{

        //console.log($scope.currencies[0]);

        for (var i = 0; i < $scope.currencies.length; i++) {
            if($scope.currencies[i].getId()==$scope.transfer_data.from_currency_id)
            {
                $scope.from_currency_name  = $scope.currencies[i].getName();
                ////console.log("kakakidididi"+$scope.currencies[i].getName());
            }
        }

        for (var j = 0; j < $scope.currencies.length; j++) {
            if($scope.currencies[j].getId()==$scope.transfer_data.to_currency_id)
            {
                $scope.to_currency_name  = $scope.currencies[j].getName();
                ////console.log("kaokioiodididi"+$scope.currencies[j].getName());
            }
        }

        const from_currency_rank = $scope.static_currencies[$scope.from_currency_name];
        const to_currency_rank = $scope.static_currencies[$scope.to_currency_name];
        if(from_currency_rank > to_currency_rank)
        {
            if($scope.transfer_data.exchange_rate > 1)
            {
                $scope.transfer_data.amount_from_rate = Utilities.multiplyByRate($scope.transfer_data.amount,$scope.transfer_data.exchange_rate);

            }else{

                $scope.transfer_data.amount_from_rate = Utilities.divideByRate($scope.transfer_data.amount,$scope.transfer_data.exchange_rate);

            }

        }else if(from_currency_rank < to_currency_rank)
        {
            if($scope.transfer_data.exchange_rate > 1)
            {
                $scope.transfer_data.amount_from_rate = Utilities.divideByRate($scope.transfer_data.amount,$scope.transfer_data.exchange_rate);

            }else{

                $scope.transfer_data.amount_from_rate = Utilities.multiplyByRate($scope.transfer_data.amount,$scope.transfer_data.exchange_rate);

            }

        }else{

        }



    }
    $scope.originalAmountChanged=()=>{
        //////console.log("kabadi");
        $scope.transfer_data.amount= Utilities.divideByRate($scope.transfer_data.amount_from_rate,$scope.transfer_data.exchange_rate);
        $scope.$apply();
    }

    /*/end create transfer*/

    /*section credit Transfer accounts*/
    $scope.transfer_credit_data = {

    	controller : 'transfers',
    	action : 'credittransferaccount',
    	amount : '',
      exchange_rate : '',
      amount_from_rate: '',
    	transfer_account_id:'',
    	user_id : $scope.user_id,
    	session_id : $scope.session_id,
      branch_id: $scope.branch_id

    }

    $scope.sendTransferCredit=()=>{
      console.log("The brsnch is is" , $scope.transfer_credit_data.branch_id);
    	Utilities.submitData($scope.transfer_credit_data,(response)=>{
    		////console.log(response);
    		//$scope.toggle_value=1;
            $scope.transfer_response = JSON.parse(response);
            if($scope.transfer_response.success==1)
            {
                $scope.transfer_credit_data.amount='';
                $scope.transfer_credit_data.exchange_rate='';
                $scope.toggle_value =21;
                $scope.$apply();

            }else if($scope.transfer_response.success==0)
            {
                $scope.error_msg = $scope.transfer_response.errormsg;
                $scope.toggle_value =22;
                $scope.$apply();
            }
    		//$scope.transfer_credit_data.amount ='';

    	})
    }

    $scope.xchangeCreditInputChanged=()=>{


       if(Utilities.isEmpty($scope.transfer_credit_data.amount)|| Utilities.isEmpty($scope.transfer_credit_data.exchange_rate)){

       }else{

           if(Utilities.isDigit($scope.transfer_credit_data.amount)&&Utilities.isDigit($scope.transfer_credit_data.exchange_rate))
           {
                $scope.transfer_credit_data.amount_from_rate = Utilities.multiplyByRate($scope.transfer_credit_data.amount,$scope.transfer_credit_data.exchange_rate);
                $scope.$apply();
           }
       }



    }


    /*/end section credit Transfer account*/

    /*credit Rmb*/

    $scope.transfer_credit_Rmb_data = {

    	controller : 'transfers',
    	action : 'creditrmb',
    	amount : '',
        user_name1 : '',
        password1 : '',
        user_name2 : '',
        password2 : '',
    	rmb_account_id:'',
    	user_id : $scope.user_id,
    	session_id : $scope.session_id

    }

    $scope.sendRmbCredit=()=>{

    	Utilities.submitData($scope.transfer_credit_Rmb_data,(response)=>{
    		////console.log(response);
    		$scope.crmb_response=JSON.parse(response);
            if($scope.crmb_response.success==1)
            {
               // $scope.transfer_credit_Rmb_data.amount ='';
                  $scope.transfer_credit_Rmb_data.amount='';
                  $scope.transfer_credit_Rmb_data.user_name1='';
                  $scope.transfer_credit_Rmb_data.password1='';
                  $scope.transfer_credit_Rmb_data.user_name2='';
                  $scope.transfer_credit_Rmb_data.password2='';
                  //$scope.success_msg = $scope.crmb_response.errormsg;
                  $scope.toggle_value =  21;
                  $scope.$apply();

            }else if($scope.crmb_response.success==0)
            {
                  $scope.error_msg = $scope.crmb_response.errormsg;
                  $scope.toggle_value =  22;
                  $scope.$apply();
            }


    	});
    }

    /*/end credit Rmb*/


    /*section withdraw*/

    $scope.withdraw_data =
    {

        controller :'transfers',
        action : 'transfercashout',
        user_pass_code : $scope.pass_code,
        transaction_reference : '',
        user_id : $scope.user_id,
        session_id : $scope.session_id,


    }
    $scope.sendWithdraw = ()=>{

        Utilities.submitData($scope.withdraw_data,(response)=>{
            ////console.log("hohohoh"+response);
            $scope.withdraw_details = JSON.parse(response);
            if($scope.withdraw_details.success==1)
            {
                $scope.toggle_value=18;
                $scope.withdraw_data.user_pass_code="";
                console.log('the brought transction ref is'+$scope.withdraw_details.data.transferRef);
                console.log("whats on scope is"+$scope.withdraw_data.transaction_reference);
                //$scope.withdraw_data.transaction_reference="";
                $scope.$apply();
            }


            ////console.log($scope.withdraw_details);
        });
    }

    $scope.withdraw_complete_data = {

        controller :'transfers',
        action : 'completetransfercashout',
        transaction_password : '',
        transaction_reference :$scope.withdraw_data.transaction_reference,
        rid_no : '',
        rid_type_id : '',
        user_id : $scope.user_id,
        session_id : $scope.session_id,
        branch_id : $scope.branch_id
    }

    $scope.completeWithdraw  = () => {
        console.log('i swear whats on scope is'+ $scope.withdraw_complete_data.transaction_reference);
        Utilities.submitData($scope.withdraw_complete_data,(response)=>{

            //////console.log(response);
            $scope.response_data = JSON.parse(response);

            switch($scope.response_data.success){
                case 0:
                    $scope.error_msg = $scope.response_data.errormsg;
                    $scope.toggle_value=22;
                    $scope.$apply();
                break;
                case 1:
                    $scope.withdraw_complete_data.transaction_password ="";
                    $scope.withdraw_complete_data.transaction_reference ="";
                    $scope.withdraw_complete_data.rid_no ="";
                    $scope.success_msg = $scope.response_data.data ;
                    $scope.toggle_value=21;
                    $scope.$apply();
                break;
                default:

                break;
            }


        });
    }

    /*/end section withdraw*/




    /*section exchange structure*/
    $scope.exchanging =0;
    $scope.exchange_data =
    {
        controller : 'exchange',
        action : 'createexchange',
        amount : '',
        from_currency_id : '',
        to_currency_id : '',
        exchange_rate : '',
        amount_from_rate : '',
        user_id : $scope.user_id,
        session_id : $scope.session_id,
        branch_id : $scope.branch_id

    }

    $scope.send_exchange_data = function()
    {
        $scope.exchanging =1;
        Utilities.submitData($scope.exchange_data,(response)=>{
            ////console.log(response);
            //$scope.toggle_value=1;
            $scope.exchange_response = JSON.parse(response);
            if($scope.exchange_response.success==1)
            {
                $scope.exchange_data.amount='';
                $scope.exchange_data.exchange_rate='';
                $scope.toggle_value =21;
                $scope.exchanging =0;
                $scope.$apply();

            }else if($scope.exchange_response.success==0)
            {
                $scope.error_msg = $scope.exchange_response.errormsg;
                $scope.toggle_value =22;
                $scope.exchanging =0;
                $scope.$apply();
            }
            //$scope.transfer_credit_data.amount ='';

        })

    }

    $scope.xchangeInputChanged_x=()=>{


       if(Utilities.isEmpty($scope.exchange_data.amount)|| Utilities.isEmpty($scope.exchange_data.exchange_rate)){

       }else{

           if(Utilities.isDigit($scope.exchange_data.amount)&&Utilities.isDigit($scope.exchange_data.exchange_rate))
           {
                $scope.manageXchanges_x();
                $scope.$apply();
           }
       }

    }

    $scope.manageXchanges_x = ()=>{

        //console.log($scope.currencies[0]);

        for (var i = 0; i < $scope.currencies.length; i++) {
            if($scope.currencies[i].getId()==$scope.exchange_data.from_currency_id)
            {
                $scope.from_currency_name  = $scope.currencies[i].getName();
                ////console.log("kakakidididi"+$scope.currencies[i].getName());
            }
        }

        for (var j = 0; j < $scope.currencies.length; j++) {
            if($scope.currencies[j].getId()==$scope.exchange_data.to_currency_id)
            {
                $scope.to_currency_name  = $scope.currencies[j].getName();
                ////console.log("kaokioiodididi"+$scope.currencies[j].getName());
            }
        }

        const from_currency_rank = $scope.static_currencies[$scope.from_currency_name];
        const to_currency_rank = $scope.static_currencies[$scope.to_currency_name];
        if(from_currency_rank > to_currency_rank)
        {
            if($scope.exchange_data.exchange_rate > 1)
            {
                $scope.exchange_data.amount_from_rate = Utilities.multiplyByRate($scope.exchange_data.amount,$scope.exchange_data.exchange_rate);

            }else{

                $scope.exchange_data.amount_from_rate = Utilities.divideByRate($scope.exchange_data.amount,$scope.exchange_data.exchange_rate);

            }

        }else if(from_currency_rank < to_currency_rank)
        {
            if($scope.exchange_data.exchange_rate > 1)
            {
                $scope.exchange_data.amount_from_rate = Utilities.divideByRate($scope.exchange_data.amount,$scope.exchange_data.exchange_rate);

            }else{

                $scope.exchange_data.amount_from_rate = Utilities.multiplyByRate($scope.exchange_data.amount,$scope.exchange_data.exchange_rate);

            }

        }else{

        }



    }

    /*/end exchange structure*/


    /*section showing modal*/

    $scope.showSuccessModal = function() {
        ModalService.showModal({
            templateUrl: 'success_modal.html',
            controller: "HomeCtrl"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.message = "You said " + result;
            });
        });
    };


    $scope.showErrorModal = function() {
        ModalService.showModal({
            templateUrl: 'error_modal.html',
            controller: "HomeCtrl"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.message = "You said passed test";
            });
        });
    };

    /*end section shwoing model*/



    /*get reports*/

    $scope.account_report_data=
    {
        controller :'transfers',
        action : 'getallaccountbalances',
        branch_id : $scope.branch_id,
        user_id : $scope.user_id,
        session_id  : $scope.session_id

    }

    $scope.getAccountreport =(item)=>{
        //$scope.account_counter=1;
        Utilities.submitData($scope.account_report_data,(response)=>{
            ////console.log(response);
            $scope.accounts_data = JSON.parse(response);
            $scope.accounts_reported =$scope.accounts_data.data;
            $scope.accounts_branch_name =$scope.accounts_data.branchName;
            $scope.account_report_toggle=0;
            $scope.toggle_value=item;
            $scope.$apply();

        });
    }

    $scope.getIndividualAccountreport =(item)=>{
        //$scope.account_counter=1;
        Utilities.submitData($scope.account_report_data,(response)=>{
            console.log('yooyooouoyoyo');
            $scope.accounts_data = JSON.parse(response);
            $scope.accounts_reported =$scope.accounts_data.data;
            $scope.accounts_branch_name =$scope.accounts_data.branchName;
            $scope.account_report_toggle=1;
            $scope.toggle_value=item;
            $scope.$apply();

        });
    }

    $scope.full_report_data ={
      controller :'reports',
      action : 'getreportdata',
      branch_id : $scope.branch_id,
      user_id : $scope.user_id,
      user_type_id : $scope.user_type_id,
      session_id  : $scope.session_id,

    }

    $scope.getFullReport = ()=>{

      Utilities.submitData($scope.full_report_data,(response)=>{
          //console.log('yooykkxkooouoyoyo');
          $scope.report_data = JSON.parse(response);
          if($scope.report_data.success==1)
          {
            $scope.todays_date = $scope.report_data.today;
            $scope.report_info = $scope.report_data.data;

            if($scope.user_type_id==1)
            {


              _($scope.report_info).map((x)=>{

                my_display_accounts = displayAccounts(x.accounts,x.balances,$scope.all_data.data.currencies);
                x.my_accounts = my_display_accounts.filter(( element )=>{
                   return element !== []._;
                });
                x.transactions_today = x.transactions_today.filter(( element )=>{
                   return (element !== []._ && element !== null && element !== 0)  ;
                });

                x.cashins = getCashIns(x.transactions_today,$scope.all_data.data.currencies,x.branch.id).filter(( element )=>{
                   return (element !== []._ && element !== null && element !== 0)  ;
                });
                x.cashouts = getCashouts(x.transactions_today,$scope.all_data.data.currencies,x.branch.id).filter(( element )=>{
                   return (element !== []._ && element !== null && element !== 0)  ;
                });

                x.transaction_no = x.transactions_today.length;

                return x;
               }
              );

             console.log($scope.report_info);

              $scope.report_toggle_value=1;
              $scope.$apply();

            }else if($scope.user_type_id==2){

              _($scope.report_info).map(function(x){

                var my_display_accounts = displayAccounts(x.accounts,x.balances,$scope.all_data.data.currencies);
                x.my_accounts = my_display_accounts.filter(function( element ) {
                   return element !== []._;
                });
                x.transactions_today = x.transactions_today.filter(function( element ) {
                   return (element !== []._ && element !== null && element !== 0)  ;
                });

                x.cashins = getCashIns(x.transactions_today,$scope.all_data.data.currencies,x.branch.id).filter(function( element ) {
                   return (element !== []._ && element !== null && element !== 0)  ;
                });
                x.cashouts = getCashouts(x.transactions_today,$scope.all_data.data.currencies,x.branch.id).filter(function( element ) {
                   return (element !== []._ && element !== null && element !== 0)  ;
                });

                x.transaction_no = x.transactions_today.length;

                return x;
               }
              );



              console.log($scope.report_info);
              $scope.report_toggle_value=2;
              $scope.$apply();
            }else{



                var my_display_accounts = displayAccounts($scope.report_info.accounts,$scope.report_info.balances,$scope.all_data.data.currencies);
                $scope.report_info.my_accounts = my_display_accounts.filter(function( element ) {
                   return element !== []._;
                });
                $scope.report_info.transactions_today = $scope.report_info.transactions_today.filter(function( element ) {
                   return (element !== []._ && element !== null && element !== 0)  ;
                });
               $scope.report_info.transaction_no = $scope.report_info.transactions_today.length;

               $scope.report_info.cashins = getCashIns($scope.report_info.transactions_today,$scope.all_data.data.currencies,$scope.report_info.branch.id).filter(function( element ) {
                  return (element !== []._ && element !== null && element !== 0)  ;
               });
               $scope.report_info.cashouts = getCashouts($scope.report_info.transactions_today,$scope.all_data.data.currencies,$scope.report_info.branch.id).filter(function( element ) {
                  return (element !== []._ && element !== null && element !== 0)  ;
               });
              //  x.cashins = getCashIns(x.transactions_today,$scope.all_data.data.currencies);
              //  x.cashouts = getCashouts(x.transactions_today,$scope.all_data.data.currencies);

              console.log($scope.report_info);
              $scope.report_toggle_value=3;
              $scope.$apply();
            }
          }else{
              $scope.toggle_value=22;
              $scope.$apply();
          }


      });

    }



    $scope.transfer_logs_data = {

        controller : 'reports',
        action :'gettransferlogs',
        user_id:$scope.user_id,
        branch_id: $scope.branch_id,
        account_id:'',
        session_id:$scope.session_id
    }
    $scope.getTransferRecords =()=>{
        //$scope.account_counter=1;

        Utilities.submitData($scope.transfer_logs_data,(response)=>{

            //console.log(response);
            $scope.transfer_records_data = JSON.parse(response);
            $scope.transfer_records_reported = $scope.transfer_records_data.data;
           // $scope.accounts_branch_name = $scope.accounts_data.branchName;
            $scope.$apply();


        });

    }

    $scope.getIndividualBranchTransferRecords = ()=>{

            Utilities.submitData($scope.transfer_logs_data,(response)=>{

                //console.log(response);
                $scope.transfer_records_data = JSON.parse(response);


                if($scope.transfer_records_data.success==1)
                {

                    $scope.transfer_records_reported = $scope.transfer_records_data.data;
                    $scope.transaction_report_toggle=1;
                    $scope.accounts_branch_name = $scope.transfer_records_data.branchName;
                    $scope.$apply();
                }


                $scope.$apply();

            });

    }


    /*end reports*/


    /*logout*/
    $scope.logout_data={
        controller: "users",
        action : "logout",
        user_id : $scope.user_id,
        session_id : $scope.session_id
    }

    $scope.log_out =()=>{

        Utilities.submitData($scope.logout_data,(response)=>{
            ////console.log(response);
            $scope.logout_response = JSON.parse(response);
            if($scope.logout_response.success==1)
            {
              window.localStorage.clear();
              window.location.href=config.BaseURL+"index.html";
              $scope.$apply();
            }else
            {

              window.localStorage.clear();
              window.location.href=config.BaseURL+"index.html";
              $scope.$apply();

            }

        });
    }




    /*end / logout*/

    /*reset password*/


    $scope.reset_password ={
        controller : 'users',
        action : 'resetpassword',
        old_password : '',
        new_password : '',
        user_id : $scope.user_id,
        session_id : $scope.session_id
    }

    $scope.sendReset = ()=>{

        Utilities.submitData($scope.reset_password,(response)=>{

                $scope.after_reset_data =JSON.parse(response);

                if($scope.after_reset_data.success==1){

                    $scope.success_msg =$scope.after_reset_data.data;
                    $scope.log_out();
                    //$scope.toggle_value=21;
                   // $scope.$apply();

                }else if($scope.after_reset_data.success==0)
                {
                    $scope.error_msg = $scope.after_reset_data.errormgs ;
                    $scope.toggle_value=22;
                    $scope.$apply();
                }
        })

    }
    /*end/ reset/password*/

    /*section get balancing report*/

        $scope.balancing_report_data ={
            controller : 'transfers',
            action : 'getbalances',
            branch_id : '',
            user_id : $scope.user_id,
            session_id : $scope.session_id,
            my_date : ''

        }

        $scope.getBalancingReport = function(item)
        {
            Utilities.submitData($scope.balancing_report_data,(response)=>{

                console.log(response);
                $scope.reported_account_balances_data = JSON.parse(response);
                if($scope.reported_account_balances_data.success==1)
                {
                    $scope.reported_account_balances = $scope.reported_account_balances_data.data;
                    $scope.$apply();
                }



            });
        }


        $scope.individual_balancing_report_data ={

            controller : 'transfers',
            action : 'getbalances',
            user_id : $scope.user_id,
            session_id : $scope.session_id,
            my_date : ''

        }

        $scope.getIndividualBranchBalancingReport = (item)=>{

            Utilities.submitData($scope.individual_balancing_report_data,(response)=>{

                console.log(response);
                $scope.reported_account_balances_data = JSON.parse(response);
                if($scope.reported_account_balances_data.success==1)
                {

                    $scope.reported_account_balances = $scope.reported_account_balances_data.data;
                    $scope.balancing_report_toggle=1;
                    $scope.$apply();
                }



            });
        }



    /* /end section get balancing report*/


    /**/

    $scope.add_user=
    {
        controller : 'users',
        action : 'adduser',
        first_name : '',
        sur_name : '',
        email : '',
        phone : '',
        branch_id : '',
        user_type_id : '',
        user_id : $scope.user_id,
        session_id : $scope.session_id
    }

    $scope.addUser = ()=>{

        Utilities.submitData($scope.add_user,(response)=>{
            ////console.log(response);
            //$scope.toggle_value=1;
            $scope.user_cre_response = JSON.parse(response);
            if($scope.user_cre_response.success==1)
            {
                $scope.add_user.first_name='';
                $scope.add_user.sur_name='';
                $scope.add_user.email='';
                $scope.add_user.phone='';
                $scope.toggle_value =21;
                $scope.$apply();

            }else if($scope.user_cre_response.success==0)
            {
                $scope.error_msg = $scope.user_cre_response.errormsg;
                $scope.toggle_value =22;
                $scope.$apply();
            }
            //$scope.transfer_credit_data.amount ='';

        })
    }

    /*report renders*/


    $scope.goToAccountReport=()=>{

        //alert('tigidi');
        $scope.report_toggle=0;
        if($scope.user_type_id==3){
            //$scope.account_report_toggle=1;
            $scope.getIndividualAccountreport(35);
        }else{
            $scope.getAccountreport(35);
        }
        //$scope.$apply();
    }


    $scope.goToAccountBalancesReport=()=>{
        //alert('togodo');
        //$scope.toggle_value=35;
        $scope.report_toggle=1;
        //alert($scope.report_toggle);

        if($scope.user_type_id==3){
            $scope.getIndividualBranchBalancingReport();
        }else{
            $scope.getBalancingReport();
        }

        //$scope.$apply();
    }

    $scope.goToTransactionsReport=()=>{
        //alert('tugudu');
        $scope.report_toggle=2;
        //$scope.transaction_report_toggle=0;
        if($scope.user_type_id==3){
            $scope.getIndividualBranchTransferRecords();
        }else{
            $scope.getTransferRecords();
        }
    }

    $scope.goToExchangeReport=()=>{
        alert('tugudu');
        $scope.report_toggle=3;
        $scope.transaction_report_toggle=0;
    }


    /*end report renders*/


    /*direct_debit_data*/

    $scope.debitting =0;
    $scope.direct_debit_data =
    {
        controller : 'transfers',
        action : 'directdebitcashout',
        sender : '',
        receiver : '',
        amount : '',
        currency_id : '',
        account_number : '',
        user_id : $scope.user_id,
        session_id : $scope.session_id,
        branch_id:$scope.branch_id
    }

    $scope.sendDirectDebit=()=>{
        $scope.debitting =1;
        Utilities.submitData($scope.direct_debit_data,(response)=>{

            $scope.debit_response = JSON.parse(response);
            if($scope.debit_response.success==1)
            {
                    $scope.success_msg = $scope.debit_response.data ;
                    $scope.toggle_value=21;
                    $scope.debitting =0;
                    $scope.$apply();
            }else{

                    $scope.error_msg = $scope.debit_response.errormg ;
                    $scope.toggle_value=22;
                    $scope.debitting =0;
                    $scope.$apply();

            }

        });
    }



    $scope.spending = 0;

    $scope.expense_data = {

        controller :'transfers',
        action : 'createexpense',
        amount :'',
        currency_id : '',
        details : '',
        user_id : $scope.user_id,
        session_id : $scope.session_id,
        branch_id : $scope.branch_id
    }

    $scope.sendExpense = ()=>{
        $scope.spending = 1;
        Utilities.submitData($scope.expense_data,(response)=>{
            $scope.expense_response = JSON.parse(response);
            if($scope.expense_response.success==1)
            {       $scope.success_msg = $scope.expense_response.data ;
                    $scope.toggle_value=21;
                    $scope.spending = 0;
                    $scope.$apply();

            }else if($scope.expense_response.success==0)
            {
                    $scope.error_msg = $scope.expense_response.errormgs ;
                    $scope.toggle_value=22;
                    $scope.spending = 0;
                    $scope.$apply();
            }

        });

    }

    /*send money to  branch*/
    $scope.branch_sending =0;
    $scope.send_money_data =
    {
        controller : 'transfers',
        action : 'sendmoney',
        amount : '',
        from_account_id : '',
        to_account_id : '',
        charge : '',
        user_id : $scope.user_id,
        session_id : $scope.session_id,
        branch_id : $scope.branch_id
    }

    $scope.sendMoneyToBranch=()=>{
         $scope.branch_sending =1;
        Utilities.submitData($scope.send_money_data,(response)=>{

            $scope.send_money_response = JSON.parse(response);
            if($scope.send_money_response.success==1)
            {
                    $scope.success_msg = $scope.send_money_response.data ;
                    $scope.toggle_value=21;
                     $scope.branch_sending =0;
                    $scope.$apply();
            }else{

                    $scope.error_msg = $scope.send_money_response.errormg ;
                    $scope.toggle_value=22;
                     $scope.branch_sending =0;
                    $scope.$apply();

            }

        });
    }


    $scope.indi_sending =0;

    $scope.send_money_indi =
    {
        controller : 'transfers',
        action : 'createexpense',
        amount : '',
        currency_id : '',
        details : 'send_to_indi',
        user_id : $scope.user_id,
        session_id : $scope.session_id,
        branch_id : $scope.branch_id
    }



    $scope.sendMoneyToIndividual = ()=>{
        $scope.indi_sending =1;
        Utilities.submitData($scope.send_money_indi,(response)=>{

            $scope.send_money_indi_response = JSON.parse(response);
            if($scope.send_money_indi_response.success==1)
            {
                    $scope.success_msg = $scope.send_money_indi_response.data ;
                    $scope.toggle_value=21;
                     $scope.indi_sending =0;
                    $scope.$apply();
            }else{

                    $scope.error_msg = $scope.send_money_indi_response.errormsg ;
                    $scope.toggle_value=22;
                     $scope.indi_sending =0;
                    $scope.$apply();

            }

        });


    }




}]).controller('AuthCtrl', ['$scope','config','GetData','Utilities',($scope,config,GetData,Utilities)=> {

window.localStorage.clear();

$scope.logingin=0;

angular.element(window).ready(()=>{

});

$scope.alert_toggle = 0;


$scope.login_data  = {

		controller : 'users',
		action : 'login',
		username :'',
		password : '',
		//username : 'hbm',
	    //password : '321580'
}

$scope.login =()=>{

	Utilities.submitData($scope.login_data,(response)=>{

        $scope.login_res = JSON.parse(response);
        if($scope.login_res.success==1)
        {
            $scope.current_user = $scope.login_res.data;
            window.localStorage.setItem("current_user",JSON.stringify( $scope.current_user));
            window.location.href=config.BaseURL+"index.html#/home";

        }else if($scope.login_res.success==0)
        {
            $scope.error_msg = $scope.login_res.errormsg;
            $scope.alert_toggle = -1;
            $scope.$apply()
        }
		//to be continued
		//window/////console.log("The data hahah" + response);

	});
}






}])
