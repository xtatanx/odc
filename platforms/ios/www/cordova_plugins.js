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
        "file": "plugins/com.gestionaleauto.plugins.TwitterFacebookSharePlugin/www/GATwitterFacebookShare.js",
        "id": "com.gestionaleauto.plugins.TwitterFacebookSharePlugin.TwitterFacebookSharePlugin",
        "clobbers": [
            "GA.TwitterFacebookSharePlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "nl.x-services.plugins.socialsharing": "4.0.8",
    "com.gestionaleauto.plugins.TwitterFacebookSharePlugin": "1.0.0"
}
// BOTTOM OF METADATA
});