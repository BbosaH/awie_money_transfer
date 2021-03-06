
var displayAccounts =(acc, bal,currencies) => {

    return _(acc).map(x =>{
        var b =_.find(bal,b =>{
          return  b.accountId === x.id;
        });
        var c = _.find(currencies,cu =>{
           return cu.id === x.currency_id
        });

        if(b){

          return {

              currency: c.name,
              openingBalance: Number(b.openingBalance).toLocaleString(),
              closingBalance: Number(b.closingBalance).toLocaleString()
          }

        }

    });
}

var getCashouts = (transactions,currencies,branch_id)=>{

  var cashouts = transactions
  .filter(trans =>{
    return(trans.transaction_type_id==2 || trans.transaction_type_id==3
    || trans.transaction_type_id==4 || trans.transaction_type_id==5
    || trans.transaction_type_id==6 || trans.transaction_type_id==7);
  }).map((x)=>{

    var c = _.find(currencies,cu =>{
      if(x.transaction_type_id==7 ){
        return cu.id === x.to_currency_id;
      }else if( x.transaction_type_id==5 ){
        return cu.id === x.from_currency_id;
      }else{
        return cu.id === x.currency_id;
      }
    });

    if(x.transaction_type_id==7){

      return{

        details : 'Exchange',
        amount : (x.amount_from_rate)? x.amount_from_rate : 0,
        charge : (x.charge)? x.charge : 0,
        currency : c.name


      };
   }else if(x.transaction_type_id==2  || x.transaction_type_id==3){
     return{

       details :'withdraw',
       amount : (x.amount)? x.amount : 0,
       charge : (x.charge)? x.charge : 0,
       currency : c.name


     };
   }else if(x.transaction_type_id==4 || x.transaction_type_id==6){

      return{
       details :(x.transaction_type_id==4)? 'Expense' : "To "+x.receiver_name,
       amount : (x.amount)? x.amount : 0,
       charge : (x.charge)? x.charge : 0,
       currency : c.name
      }

   }else if(x.transaction_type_id==5){

     if(x.branch_id==branch_id && x.to_branch_id !==branch_id){

       return{

         details :(x.transaction_type_id==2 || x.transaction_type_id==3)? 'withdraw' : 'To '+x.to_branch_name,
         amount : (x.amount)? x.amount : 0,
         charge : (x.charge)? x.charge : 0,
         currency : c.name


       };

     }
   }

   return;

  })





  return  cashouts ;



}

var getCashIns = (transactions,currencies,branch_id)=>{

  var cashins = transactions
  .filter(trans =>{
    return(trans.transaction_type_id==1 || trans.transaction_type_id==7
    || trans.transaction_type_id==5 || trans.transaction_type_id==80);

  })
  .map(trans =>{

    var num = Number(trans.amount);

    // trans.amount = num.toLocaleString(); //wanted to do commas but they refused
    trans.amount = num;
    var c = _.find(currencies,cu =>{
      if(trans.transaction_type_id==7 || trans.transaction_type_id==5){
         return cu.id == trans.to_currency_id;
      }else if(trans.transaction_type_id==1){
         return cu.id == trans.from_currency_id;
      }else{
        return cu.id == trans.currency_id;
      }

    });

    if(trans.transaction_type_id==1 || trans.transaction_type_id==7){

      return{

        details : (trans.transaction_type_id==1)? 'Transfer' : 'Exchange',
        amount : (trans.amount)? trans.amount:0,
        charge : (trans.charge)? trans.charge: 0,
        currency : c.name,
        transaction_type_id : trans.transaction_type_id
      };

    }else if(trans.transaction_type_id==5){
      if(trans.to_branch_id==branch_id && trans.branch_id !==branch_id){
        return{

          details : (trans.transaction_type_id==5)? "From "+trans.branch_name : 'Exchange',
          amount : (trans.amount)? trans.amount:0,
          charge : (trans.charge)? 0 : 0,
          currency : c.name,
          transaction_type_id : trans.transaction_type_id
        };

     }

    }

  })


 return cashins;


}
