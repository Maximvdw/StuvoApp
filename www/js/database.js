var permanentStorage = window.localStorage;

function setSetting(setting, value) {
	window.localStorage.setItem(setting, value);
}

function getSetting(setting) {
	return window.localStorage.getItem(setting);
}

function notificationEventChange(cb) {
	if (cb.checked === true) {
		setSetting('notification_event', true);
	} else {
		setSetting('notification_event', false);
	}
}

function notificationNewsChange(cb) {
	if (cb.checked === true) {
		setSetting('notification_news', true);
	} else {
		setSetting('notification_news', false);
	}
}

function handleCampus(cb) {
	if (cb.checked === true) {
		setSetting('campus', cb.value);
	}
}

module.controller('SettingsController', function($scope) {
	document.getElementById("chk_notification_news").checked = getSetting('notification_news') === "true" ? true : false;
	document.getElementById("chk_notification_event").checked = getSetting('notification_event') === "true" ? true : false;
	document.getElementById("rad_campus_" + getSetting('campus')).checked = true;
});