 module.controller('RestoController', function($scope, $http, $data) {
 	$scope.fetchResto = function() {
 		$http({
 			method: 'GET',
 			url: 'http://srv5.mvdw-software.com/workspace/StuvoBackend/html/resto.php'
 		}).
 		success(function(data, status) {
 			var newsData = {
 				items: []
 			};
 			$.each(data['menu'], function(dag, dagData) {
 				newsData.items[dag] = {
 					maaltijden: []
 				};
 				$.each(dagData, function(voeding, voedingData) {
 					newsData.items[dag].maaltijden.push({
 						name: voeding,
 						voeding: voedingData
 					});
 				});
 			});
 			$scope.items = newsData.items;
 		}).
 		error(function(data, status) {
 			$scope.data = data || "Request failed";
 			$scope.status = status;
 		});
 	}

 	$scope.fetchResto();
 });