/**
 * Created by FG0003 on 29/09/2016.
 */
angular.module('orpha.components')
    .controller('userCtrl', ['$scope', '$timeout', 'UserService', '$filter', '$mdDialog', 'MessagesService', function ($scope, $timeout, UserService, $filter, $mdDialog, MessagesService) {
        $scope.users = [];

        $scope.search = '';

        $scope.getAllUsers = function () {
            $scope.users = [];
            $scope.loading = true;
            UserService.query(function (data) {
                $scope.users = data;
                $scope.loading = false;
            }, function (data) {
                console.log(data);
                $scope.loading = false;
                if(data && data['data']['error']) MessagesService.showErrorMessage(data['data']['error']);
            });
        };

        $scope.showUser = function (user) {
            $mdDialog.show({
                controller: 'userFormCtrl',
                parent: angular.element(document.body),
                templateUrl: '../app/components/users/user-form-tpl.html',
                clickOutsideToClose:true,
                fullscreen:true,
                locals:{
                    title:'Visualizar Usuário',
                    user:user,
                    readonly:true
                }
            });

        };

        $scope.createUser = function (user) {

            var pushUser = function (newUser) {
                $scope.users.push(newUser);
                MessagesService.showSuccessMessage('MSG5');
            };

            $mdDialog.show({
                controller: 'userFormCtrl',
                parent: angular.element(document.body),
                templateUrl: '../app/components/users/user-form-tpl.html',
                clickOutsideToClose:true,
                fullscreen:true,
                locals:{
                    title:'Inserir Usuário'
                }
            }).then(pushUser,
            function (data) {
                if(data && data['data']['error']) MessagesService.showErrorMessage(data['data']['error']);
            });
        };

        $scope.editUser = function (user, oldScope) {
            var options = {
                controller: 'userFormCtrl',
                parent: angular.element(document.body),
                templateUrl: '../app/components/users/user-form-tpl.html',
                clickOutsideToClose:true,
                fullscreen:true,
                locals: {
                    title:'Editar Usuário',
                    user:user,
                    editMode:true,
                    editUser:$scope.editUser,
                    oldScope:oldScope
                }
            };

            $mdDialog.show(options).then(function (updatedUser) {
                angular.forEach(updatedUser, function (value, key) {
                    $timeout(function () {
                        $scope.$apply(function () {
                            user[key] = value;
                        });
                    }, 0);
                });
                MessagesService.showSuccessMessage('MSG7');
            }, function (data) {
                if(data && data['data']['error']) MessagesService.showErrorMessage(data['data']['error']);
            });
        };

        $scope.deleteUser = function (user) {
            user.$delete({id:user.id}, function (deletedUser) {
                angular.forEach(deletedUser, function (value, key) {
                    $timeout(function () {
                        $scope.$apply(function () {
                            user[key] = value;
                        });
                    }, 0);
                });
            }, function (data) {
                if(data && data['data']['error']) MessagesService.showErrorMessage(data['data']['error']);
            });
        };

        $scope.restoreUser = function (user) {
            user.$restore(user.id, function (restoredUser) {
                    angular.forEach(restoredUser, function (value, key) {
                        $timeout(function () {
                            $scope.$apply(function () {
                                user[key] = value;
                            });
                        }, 0);
                    });
            }, function (data) {
                if(data && data['error']) MessagesService.showErrorMessage(data['error']);
            });
        };

        $scope.getAllUsers();
    }])
    .controller('userFormCtrl', ['$scope', '$timeout', '$http', '$filter', 'UserService', '$mdDialog', 'MessagesService', 'locals', function ($scope, $timeout, $http, $filter, UserService, $mdDialog, MessagesService, locals) {
        if(locals.oldScope)
        {
            $scope.title = locals.oldScope.title;
            $scope.editMode = locals.oldScope.editMode;
            $scope.readonly = locals.oldScope.readonly;
            $scope.editUser = locals.oldScope.editUser;
            $scope.user = locals.oldScope.user;
            $scope.user.permissions = locals.oldScope.user.permissions;
            $scope.permissions = locals.oldScope.permissions;
            $scope.searchText = locals.oldScope.searchText;
            $scope.subimited = locals.oldScope.subimited;
            $scope.loading = locals.oldScope.loading;
        }
        else
        {
            $scope.title = locals.title || 'Formulário';
            $scope.editMode = locals.editMode || false;
            $scope.readonly = locals.readonly || false;
            $scope.editUser = locals.editUser || function () {};
            $scope.user = {}; if(locals.user) angular.copy(locals.user, $scope.user);
            $scope.user.permissions = $scope.user.permissions || [];
            $scope.permissions = [];
            $scope.searchText = null;
            $scope.subimited = false;
            $scope.loading = false;

            $http.get('/api/permissions')
                .success(function (permissions) {
                    $scope.permissions = permissions;
                });
        }

        var setFormError = function (errors) {
            angular.forEach(errors, function (value, key) {
                if($scope.userForm[key]){
                    $timeout(function () {
                        $scope.userForm[key].customError =  value.length ? value.join(', ') : value;
                        $scope.userForm[key].$validate();
                    }, 0);
                }
            });
        };

        var saveUser = function () {
            $scope.user = new UserService($scope.user);
            $scope.loading = true;
            $scope.user.$save(function (user) {
                $scope.loading = false;
                $mdDialog.hide(user);
            }, function (errors) {
                $scope.loading = false;
                if(errors.status == 422){
                    setFormError(errors.data);
                }else if(errors.status == 500){
                    $mdDialog.cancel(errors.data.error);
                }
            });
        };

        var updateUser = function () {
            $scope.user = new UserService($scope.user);
            $scope.loading = true;
            $scope.user
                .$update({id:$scope.user.id},
                    function (user) {
                        $scope.loading = false;
                        $mdDialog.hide(user);
                    },
                    function (errors) {
                        $scope.loading = false;
                        if(errors.status == 422){
                            setFormError(errors.data);
                        }else if(errors.status == 500){
                            $mdDialog.cancel(errors.data.error);
                        }
                    });
        };

        $scope.filterPermissions = function (text) {
            return $filter('filter')($scope.permissions, text);
        };

        $scope.submit = function () {
            if($scope.editMode){
                $mdDialog.cancel();
                MessagesService
                    .showConfirmDialog('MSG6')
                    .then(function () {
                        $scope.subimited = true;
                        $scope.editUser(locals.user, $scope);
                    }, function () {
                        $scope.editUser(locals.user, $scope);
                    });
            }
            else
                saveUser();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        if($scope.subimited) updateUser();
    }])
    .directive("customError", function($q, $timeout) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope, element, attributes, ngModel) {
                if(attributes.setTouched == "true"){
                    $timeout(function () {
                        scope.$apply(function () {
                            ngModel.$setTouched();
                        });
                    }, 0);
                }

                var reset = function () {
                    if(ngModel.customError != null){
                        ngModel.customError = null;
                        ngModel.$validate();
                    }
                };

                ngModel.$validators.customError = function(modelValue) {
                    return ngModel.customError == null;
                };
                element.bind('focus', function () {
                    reset();
                });

            }
        };
    })
    .directive("checkEmail", function($q, $http, $timeout) {
        return {
            restrict: "A",
            priority:100,
            require: "ngModel",
            scope:{
                checkEmail: "=checkEmail"
            },
            link: function(scope, element, attributes, ngModel) {
                var allowValidate = false;
                element.on('blur', function () {
                    allowValidate = true;
                    ngModel.$validate();
                    allowValidate = false;
                });

                if(scope.checkEmail){
                    ngModel.checkEmailError = 'check-email-error';
                    ngModel.$asyncValidators.checkEmail = function(modelValue) {
                        var defer = $q.defer();
                        if(modelValue != null && allowValidate){
                            $http.post('/api/users/checkEmail', {email:modelValue})
                                .success(function (data) {
                                    defer.resolve();
                                })
                                .error(function (error) {
                                    ngModel.checkEmailError = error['email'][0];
                                    defer.reject();
                                });
                        }else{
                            defer.resolve();
                        }
                        return defer.promise;
                    };
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
                    ngModel.$validate();
                });

                ngModel.$validators.checkMatch = function(modelValue) {
                    if((modelValue == null && scope.checkMatch == null ) || (modelValue == "" && scope.checkMatch == "")){
                        return true;
                    }
                    else
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
                var b64regex = new RegExp(/^(data:image\/(jpeg|png|jpg|gif|bmp);base64)/);
                var urlRegex = new RegExp(/(http(s?):)|([\/|.|\w|\s])*\.(?:jpg|gif|png)/);

                ngModel.$validators.checkImage = function (modelValue) {
                    return b64regex.test(modelValue) || urlRegex.test(modelValue) || modelValue == null || modelValue == "";
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