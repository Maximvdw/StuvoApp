document.addEventListener("deviceready", function() {
	window.plugins.backgroundjs.lockBackgroundTime();


	function checkNotifications() {
		// Schedule notification for tomorrow to remember about the meeting
		window.plugin.notification.local.add({
			message: 'Notificatie test'
		});
		setTimeout(checkNotifications, 60000);
	}

	setTimeout(checkNotifications, 60000);
});