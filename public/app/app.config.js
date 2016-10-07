/**
 * Created by FG0003 on 07/10/2016.
 */
angular.module('orpha.config')
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