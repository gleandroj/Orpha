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
        ];

        $scope.toggle = function () {
            $mdSidenav('left').toggle();
        };

        $scope.logout = function () {
            AuthService.logout();
            $state.go("login");
        };
    }
])
.directive('orphaUserCard', function (AuthService) {
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
            $scope.user = AuthService.getCurrentUser();
            $scope.$watch(function () {
                return AuthService.getCurrentUser();
            }, function (newUser) {
                $scope.user = newUser;
            });
        }
    }
})
.directive("messageBind", function($q, $timeout, MessagesService) {
        return {
            restrict: "EA",
            tranclude:true,
            template:'{{message}}',
            scope:{
                messageId:'@',
                attributeName:'@',
                message:'@'
            },
            link: function(scope, element, attributes) {
                $timeout(function () {
                    scope.$apply(function () {
                        scope.message = MessagesService.getMessage(scope.messageId);
                    });
                },0);
            }
        };
})
.filter('messageBind', function(MessagesService, $interpolate) {
    return function(msgId, attribute) {
        var msgService = MessagesService.getMessage(msgId);

        if(attribute){
            var scope = { attributeName:attribute };
            msgService = $interpolate(msgService)(scope);
        }

        return msgService;
    };
});