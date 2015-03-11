function addToCalendar(title,location,notes,startyear,startmonth,startday,starthour,startminute,endyear,endmonth,endday,endhour,endminute){
   alert("test");
	// prep some variables
  var startDate = new Date(startyear,startmonth-1,startday,starthour,startminute,0,0,0); // beware: month 0 = january, 11 = december
  var endDate = new Date(endyear,endmonth-1,endday,endhour,endminute,0,0,0);
alert(startDate);
var success = function(message) { alert("Success: " + JSON.stringify(message)); };
  var error = function(message) { alert("Error: " + message); };

  // create an event interactively
  window.plugins.calendar.createEventInteractively(title,location,notes,startDate,endDate,success,error);
}