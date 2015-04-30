module.factory('$data', function() {
	return {};
});

module.controller('ContactDetailController', function($scope, $data) {
	//$scope.item = $data.selectedItem;
	var contacDetailtItems = {
		items: []
	};
	if (angular.isArray($data.selectedItem.voornaam) === true) {
		numOfCont = $data.selectedItem.voornaam.length;

		for (i = 0; i < numOfCont; i++) {

			if (angular.isArray($data.selectedItem.omschrijving) === true)
				var descr = $data.selectedItem.omschrijving[i];
			else
				var descr = $data.selectedItem.omschrijving;
			console.log($data.selectedItem.voornaam[i]);

			contacDetailtItems.items.push({


				voornaam: $data.selectedItem.voornaam[i],
				achternaam: $data.selectedItem.achternaam[i],
				email: $data.selectedItem.email[i],
				telefoonnummer: $data.selectedItem.telefoonnummer[i],
				omschrijving: descr


			});

		}

	} else {
		//console.log($data.selectedItem.voornaam);
		if (!angular.isUndefined($data.selectedItem.voornaam)) {
			contacDetailtItems.items.push({

				voornaam: $data.selectedItem.voornaam,
				achternaam: $data.selectedItem.achternaam,
				email: $data.selectedItem.email,
				telefoonnummer: $data.selectedItem.telefoonnummer,
				omschrijving: $data.selectedItem.omschrijving,
				picture: $data.selectedItem.picture

			});
		}

	}
	$scope.lists = contacDetailtItems.items;
});

module.controller('ContactenController', function($scope, $http, $data) {
	$scope.fetchContacten = function() {
		$http({
			method: 'GET',
			url: 'http://srv6.mvdw-software.com/workspace/StuvoBackend/xml/xml.php'
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
						telefoonnummer: contactData['telefoonnummer'],
						omschrijving: contactData['omschrijving'],
						picture: contactData['picture']

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
	$scope.showDetail = function(index) {

		var selectedItem = $scope.items[index];
		$data.selectedItem = selectedItem;
		contactNavi.pushPage('contactDetail.html');
	};
});