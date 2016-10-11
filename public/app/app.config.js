/**
 * Created by FG0003 on 07/10/2016.
 */
angular.module('orpha.config')
    .value('SESSION_TTL', 1000 * 60 * 10)
    .value('OAUTH', {
        "client_id": "2",
        "client_secret": "FkHPWSOOI0OJqgCqTXbEHu9tOeifY0azVKatN8B0",
        "grant_type":"password"
    })
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey', {
                'default': '600',
                'hue-1': '500',
                'hue-2': '600',
                'hue-3': '700'
            })
            .accentPalette('light-blue', {
                'default': '500'
            });
    });