cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/nl.x-services.plugins.socialsharing/www/SocialSharing.js",
        "id": "nl.x-services.plugins.socialsharing.SocialSharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.calendar/www/Calendar.js",
        "id": "nl.x-services.plugins.calendar.Calendar",
        "clobbers": [
            "Calendar"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.calendar/test/tests.js",
        "id": "nl.x-services.plugins.calendar.tests"
    },
    {
        "file": "plugins/com.brodysoft.sqlitePlugin/www/SQLitePlugin.js",
        "id": "com.brodysoft.sqlitePlugin.SQLitePlugin",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.PushPlugin/www/PushNotification.js",
        "id": "com.phonegap.plugins.PushPlugin.PushNotification",
        "clobbers": [
            "PushNotification"
        ]
    },
    {
        "file": "plugins/com.phonegap.TapToScroll/www/taptoscroll.js",
        "id": "com.phonegap.TapToScroll.TapToScroll",
        "clobbers": [
            "window.TapToScroll"
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification.js",
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification",
        "clobbers": [
            "cordova.plugins.notification.local",
            "plugin.notification.local"
        ]
    },
    {
        "file": "plugins/com.colibrisoftware.plugins.backgroundjs/src/js/BackgroundJS.js",
        "id": "com.colibrisoftware.plugins.backgroundjs.BackgroundJS",
        "clobbers": [
            "window.plugin.backgroundjs"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "nl.x-services.plugins.socialsharing": "4.3.14",
    "nl.x-services.plugins.calendar": "4.2.9",
    "com.jamiestarke.webviewdebug": "1.0.8",
    "com.brodysoft.sqlitePlugin": "1.0.4",
    "com.phonegap.plugins.PushPlugin": "2.4.0",
    "com.phonegap.TapToScroll": "0.1.0",
    "de.appplant.cordova.plugin.local-notification": "0.8.1",
    "com.colibrisoftware.plugins.backgroundjs": "3.3",
    "org.apache.cordova.device": "0.3.0"
}
// BOTTOM OF METADATA
});