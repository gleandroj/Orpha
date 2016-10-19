/**
 * Created by FG0003 on 29/09/2016.
 */
angular.module('orpha.components')
    .controller('userCtrl', ['$scope', '$timeout', 'UserService', '$filter', '$mdDialog', 'MessagesService', 'AuthService', 'AuthStateService', function ($scope, $timeout, UserService, $filter, $mdDialog, MessagesService, AuthService) {
        $scope.users = [];
        $scope.search = '';

        $scope.refresh = function () {
            $scope.users = [];
            $scope.loading = true;
            UserService.query(function (data) {
                $scope.users = data;
                $scope.loading = false;
            }, function (data) {
                $scope.loading = false;
                MessagesService.showErrorMessage(data);
            });
        };

        $scope.showUser = function (user) {
            if(!AuthService.isAuthorized('show-user')) return;

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

        $scope.createUser = function () {

            var pushUser = function (newUser) {
                $scope.users.push(newUser);
                MessagesService.showSuccessMessage('MSG5');
            };

            $mdDialog.show({
                controller: 'userFormCtrl',
                parent: angular.element(document.body),
                templateUrl: '../app/components/users/user-form-tpl.html',
                clickOutsideToClose:false,
                fullscreen:true,
                locals:{
                    title:'Inserir Usuário'
                }
            }).then(pushUser);
        };

        $scope.editUser = function (user, oldScope) {
            var options = {
                controller: 'userFormCtrl',
                parent: angular.element(document.body),
                templateUrl: '../app/components/users/user-form-tpl.html',
                clickOutsideToClose:false,
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
                if(updatedUser.id === AuthService.getCurrentUser().id){
                    AuthService.setCurrentUser(updatedUser);
                }
                angular.forEach(updatedUser, function (value, key) {
                    $timeout(function () {
                        $scope.$apply(function () {
                            user[key] = value;
                        });
                    }, 0);
                });
                MessagesService.showSuccessMessage('MSG7');
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
                //Fix bug request loop.
                if(deletedUser.id == AuthService.getCurrentUser().id){
                    AuthService.logout();
                }

            }, function (data) {
                MessagesService.showErrorMessage(data);
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
                MessagesService.showErrorMessage(data);
            });
        };

        $scope.refresh();
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
            $scope.searchText = '';
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
                }else{
                    MessagesService.showErrorMessage(errors);
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
                        }else{
                            MessagesService.showErrorMessage(errors);
                        }
                    });
        };

        $scope.filterPermissions = function (text) {
            return $filter('filter')($scope.permissions, function (permission) {
                    for(var i = 0 ; i < $scope.user.permissions.length ; i++)
                        if($scope.user.permissions[i]['slug'] === permission['slug'])
                            return false;
                    return $filter('filter')([permission], text).length > 0;
            });
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
    }]);