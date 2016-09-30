/**
 * Created by FG0003 on 28/09/2016.
 */

angular.module('orpha.components')

.controller('orphaCtrl', ['$scope', '$state', '$mdSidenav',
    function ($scope, $state, $mdSidenav) {

        $scope.menus = [
            {
                nome: 'Dashboard',
                state: 'orpha.dashboard',
                icon: 'dashboard'
            },
            {
                nome: 'Usuários',
                state: 'orpha.users',
                icon: 'person_identify'
            },
        ];

        $scope.toggle = function () {
            $mdSidenav('left').toggle();
        };
        
    }
])
.directive('orphaUserCard', function () {
    return {
        restrict: 'E',
        templateUrl: '../app/components/orpha/orpha-user-card-tpl.html',
        scope: {
            name: '@',
            avatar: '@',
            description:'@',
            background: '@',
            showActions: '=',
            logoutClick: '&',
            profileClick: '&'
        },
        controller: function ($scope) {
            $scope.background = $scope.background || 'default-primary-200';
            $scope.avatar = $scope.avatar || '../assets/profile/ic_account_circle_white_48dp_2x.png';
        }
    }
})
.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey', {
            'default': '400',
            'hue-1': '100',
            'hue-2': '600',
            'hue-3': 'A100'
        })
        .accentPalette('pink', {
            'default': '200'
        });
});