
  module.controller('AppController', function($scope) {
	
  });

  module.controller('EventDetailController', function($scope,$data) {
    $scope.item = $data.selectedItem;
  });
  
  module.factory('$data',function(){
  	return {};
  });

  module.controller('EventMasterController', function($scope, $http,$data) {
    $scope.fetchNews = function(){
    	document.getElementById('agenda-loading').className = "";
    	$http({method: 'GET', url: 'http://srv5.mvdw-software.com/workspace/Stuvo/backend/html/agenda.php'}).
    	success(function(data, status) {
            var itemData = {items: []};
  			$.each( data['events'], function( month, eventData ) {
				$.each(eventData, function( eventId, event ) {
				     itemData.items.push(
	  	             { 
		            	 shortdate: event['date']['short'],
		            	 name: event['name'],
		            	 description: event['description'],
	        		 }
      	       		);
				});
	    	});
            $scope.items = itemData.items;
            document.getElementById('agenda-loading').className = "hidden";
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
        });
    }
    
    $scope.fetchNews();
    
    $scope.showDetail = function(index) {
      var selectedItem = $scope.items[index];
      $data.selectedItem = selectedItem;
      $scope.ons.navigator.pushPage('eventDetail.html', {title : selectedItem.title});
    };
  });