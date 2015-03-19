  module.controller('ContactenController', function($scope, $http) {
  	$scope.fetchContacten = function() {
  		$http({
  			method: 'GET',
  			url: 'http://srv5.mvdw-software.com/workspace/StuvoBackend/xml/xml.php'
  		})
  			.success(function(data, status) {
  				var contactItems = {
  					items: []
  				};
  				$.each(data['contact'], function(contactId, contactData) {

  					contactItems.items.push({
  						departement: contactData['departement'],
  						voornaam: contactData['voornaam'],
  						achternaam: contactData['achternaam'],
  						email: contactData['email'],
  						telefoonnummer: contactData['telefoonnummer']
  					});
  				});
  				$scope.items = contactItems.items;
  			}).
  		error(function(data, status) {
  			$scope.data = data || "Request failed";
  			$scope.status = status;
  		});
  	}


  	$scope.fetchContacten();

  });