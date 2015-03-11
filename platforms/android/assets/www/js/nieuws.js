  
  String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return this.length>n ? this.substr(0,n-1)+' ...' : this;
      };
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
    	$http({method: 'GET', url: 'http://srv5.mvdw-software.com/workspace/StuvoBackend/html/nieuws.php'}).
    	success(function(data, status) {
    	  document.getElementById('nieuws-loading').className = "";
          var newsData = {items: []};
  			$.each( data['data'], function( postId, postData ) {
  				var description = (postData['name'] == null ? postData['message'] : postData['description']);
      	       newsData.items.push(
  	             { 
            	  title: postData['name'],
              	  label: jQuery.timeago(postData['created_time']),
	              desc: description,
                  descshort: description == null ? "" : description.trunc(250),
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
    	  document.getElementById('nieuws-loading').className = "";
          var newsData = {items: []};
  			$.each( data['data'], function( postId, postData ) {
      	       var description = (postData['name'] == null ? postData['message'] : postData['description']);
      	       newsData.items.push(
  	             { 
            	  title: postData['name'],
              	  label: jQuery.timeago(postData['created_time']),
	              desc: description,
                  descshort: description == null ? "" : description.trunc(250),
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
      newsNavi.pushPage('nieuwsDetail.html', {title : selectedItem.title});
    };
  });
 