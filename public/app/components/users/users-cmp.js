/**
 * Created by FG0003 on 29/09/2016.
 */
angular.module('orpha.components')
    .controller('userCtrl', ['$scope', 'UserService', '$mdDialog', function ($scope, UserService, $mdDialog) {
        $scope.users = [];

        $scope.getAllUsers = function () {
            $scope.users = [];
            $scope.loading = true;
            UserService.query(function (data) {
                $scope.users = data;
                $scope.loading = false;
            });
        };

        $scope.showUser = function (user) {
            $mdDialog.show({
                controller: function ($scope, $mdDialog, locals) {
                    $scope.user = locals.user;
                    $scope.hide = function() {
                        $mdDialog.hide();
                    };
                },
                templateUrl: '../app/components/users/show-user-tpl.html',
                clickOutsideToClose:true,
                locals:{
                    user: user
                }
            });
        };
        
        $scope.createUser = function (user) {
            $mdDialog.show({
                controller: function ($scope, $mdDialog, locals) {
                    $scope.title = 'Inserir Usuário';
                    $scope.user = locals.user;
                    $scope.hide = function() {
                        $mdDialog.hide();
                    };
                },
                parent: angular.element(document.body),
                templateUrl: '../app/components/users/user-form-tpl.html',
                clickOutsideToClose:true,
                fullscreen:true,
                locals:{
                    user: {}
                }
            });
        };

        $scope.getAllUsers();
    }])
    .directive("checkEmail", function($q, $http) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope, element, attributes, ngModel) {
                scope.checkEmailError = 'checkEmailError';
                ngModel.$asyncValidators.checkEmail = function(modelValue) {
                    var defer = $q.defer();
                    $http.post('/api/users/checkEmail', {email:modelValue})
                        .success(function (data) {
                            defer.resolve();
                        })
                        .error(function (error) {
                            scope.checkEmailError = error['email'][0];
                            defer.reject();
                        });
                    return defer.promise;
                }
            }
        };
    });