cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.gestionaleauto.plugins.TwitterFacebookSharePlugin/www/GATwitterFacebookShare.js",
        "id": "com.gestionaleauto.plugins.TwitterFacebookSharePlugin.TwitterFacebookSharePlugin",
        "clobbers": [
            "GA.TwitterFacebookSharePlugin"
        ]
    },
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
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.gestionaleauto.plugins.TwitterFacebookSharePlugin": "1.0.0",
    "nl.x-services.plugins.socialsharing": "4.0.8",
    "org.apache.cordova.dialogs": "0.2.6"
}
// BOTTOM OF METADATA
});