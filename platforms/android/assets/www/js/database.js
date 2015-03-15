// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);
var db = null;
// Cordova is ready
function onDeviceReady() {
	var db = window.sqlitePlugin.openDatabase({
		name: "my.db"
	});

	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS settings (key text primary key, value text)');

		// demonstrate PRAGMA:
		db.executeSql("pragma table_info (settings);", [], function(res) {
			console.log("PRAGMA res: " + JSON.stringify(res));
		});

		tx.executeSql("INSERT INTO settings (key, value) VALUES (?,?)", ["notification_news", "YEs"], function(tx, res) {
			console.log("insertId: " + res.insertId + " -- probably 1");
			console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
		}, function(e) {
			console.log("ERROR: " + e.message);
		});
		tx.executeSql("INSERT INTO settings (key, value) VALUES (?,?)", ["notification_events", "No"], function(tx, res) {
			console.log("insertId: " + res.insertId + " -- probably 1");
			console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
		}, function(e) {
			console.log("ERROR: " + e.message);
		});

		db.transaction(function(tx) {
			tx.executeSql("select value from settings where key = 'notification_news';", [], function(tx, res) {
				console.log("res.rows.length: " + res.rows.length + " -- should be 1");
				console.log("res.rows.item(0).value: " + res.rows.item(0).value);
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