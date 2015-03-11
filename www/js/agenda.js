
  module.controller('AppController', function($scope) {
	
  });

  module.controller('EventDetailController', function($scope,$data) {
    $scope.item = $data.selectedItem;
    $scope.window = window;
    $scope.addToCalendar = addToCalendar;
  });
  
  module.factory('$data',function(){
  	return {};
  });

  module.controller('EventMasterController', function($scope, $http,$data) {
    $scope.fetchNews = function(){
    	$http({method: 'GET', url: 'http://srv5.mvdw-software.com/workspace/StuvoBackend/html/agenda.php'}).
    	success(function(data, status) {
            var itemData = {items: []};
            document.getElementById('agenda-loading').className = "";
  			$.each( data['events'], function( month, eventData ) {
				$.each(eventData, function( eventId, event ) {
				     itemData.items.push(
	  	             { 
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
	            	 	endminute: event['date']['endminute']
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
    };
   
    
    $scope.refreshEvents = function($done){
    	$http({method: 'GET', url: 'http://srv5.mvdw-software.com/workspace/StuvoBackend/html/agenda.php'}).
    	success(function(data, status) {
            var itemData = {items: []};
  			$.each( data['events'], function( month, eventData ) {
				$.each(eventData, function( eventId, event ) {
				     itemData.items.push(
	  	             { 
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
	            	 	endminute: event['date']['endminute']
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
        }).
        finally(function(){
        	$done();
        });
    };
    
    $scope.fetchNews();
    
    $scope.showDetail = function(index) {
      var selectedItem = $scope.items[index];
      $data.selectedItem = selectedItem;
      eventNavi.pushPage('eventDetail.html', {title : selectedItem.title});
    };
  });