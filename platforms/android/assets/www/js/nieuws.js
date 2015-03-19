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
  	/* Dit is om bij nieuwsDetail.html ervoor te zorgen dat indien <=200 er tekst onder de foto komt en anders rond de foto
    var keuze = $scope.item.desc;
    if (keuze<=200 characters ) <img src="{{item.picture}}">
    else <img src="{{item.picture}}" align="left" style="margin: 0px 5px 0px 0px">
    */
  });

  module.factory('$data', function() {
  	return {};
  });

  module.controller('NewsMasterController', function($scope, $http, $data) {
  	$scope.page = 1;
  	$scope.fetchNews = function() {
  		$scope.isLoading = true;
  		$http({
  			method: 'GET',
  			url: 'http://srv5.mvdw-software.com/workspace/StuvoBackend/html/nieuws.php'
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
  					link: postData['link']
  				});
  			});
  			$scope.items = newsData.items;
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
  			url: 'http://srv5.mvdw-software.com/workspace/StuvoBackend/html/nieuws.php'
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
  					link: postData['link']
  				});
  			});
  			$scope.items = newsData.items;
  			$scope.isLoading = false;
  		}).
  		error(function(data, status) {
  			$scope.data = data || "Request failed";
  			$scope.status = status;
  		}).
  		finally(function() {
  			$done();
  		});
  	}

  	$scope.fetchNewNews = function() {
  		console.log('testtt');
  		if ($scope.isLoading) return;

  		$timeout(function() {

  			$scope.isLoading = false;
  		}, 3000);

  		$timeout(function() {
  			$scope.isLoading = true;
  		});
  	}

  	$scope.showDetail = function(index) {
  		var selectedItem = $scope.items[index];
  		$data.selectedItem = selectedItem;
  		newsNavi.pushPage('nieuwsDetail.html', {
  			title: selectedItem.title
  		});
  	};
  });