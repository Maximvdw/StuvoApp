ons.bootstrap();
ons.ready(function() {
	// Add another Onsen UI element
	loadAgenda();
	$('#hook').hook({
	  reloadPage: false,
	  reloadEl: function(){
	    loadAgenda();
	  }
	});
});

function showAgendaInfo(id){
	ons.bootstrap();
	modal0.show();
}
  function loadAgenda(){
	var agendaElement = document.getElementById('agenda');
	agendaElement.innerHTML = "<div class=\"loading\"></div>";
	$.getJSON( "http://srv5.mvdw-software.com/workspace/Stuvo/backend/html/agenda.php", function( data ) {
		agendaElement.innerHTML = "";
		var agenda = "";
		$.each( data['events'], function( month, eventData ) {
			agendaElement.innerHTML += "<h2>" + month + "</h2>";
			$.each(eventData, function( eventId, event ) {
				var agendaItem = "";
				agendaItem += "<div class=\"agenda-item\" onclick=\"showAgendaInfo(0);\" style=\"cursor: pointer;\">";
				agendaItem += "<div class=\"agenda-name\">"
				agendaItem += "<span class=\"agenda-date\">";
				agendaItem += event['date'];
				agendaItem += "</span>";
				agendaItem += event['name'];
				agendaItem += "</div>";
				
				// Landscape data
				agendaItem += "<div class=\"agenda-info-landscape\">";
				agendaItem += event['description'];
				agendaItem += "</div>";
				
				
				// Extra info panel
				agendaItem += "<ons-modal var=\"modal" + eventId + "\">";
				agendaItem += "Dit is een test";
				agendaItem += "<button onclick=\"window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint('Message via Facebook', null /* img */, null /* url */, 'Paste it dude!', function() {console.log('share ok')}, function(errormsg){alert(errormsg)})\">Deel op Facebook</button>";
				agendaItem += "</ons-modal>";
				
			
				
				
				agendaItem += "</div>";
				agendaElement.innerHTML += agendaItem;
			});
			ons.compile(agendaElement);
		});
	});
}