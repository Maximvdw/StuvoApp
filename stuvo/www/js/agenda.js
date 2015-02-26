  module.controller('EventDetailController', function($scope, $eventdata) {
    $scope.item = $eventdata.selectedItem;
  });

  module.controller('EventMasterController', function($scope, $eventdata) {
    $scope.items = $eventdata.items;  
    
    $scope.showDetail = function(index) {
      var selectedItem = $eventdata.items[index];
      $eventdata.selectedItem = selectedItem;
      $scope.ons.navigator.pushPage('eventDetail.html', {title : selectedItem.title});
    };
  });
	
  module.factory('$eventdata', function() {
  	
	var itemData = {items: []};
  	  $.ajax({
	    type: 'GET',
	    url: 'http://srv5.mvdw-software.com/workspace/Stuvo/backend/html/agenda.php',
	    dataType: 'json',
	    success: function(data) { 
	    	$.each( data['events'], function( month, eventData ) {
				$.each(eventData, function( eventId, event ) {
				     itemData.items.push(
	  	             { 
		            	 shortdate: event['date'],
		            	 name: event['name'],
		            	 description: event['description'],
	        		 }
      	       		);
				});
	    	});
	    },
	    data: {},
	    async: false
      });
      return itemData;
  });