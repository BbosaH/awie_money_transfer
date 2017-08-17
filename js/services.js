/**
 * custom services
 * Module that contains service functions that will
 * be used in several Angular controllers
 * @author Klockren Software
 */

angular.module('services', [])
.factory("GetData",['$http','$q',function($http,$q)
{

  var getDataPromise = function(link)
  {


    var headers = {

      'Access-Control-Allow-Origin' : '*',
      'X-Parse-Application-Id' : 'xxxx',
      'Content-Type' : 'application/json'

    }


    var deffered = $q.defer();

      $http.get(link,headers).
        then(function(response) {

          deffered.resolve(response)
        }, function(response) {

          deffered.reject(response)
      });
      return deffered.promise;

  };

  return{

    getData: function(link,callback)
    {
         getDataPromise(link).then(function(data){

            mydata=data.data;
            ////console.log(data.data);

            callback(data.data);

          },function(error){


          });

    }

  };


}])
.factory('Utilities', ['config',function (config) {

    var submitData=function(request_data,callback)
	{
		$.ajax({

			url : config.PostLink, //link,
			type: "POST",
			data: {
			   'request' : request_data
			},
			cache : true,
			//processData: false,
			//contentType: false,
			dataType : 'jsonp',
			success: function(response) {
			    console.log(response);
			    callback(response);
			    			//window.location.href=config.BaseURL+"#/home";
			},
			error: function(jqXHR, textStatus, errorMessage) {

			}

		});


	}

    var isValid =(val)=>!_.isUndefined(val)&&_.isNull(val);

    var isEmpty = (str)=> (!str || 0 === str.length);

    var isDigit = (val)=> !isNaN(val);

    var multiplyByRate =(x,y)=>x*y;
    var divideByRate =(x,y)=>x/y;

 	return {

 		submitData: submitData,
 		isValid : isValid,
 		multiplyByRate : multiplyByRate,
 		isEmpty : isEmpty,
 		isDigit : isDigit,
 		divideByRate : divideByRate

 	};

 }]).constant('config', {


        BaseURL: 'http://localhost/swipe_track/',
        BaseServerURL: 'http://localhost/swipe_track/server/',
        BaseImageURL : 'http://localhost/swipe_track/uploads/',
        PostLink : 'http://localhost/mtapi/switch.php'
        //PostLink : 'http://awiegroup.com/mtapi/switch.php'
        //PostLink : 'http://localhost/mtapi/switch.php'


 })
