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
        "file": "plugins/org.apache.cordova.dialogs/www/notification.js",
        "id": "org.apache.cordova.dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.plugins.StatusBar/www/StatusBar.js",
        "id": "org.apache.cordova.plugins.StatusBar.StatusBar",
        "merges": [
            "plugins.statusBar"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "nl.x-services.plugins.socialsharing": "4.0.8",
    "org.apache.cordova.dialogs": "0.2.6",
    "org.apache.cordova.plugins.StatusBar": "0.1.0"
}
// BOTTOM OF METADATA
});