document.addEventListener("deviceready", function() {
	// Schedule notification for tomorrow to remember about the meeting
	cordova.plugins.notification.local.schedule({
		id: 10,
		title: "Meeting in 15 minutes!",
		text: "Jour fixe Produktionsbesprechung",
		at: today_at_3_55_pm,
		data: {
			meetingId: "#123FG8"
		}
	});
});