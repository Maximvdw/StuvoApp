
  module.controller('AppController', function($scope, $data) {
    $scope.doSomething = function() {
      setTimeout(function() {
        alert('tappaed');
      }, 100);
    };
  });

  module.controller('NewsDetailController', function($scope, $data) {
    $scope.item = $data.selectedItem;
  });

  module.controller('NewsMasterController', function($scope, $data) {

        $scope.items = $data.items;  
    
    $scope.showDetail = function(index) {
      var selectedItem = $data.items[index];
      $data.selectedItem = selectedItem;
      $scope.ons.navigator.pushPage('nieuwsDetail.html', {title : selectedItem.title});
    };
  });
	
  module.factory('$data', function() {
  	
	var newsData = {items: []};
  	  $.ajax({
	    type: 'GET',
	    url: 'http://srv5.mvdw-software.com/workspace/Stuvo/backend/html/nieuws.php',
	    dataType: 'json',
	    success: function(data) { 
	    	newsData = {items: []};
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
	    },
	    data: {},
	    async: false
      });
      return newsData;
  });