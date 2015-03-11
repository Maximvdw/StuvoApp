// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {
  var db = window.sqlitePlugin.openDatabase({name: "stuvo.db"});
   db.transaction(function(tx) {
    tx.executeSql('DROP TABLE IF EXISTS settings');
    tx.executeSql('CREATE TABLE IF NOT EXISTS settings (setting varchar(50) primary key, value varchar(50)');

    tx.executeSql("INSERT INTO settings (setting,value) VALUES (?,?)", ["notifications_events", "0"], function(tx, res){ alert(res.rows.item(0)); }, function(e){});
    tx.executeSql("INSERT INTO settings (setting,value) VALUES (?,?)", ["notifications_news", "1"], function(tx, res) { alert(res.rows.item(0)); }, function(e){});
    
      db.transaction(function(tx) {
        tx.executeSql("select value from settings where setting = 'notifications_events';", [], function(tx, res) {
          var result = res.rows.item(0);
          alert(result);
        });
      });
      
      db.transaction(function(tx) {
        tx.executeSql("select value from settings where setting = 'notifications_news';", [], function(tx, res) {
          var result = res.rows.item(0);
          alert(result);
        });
      });
  });
}