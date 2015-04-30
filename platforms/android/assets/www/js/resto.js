 module.controller('RestoController', function($scope, $http, $data) {
 	$scope.fetchResto = function() {
 		$http({
 			method: 'GET',
 			url: 'http://srv6.mvdw-software.com/workspace/StuvoBackend/public_html/api/resto.php?campus=' + getSetting('campus')
 		}).
 		success(function(data, status) {
 			document.getElementById('resto-ma-loading').className = "";
 			document.getElementById('resto-di-loading').className = "";
 			document.getElementById('resto-wo-loading').className = "";
 			document.getElementById('resto-do-loading').className = "";
 			document.getElementById('resto-vr-loading').className = "";
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
 			document.getElementById('resto-ma-loading').className = "hidden";
 			document.getElementById('resto-di-loading').className = "hidden";
 			document.getElementById('resto-wo-loading').className = "hidden";
 			document.getElementById('resto-do-loading').className = "hidden";
 			document.getElementById('resto-vr-loading').className = "hidden";

 			switch (new Date().getDay()) {
 				case 0:
 					$scope.section = document.getElementById('ma').value;
 					break;
 				case 1:
 					$scope.section = document.getElementById('ma').value;
 					break;
 				case 2:
 					$scope.section = document.getElementById('di').value;
 					break;
 				case 3:
 					$scope.section = document.getElementById('wo').value;
 					break;
 				case 4:
 					$scope.section = document.getElementById('do').value;
 					break;
 				case 5:
 					$scope.section = document.getElementById('vr').value;
 					break;
 				case 6:
 					$scope.section = document.getElementById('ma').value;
 					break;
 			}
 		}).
 		error(function(data, status) {
 			$scope.data = data || "Request failed";
 			$scope.status = status;
 		});

 	}

 	$scope.fetchResto();
 });