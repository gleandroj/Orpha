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
    }])
    .controller('loginRecoveryCtrl', ['$scope', '$mdDialog', 'AuthService', 'MessagesService', '$state', function ($scope, $mdDialog, AuthService, MessagesService, $state) {
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
                    $mdDialog.show({
                        controller: function ($scope, $mdDialog) {
                            $scope.password = '';
                            $scope.password_confirmation = '';

                            $scope.submit = function () {
                                if($scope.password === $scope.password_confirmation)
                                    $mdDialog.hide($scope.password);
                            };
                        },
                        parent: angular.element(document.body),
                        templateUrl: '../app/components/login/change-password-tpl.html',
                        clickOutsideToClose:false,
                        fullscreen:true,
                        escapeToClose:false,
                        locals: {}
                    }).then(function (password) {
                        var user = AuthService.getCurrentUser();
                        user.password = user.password_confirmation = password;
                        user.$update({id:user.id},
                                function (user) {
                                    MessagesService.showSuccessMessage('MSG7');
                                },
                                function (errors) {
                                    MessagesService.showErrorMessage('MSG4');
                                });
                    });
                }).error(function (data) {
                    if(data.error == 'invalid_credentials')
                        MessagesService.showErrorMessage('MSG14');
                    $scope.loading = false;
                });
        };

    }])
    .controller('forgetCtrl', ['$scope', '$timeout', 'AuthService', 'MessagesService', '$state', function ($scope, $timeout, AuthService, MessagesService, $state) {
        $scope.loading = false;
        $scope.email = '';
        $scope.goBack = function () {
            $state.go('login');
        };
        $scope.submit = function () {
            $scope.loading = true;
            AuthService
                .recoveryPassword($scope.email)
                .success(function (data) {
                    MessagesService.showSuccessMessage(data.status);
                    $scope.loading = false;
                    $state.go('login');
                }).error(function (err) {
                    MessagesService.showErrorMessage(err.error);
                    $scope.loading = false;
                });
        };
    }]);