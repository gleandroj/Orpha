/**
 * Created by FG0003 on 10/10/2016.
 */
angular.module('orpha.components')
    .controller('loginCtrl', ['$scope', '$timeout', 'AuthService', 'MessagesService', '$state', function ($scope, $timeout, AuthService, MessagesService, $state) {
        if(AuthService.isAuthenticated()){
            $state.go('orpha.dashboard');
        }
        $scope.loading = false;
        $scope.email = "";
        $scope.password = "";

        $scope.login = function () {
            $scope.loading = true;
            AuthService.login($scope.email, $scope.password)
                .success(function (user) {
                    $scope.loading = false;
                    $state.go('orpha.dashboard');
                }).error(function (data) {
                    if(data.error == 'invalid_credentials')
                        MessagesService.showErrorMessage('MSG14');
                    $scope.loading = false;
                });
        };

    }]);
