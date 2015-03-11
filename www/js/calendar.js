function addToCalendar(title,location,notes,startyear,startmonth,startday,starthour,startminute,endyear,endmonth,endday,endhour,endminute){
	// prep some variables
	alert(startYear);
  var startDate = new Date(startyear,startmonth-1,startday,starthour,startminute,0,0); // beware: month 0 = january, 11 = december
  var endDate = new Date(endyear,endmonth-1,endday,endhour,endminute,0,0);
  var success = function(message) {};
  var error = function(message) { alert("Error: " + message); };

  // create an event interactively
  window.plugins.calendar.createEventInteractively(title,location,notes,startDate,endDate,success,error);
}