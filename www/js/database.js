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

module.controller('SettingsController', function($scope, $http) {
	document.getElementById("chk_notification_news").checked = getSetting('notification_news') === "true" ? true : false;
	document.getElementById("chk_notification_event").checked = getSetting('notification_event') === "true" ? true : false;
	if (getSetting('registered') === "true") {
		$('#registerDrankje').addClass('hidden');
	}
	if (getSetting('campus') != null)
		document.getElementById("rad_campus_" + getSetting('campus')).checked = true;

	$scope.registerDrankje = function() {
		$('#dialogRegister').removeClass('hidden');
		$('#dialogRegisterMask').removeClass('hidden');
	}

	$scope.confirmRegisterDrankje = function() {
		$scope.isSending = true;
		$scope.dialogFinished = {
			title: "",
			content: ""
		};
		var email = $('#registrationEmail').val();
		$http({
			method: 'GET',
			url: 'http://srv6.mvdw-software.com/workspace/StuvoBackend/public_html/api/drankregistratie.php?email=' + email
		}).
		success(function(data, status) {
			$scope.isSending = false;
			if (data['status'] == '1') {
				$scope.dialogFinished.title = "Foutmelding!";
				$scope.dialogFinished.content = "Gelieve een EhB email in te geven!";
			} else if (data['status'] == '2') {
				$scope.dialogFinished.title = "Foutmelding!";
				$scope.dialogFinished.content = "Oeps! Het lijkt erop dat je al een gratis drankje hebt aangevraagd.";
			} else {
				$scope.dialogFinished.title = "Proficiat met je drankje!";
				$scope.dialogFinished.content = "Er is een email verstuurd met je unieke code.";
				$('#registerDrankje').addClass('hidden');
				setSetting('registered', true);
			}
			$('#dialogRegister').addClass('hidden');
			$('#dialogRegisterFinished').removeClass('hidden');
		}).
		error(function(data, status) {
			$('#dialogRegister').addClass('hidden');
		}).
		finally(function() {

		});
	}

	$scope.dialogFinishedDone = function() {
		$('#dialogRegisterFinished').addClass('hidden');
		$('#dialogRegisterMask').addClass('hidden');
	}
});