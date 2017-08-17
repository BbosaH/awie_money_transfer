/**
* starter Module
*
* Description
*/
'use strict';
angular.module('starter',['ngRoute','controllers']).config(['$routeProvider',function($routeProvider) {
$routeProvider
.when('/', {

 // route for the home page
	templateUrl: 'html/login.html',
	//templateUrl: 'html/home.html',
		
})
.when('/home', {

 // route for the home page
	templateUrl: 'html/home.html',
	//templateUrl: 'html/home.html',
	
	
})
.when('/reset', {

 // route for the home page
	templateUrl: 'html/reset_password.html',
	
	
})
.otherwise({

 //when all else fails
	templateUrl: 'html/page_not_found.html',

});


}]).
run([ function(){

	console.log("starter application running");

}])
