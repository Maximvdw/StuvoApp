// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {
  var db = window.sqlitePlugin.openDatabase({name: "stuvo.db"});
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS settings (setting varchar(50) primary key, settingvalue varchar(50)');

    tx.executeSql("INSERT INTO settings (setting,settingvalue) VALUES (?,?)", ["notifications_events", "0"], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      alert("rowsAffected: " + res.rowsAffected + " -- should be 1");

      db.transaction(function(tx) {
        tx.executeSql("select count(setting) as cnt from settings;", [], function(tx, res) {
          console.log("res.rows.length: " + res.rows.length + " -- should be 1");
          console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
        });
      });

    }, function(e) {
      console.log("ERROR: " + e.message);
      alert("ERROR: " + e.message);
    });
     tx.executeSql("INSERT INTO settings (setting,settingvalue) VALUES (?,?)", ["notifications_news", "0"], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      alert("rowsAffected: " + res.rowsAffected + " -- should be 1");

      db.transaction(function(tx) {
        tx.executeSql("select count(setting) as cnt from settings;", [], function(tx, res) {
          console.log("res.rows.length: " + res.rows.length + " -- should be 1");
          console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
        });
      });

    }, function(e) {
      console.log("ERROR: " + e.message);
      alert("ERROR: " + e.message);
    });
  });
}

function setSetting(setting,value){
	
}