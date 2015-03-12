// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);
var db = null;
// Cordova is ready
function onDeviceReady() {
	db = window.sqlitePlugin.openDatabase({
		name: "stuvo.db"
	});
	resetSettings();
	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS settings (setting varchar(50) primary key, settingvalue varchar(50)');

		tx.executeSql("INSERT INTO settings (setting,settingvalue) VALUES (?,?)", ["notifications_events", "0"], function(tx, res) {

		}, function(e) {

		});
		db.transaction(function(tx) {
			tx.executeSql("select count(setting) as cnt from settings;", [], function(tx, res) {
				console.log("res.rows.length: " + res.rows.length + " -- should be 1");
				console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
				alert(res.rows.item(0).cnt);
			});
		});


		tx.executeSql("INSERT INTO settings (setting,settingvalue) VALUES (?,?)", ["notifications_news", "0"], function(tx, res) {

		}, function(e) {});

		db.transaction(function(tx) {
			tx.executeSql("select count(setting) as cnt from settings;", [], function(tx, res) {
				console.log("res.rows.length: " + res.rows.length + " -- should be 1");
				console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
				alert(res.rows.item(0).cnt);
			});
		});
	});
}

function setSetting(setting, value) {

}

function resetSettings() {
	db.transaction(function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS settings');
	});
}