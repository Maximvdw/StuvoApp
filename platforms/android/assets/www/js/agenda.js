module.controller('AppController', function($scope) {

});

module.controller('EventDetailController', function($scope, $data) {
	$scope.item = $data.selectedItem;
	$scope.share = function() {
		window.plugins.socialsharing.share('Stuvo Event: ', null, null, $scope.item.link);
	}
	$scope.addToCalendar = function() {
		addToCalendar($scope.item.name, '', $scope.item.description, $scope.item.startyear, $scope.item.startmonth,
			$scope.item.startday, $scope.item.starthour, $scope.item.startminute, $scope.item.endyear, $scope.item.endmonth,
			$scope.item.endday, $scope.item.endhour, $scope.item.endminute);
	}
	$scope.map = function() {
		window.location = 'http://maps.google.com/maps?q=' + $scope.item.location;
	}
});

module.factory('$data', function() {
	return {};
});

module.controller('EventMasterController', function($scope, $http, $data) {
	$scope.maanden = JSON.parse(window.localStorage.getItem('events'));
	$scope.fetchNews = function() {
		$http({
			method: 'GET',
			url: 'http://srv5.mvdw-software.com/workspace/StuvoBackend/html/agenda.php'
		}).
		success(function(data, status) {
			document.getElementById('agenda-loading').className = "";
			var maandData = {
				maanden: []
			};
			$.each(data['events'], function(month, eventData) {
				var itemData = {
					items: []
				};
				$.each(eventData, function(eventId, event) {
					itemData.items.push({
						shortdate: event['date']['short'],
						name: event['name'],
						description: event['description'],
						startyear: event['date']['startyear'],
						startmonth: event['date']['startmonth'],
						startday: event['date']['startday'],
						starthour: event['date']['starthour'],
						startminute: event['date']['startminute'],
						endyear: event['date']['endyear'],
						endmonth: event['date']['endmonth'],
						endday: event['date']['endday'],
						endhour: event['date']['endhour'],
						endminute: event['date']['endminute'],
						location: event['location']
					});
				});
				maandData.maanden.push({
					name: month,
					items: itemData.items
				});
			});
			$scope.maanden = maandData.maanden;
			if ($scope.items != null) {
				window.localStorage.setItem('events', JSON.stringify($scope.maanden));

			}
			document.getElementById('agenda-loading').className = "hidden";
		}).
		error(function(data, status) {
			$scope.data = data || "Request failed";
			$scope.status = status;
		});
	};


	$scope.refreshEvents = function($done) {
		$http({
			method: 'GET',
			url: 'http://srv5.mvdw-software.com/workspace/StuvoBackend/html/agenda.php'
		}).
		success(function(data, status) {
			var maandData = {
				maanden: []
			};
			$.each(data['events'], function(month, eventData) {
				var itemData = {
					items: []
				};
				$.each(eventData, function(eventId, event) {
					itemData.items.push({
						shortdate: event['date']['short'],
						name: event['name'],
						description: event['description'],
						startyear: event['date']['startyear'],
						startmonth: event['date']['startmonth'],
						startday: event['date']['startday'],
						starthour: event['date']['starthour'],
						startminute: event['date']['startminute'],
						endyear: event['date']['endyear'],
						endmonth: event['date']['endmonth'],
						endday: event['date']['endday'],
						endhour: event['date']['endhour'],
						endminute: event['date']['endminute'],
						location: event['location']
					});
				});
				maandData.maanden.push({
					name: month,
					items: itemData.items
				});
			});
			$scope.maanden = maandData.maanden;
			document.getElementById('agenda-loading').className = "hidden";
		}).
		error(function(data, status) {
			$scope.data = data || "Request failed";
			$scope.status = status;
		}).
		finally(function() {
			$done();
		});
	};

	$scope.fetchNews();

	$scope.showDetail = function(maand, index) {
		var selectedItem = $scope.maanden[maand].items[index];
		$data.selectedItem = selectedItem;
		eventNavi.pushPage('eventDetail.html', {
			title: selectedItem.title
		});
	};
});