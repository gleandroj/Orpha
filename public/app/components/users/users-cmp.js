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
                    title:'Inserir Usuário'
                }
            }).then(function (user) {
                $scope.users.push(user);
            });
        };

        $scope.getAllUsers();
    }])
    .controller('userFormCtrl', ['$scope', '$http', '$filter', 'UserService', '$mdDialog', 'MessagesService', 'locals', function ($scope, $http, $filter, UserService, $mdDialog, MessagesService, locals) {
        $scope.title = locals.title || 'Formulário';
        $scope.user = locals.user || {};
        $scope.user.permissions = [];
        $scope.permissions = [];
        $scope.searchText = null;
        $scope.loading = false;

        $http.get('/api/permissions').success(function (permissions) {
            $scope.permissions = permissions;
        });

        $scope.getPermissions = function (text) {
            return $filter('filter')($scope.permissions, text);
        };

        $scope.submit = function () {
            $scope.loading = true;
            $scope.user = new UserService($scope.user);
            $scope.user.$save(function (user) {
                $scope.loading = false;
                $mdDialog.hide(user);
                MessagesService.showToatsMessage('MSG5');
            }, function (error) {
                $scope.loading = false;
                angular.forEach(error.data, function (value, key) {
                    $scope.userForm[key].customError = value.join(', ');
                    $scope.userForm[key].$validate();
                });
            })
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }])
    .directive("customError", function($q, $timeout) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope, element, attributes, ngModel) {

                var reset = function () {
                    if(ngModel.customError != null){
                        ngModel.customError = null;
                        ngModel.$validate();
                    }
                };

                ngModel.$validators.customError = function(modelValue) {
                    return ngModel.customError == null;
                };
                scope.$watch(function () {
                    return ngModel.customError;
                }, function () {
                    /*$timeout(function () {
                        reset();
                    }, 20000);*/
                });
                element.bind('change', function () {
                    reset();
                });

            }
        };
    })
    .directive("checkEmail", function($q, $http) {
        return {
            restrict: "A",
            priority:100,
            require: "ngModel",
            link: function(scope, element, attributes, ngModel) {
                ngModel.checkEmailError = 'check-email-error';
                ngModel.$asyncValidators.checkEmail = function(modelValue) {
                    if(modelValue != null){
                        var defer = $q.defer();
                        $http.post('/api/users/checkEmail', {email:modelValue})
                            .success(function (data) {
                                defer.resolve();
                            })
                            .error(function (error) {
                                ngModel.checkEmailError = error['email'][0];
                                defer.reject();
                            });
                        return defer.promise;
                    }
                };
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
    .directive("checkImage", function($q, $timeout) {
        return {
            restrict: "A",
            require: "ngModel",
            scope:{
                model: '=ngModel'
            },
            link: function (scope, iElement, iAttrs, ngModel) {
                var regex = new RegExp(/^(data:image\/(jpeg|png|jpg|gif|bmp);base64)/);
                ngModel.$validators.checkImage = function (modelValue) {
                    return regex.test(modelValue) || modelValue == null || modelValue == "";
                };

                scope.$watch(function () {
                    return ngModel.$modelValue;
                }, function(newValue) {
                    if(ngModel.$invalid){
                        $timeout(function () {
                            scope.model = "";
                            scope.$apply();
                        }, 1500);
                    }
                });

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
                            scope.model = data;
                            scope.$apply();
                        }, 0);

                    });
                });
            }
        };
    });