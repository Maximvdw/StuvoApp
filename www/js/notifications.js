document.addEventListener("deviceready", function() {
	// Schedule notification for tomorrow to remember about the meeting
	window.plugin.notification.local.add({
		message: 'Great app!'
	});
});