  String.prototype.trunc = String.prototype.trunc ||
  	function(n) {
  		return this.length > n ? this.substr(0, n - 1) + ' ...' : this;
  };
  module.controller('AppController', function($scope) {

  });

  module.controller('NewsDetailController', function($scope, $data) {
  	$scope.item = $data.selectedItem;
  	$scope.share = function() {
  		window.plugins.socialsharing.share('Stuvo Nieuws: ', null, null, $scope.item.link);
  	}
  	var keuze = $scope.item.desc.length;
  	//Pas de voorwaarde aan indien men wil dat de desc meer chars moet bevatten eer tekst rond img komt
  	if (keuze >= 250) document.getElementById("imgNieuwsDet").align = "left";
  });

  module.factory('$data', function() {
  	return {};
  });

  module.controller('NewsMasterController', function($scope, $http, $data) {
  	$scope.limit = 25;
  	$scope.maxLimit = 250;
  	$scope.itemScopes = [];
  	$scope.items = JSON.parse(window.localStorage.getItem('news'));

  	$scope.fetchNews = function() {
  		$scope.isLoading = true;
  		$http({
  			method: 'GET',
  			url: 'http://srv6.mvdw-software.com/workspace/StuvoBackend/public_html/api/nieuws.php?limit=' + $scope.limit
  		}).
  		success(function(data, status) {
  			var newsData = {
  				items: []
  			};
  			$.each(data['data'], function(postId, postData) {
  				var description = (postData['name'] == null ? postData['message'] : postData['description']);
  				newsData.items.push({
  					title: postData['name'],
  					label: jQuery.timeago(postData['created_time']),
  					desc: description,
  					descshort: description == null ? "" : description.trunc(250),
  					picture: postData['picture'],
  					link: postData['link'],
  					loading: 0
  				});
  			});
  			$scope.items = newsData.items;
  			window.localStorage.setItem('news', JSON.stringify($scope.items));
  			for (var i = 0; i < $scope.itemScopes.length; i++) {
  				$scope.itemScopes[i].item = $scope.items[i];
  			}
  			$scope.isLoading = false;
  		}).
  		error(function(data, status) {
  			$scope.data = data || "Request failed";
  			$scope.status = status;
  		});
  	}

  	$scope.refreshNews = function($done) {
  		$http({
  			method: 'GET',
  			url: 'http://srv6.mvdw-software.com/workspace/StuvoBackend/public_html/api/nieuws.php?limit=' + $scope.limit
  		}).
  		success(function(data, status) {
  			$scope.isLoading = true;
  			var newsData = {
  				items: []
  			};
  			$.each(data['data'], function(postId, postData) {
  				var description = (postData['name'] == null ? postData['message'] : postData['description']);
  				newsData.items.push({
  					title: postData['name'],
  					label: jQuery.timeago(postData['created_time']),
  					desc: description,
  					descshort: description == null ? "" : description.trunc(250),
  					picture: postData['picture'],
  					link: postData['link'],
  					loading: 0
  				});
  			});
  			if (data['data'].length < $scope.limit) {
  				$scope.maxLimit = data['data'].length;
  			}
  			$scope.items = newsData.items;
  			window.localStorage.setItem('news', JSON.stringify($scope.items));
  			for (var i = 0; i < $scope.itemScopes.length; i++) {
  				$scope.itemScopes[i].item = $scope.items[i];
  			}
  			$scope.isLoading = false;
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
  	$scope.fetchNewNews = function() {
  		if ($scope.isLoading) return;
  		$scope.isLoading = true;
  		$scope.limit += 25;
  		$scope.refreshNews();
  		$scope.isLoading = false;
  	};

  	$scope.showDetail = function(index) {
  		var selectedItem = $scope.items[index];
  		$data.selectedItem = selectedItem;
  		newsNavi.pushPage('nieuwsDetail.html', {
  			title: selectedItem.title
  		});
  	};
  });