/**
 * Created by FG0003 on 28/09/2016.
 */

angular.module('orpha.components')

.controller('orphaCtrl', ['$scope', '$state', '$mdSidenav', 'AuthService',
    function ($scope, $state, $mdSidenav, AuthService) {

        $scope.menus = [
            {
                nome: 'Dashboard',
                state: 'orpha.dashboard',
                icon: 'dashboard'
            },
            {
                nome: 'Usuários',
                state: 'orpha.users',
                permission:"list-user",
                icon: 'person_identify'
            },
            {
                nome: 'Criança / Adolescente',
                state: 'orpha.criancas',
                permission:"",
                icon: 'face'
            }
        ];

        $scope.toggle = function () {
            $mdSidenav('left').toggle();
        };

        $scope.logout = function () {
            AuthService.logout();
        };
    }
])
.directive('orphaUserCard', function (AuthService) {
    return {
        restrict: 'E',
        templateUrl: '../app/components/orpha/orpha-user-card-tpl.html',
        scope: {
            showActions: '=',
            logoutClick: '&',
            profileClick: '&'
        },
        controller: function ($scope) {
            $scope.user = AuthService.getCurrentUser();
            $scope.$watch(function () {
                return AuthService.getCurrentUser();
            }, function (newUser) {
                $scope.user = newUser;
            });
        }
    }
});