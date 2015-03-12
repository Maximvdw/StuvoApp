// JavaScript Document

  module.controller('SponsorsController', function($scope, $http) {
     $scope.loadsponsor = function(){
    	 $http({method: 'GET', url: 'http://srv5.mvdw-software.com/workspace/StuvoBackend/html/sponsor.php'})
    	.success(function(data, status) {
            var contactItems = {items: []};
  			$.each( data['SPONSER'], function( sponsId, sponeserData ) {
  			
      	        contactItems.items.push(
  	             { 
            	  departement: contactData['departement'],
	              voornaam: contactData['voornaam'],
	              achternaam: contactData['achternaam'],
	              email: contactData['email'],
	              telefoonnummer: contactData['telefoonnummer']
        		 }
      	       );
            });
            $scope.items = contactItems.items;
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
        });
    }
    
    
    $scope.loadsponsor();
    
  });