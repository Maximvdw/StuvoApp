  function fetchNews(){
  	
  }
  module.controller('AppController', function($scope) {
	
  });

  module.controller('NewsDetailController', function($scope,$data) {
    $scope.item = $data.selectedItem;
  });
  
  module.factory('$data',function(){
  	return {};
  });

  module.controller('NewsMasterController', function($scope, $http,$data) {
    $scope.fetchNews = function(){
    	document.getElementById('nieuws-loading').className = "";
    	$http({method: 'GET', url: 'http://srv5.mvdw-software.com/workspace/StuvoBackend/html/nieuws.php'}).
    	success(function(data, status) {
          var newsData = {items: []};
  			$.each( data['data'], function( postId, postData ) {
      	       newsData.items.push(
  	             { 
            	  title: postData['name'],
              	  label: jQuery.timeago(postData['created_time']),
	              desc: postData['name'] == null ? postData['message'] : postData['description'],
	              picture: postData['picture'],
	              link: postData['link']
        		 }
      	       );
            });
            $scope.items = newsData.items;
            document.getElementById('nieuws-loading').className = "hidden";
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
        });
    }
    
    $scope.refreshNews = function($done){
    	$http({method: 'GET', url: 'http://srv5.mvdw-software.com/workspace/StuvoBackend/html/nieuws.php'}).
    	success(function(data, status) {
          var newsData = {items: []};
  			$.each( data['data'], function( postId, postData ) {
      	       newsData.items.push(
  	             { 
            	  title: postData['name'],
              	  label: jQuery.timeago(postData['created_time']),
	              desc: postData['name'] == null ? postData['message'] : postData['description'],
	              picture: postData['picture'],
	              link: postData['link']
        		 }
      	       );
            });
            $scope.items = newsData.items;
            document.getElementById('nieuws-loading').className = "hidden";
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
        }).
        finally(function(){
        	$done();
        });
    }
    
    $scope.fetchNews();
    
    $scope.showDetail = function(index) {
      var selectedItem = $scope.items[index];
      $data.selectedItem = selectedItem;
      $scope.ons.navigator.pushPage('nieuwsDetail.html', {title : selectedItem.title});
    };
  });