module.controller('SponsorsController', function($scope, $http) {
	$scope.fetchSponsor = function() {
		$http({
			method: 'GET',
			url: 'http://srv5.mvdw-software.com/workspace/StuvoBackend/html/sponsor.php'
		})
			.success(function(data, status) {
				var sponsItems = {
					items: []
				};
				$.each(data['sponser'], function(sponsId, sponserData) {

					sponsItems.items.push({
						naam: sponserData['naam'],
						beschrijving: sponserData['beschrijving'],
						link: sponserData['link'],
						image: sponserData['image']
					});
				});
				$scope.items = sponsItems.items;
			}).
		error(function(data, status) {
			$scope.data = data || "Request failed";
			$scope.status = status;
		});
	}


	$scope.fetchSponsor();

});