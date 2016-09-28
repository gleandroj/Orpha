/**
 * Created by FG0003 on 28/09/2016.
 */

angular.module('orpha.components')

.controller('orphaCtrl', ['$scope', '$state', '$mdSidenav',
    function ($scope, $state, $mdSidenav) {

        $scope.menus = [
            {
                nome: 'Dashboard',
                state: 'app.orpha.dashboard',
                icon: 'dashboard'
            },
            {
                nome: 'Usuários',
                state: 'app.orpha.users',
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
            $scope.background = $scope.background || 'indigo-200';
            $scope.avatar = $scope.avatar || '../assets/profile/no-img.jpg';
        }
    }
});