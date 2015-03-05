function addToCalendar(){
	// prep some variables
  var startDate = new Date(2015,10,15,18,30,0,0,0); // beware: month 0 = january, 11 = december
  var endDate = new Date(2015,10,15,19,30,0,0,0);
  var title = "My nice event";
  var location = "Home";
  var notes = "Some notes about this event.";
  var success = function(message) { alert("Success: " + JSON.stringify(message)); };
  var error = function(message) { alert("Error: " + message); };

  
  // create an event interactively
  window.plugins.calendar.createEventInteractively(title,location,notes,startDate,endDate,success,error);
}