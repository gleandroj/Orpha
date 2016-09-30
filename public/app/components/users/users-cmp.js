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
                controller: 'userFormCtrl',
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
    .controller('userFormCtrl', ['$scope', 'UserService', '$mdDialog', 'locals', function ($scope, UserService, $mdDialog, locals) {
        $scope.title = 'Inserir Usuário';
        $scope.user = locals.user || {};
        $scope.loading = false;

        $scope.submit = function () {
            $scope.loading = true;
            $scope.user = new UserService($scope.user);
            $scope.user.$save(function (user) {
                console.log(user);
            }, function (error) {
                console.log(error);
            })
        };

        $scope.hide = function() {
            $mdDialog.hide();
        };
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
    })
    .directive("checkMatch", function($q, $http) {
        return {
            restrict: "A",
            require: "ngModel",
            scope:{
                checkMatch:'='
            },
            link: function(scope, element, attributes, ngModel) {

                scope.$watch('checkMatch', function () {
                    ngModel.$validate()
                });

                ngModel.$validators.checkMatch = function(modelValue) {
                    return modelValue === scope.checkMatch;
                }
            }
        };
    })
    .directive("onImage", function() {
        return {
            restrict: "A",
            scope:{
                onImageError:'&',
                onImageLoaded:'&'
            },
            link: function postLink(scope, iElement, iAttrs) {

                iElement.bind('load', function() {
                    scope.$apply(scope.onImageLoaded());
                });

                iElement.bind('error', function() {
                    scope.$apply(scope.onImageError());
                });
            }
        };
    })
    .directive("readToBase64", function($q, $timeout) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, iElement, iAttrs, ngModel) {

                var readFile = function(file) {
                    var deferred = $q.defer();

                    var reader = new FileReader();
                    reader.onload = function(e) {
                        deferred.resolve(e.target.result);
                    };
                    reader.onerror = function(e) {
                        deferred.reject(e);
                    };

                    reader.readAsDataURL(file);
                    return deferred.promise;
                };

                iElement.on('change', function(e) {
                    readFile(e.target.files[0]).then(function (data) {
                        $timeout(function () {
                            scope.$apply(function(){
                                ngModel.$setViewValue(data);
                                ngModel.$pending = null;
                            });
                        }, 0);

                    });
                });
            }
        };
    });