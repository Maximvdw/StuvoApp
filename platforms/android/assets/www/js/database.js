// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {
  var db = window.sqlitePlugin.openDatabase({name: "stuvo.db"});
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS settings (setting varchar(50) primary key, value varchar(50)');

    // demonstrate PRAGMA:
    db.executeSql("pragma table_info (settings);", [], function(res) {
      console.log("PRAGMA res: " + JSON.stringify(res));
    });

    tx.executeSql("INSERT INTO settings (setting,value) VALUES (?,?)", ["notifications_events", "0"], function(tx, res) {
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
    });
  });
}