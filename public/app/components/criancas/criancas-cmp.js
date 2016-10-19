/**
 * Created by FG0003 on 18/10/2016.
 */

angular.module('orpha.components')
    .controller('criancaCtrl', ['$scope', '$timeout', 'CriancaService', '$filter', '$mdDialog', 'MessagesService', 'AuthService', 'AuthStateService', function ($scope, $timeout, CriancaService, $filter, $mdDialog, MessagesService, AuthService) {
        $scope.loading = false;
        $scope.search = '';
        $scope.criancas = [];

        $scope.refresh = function () {
            $scope.criancas = [];
            $scope.loading = true;
            CriancaService.query(function (data) {
                $scope.criancas = data;
                $scope.loading = false;
            }, function (data) {
                $scope.loading = false;
                MessagesService.showErrorMessage(data);
            });
        };

        $scope.createCrianca = function () {

            var pushCrianca = function (newCrianca) {
                $scope.criancas.push(newCrianca);
                MessagesService.showSuccessMessage('MSG5');
            };

            $mdDialog.show({
                controller: 'criancaFormCtrl',
                parent: angular.element(document.body),
                templateUrl: '../app/components/criancas/criancas-form-tpl.html',
                clickOutsideToClose:false,
                fullscreen:true,
                locals:{
                    title:'Inserir Criança / Adolescente'
                }
            }).then(pushCrianca);
        };

        $scope.showCrianca = function (crianca) {
            if(!AuthService.isAuthorized('show-crianca')) return;

            $mdDialog.show({
                controller: 'criancaFormCtrl',
                parent: angular.element(document.body),
                templateUrl: '../app/components/criancas/criancas-form-tpl.html',
                clickOutsideToClose:true,
                fullscreen:true,
                locals:{
                    title:'Visualizar Criança / Adolescente',
                    crianca:crianca,
                    readonly:true
                }
            });
        };

        $scope.editCrianca = function (crianca, oldScope) {
            if(!AuthService.isAuthorized('edit-crianca')) return;

            var options = {
                controller: 'criancaFormCtrl',
                parent: angular.element(document.body),
                templateUrl: '../app/components/criancas/criancas-form-tpl.html',
                clickOutsideToClose:false,
                fullscreen:true,
                locals: {
                    title:'Alterar Criança / Adolescente',
                    crianca:crianca,
                    editMode:true,
                    editCrianca:$scope.editCrianca,
                    oldScope:oldScope
                }
            };

            $mdDialog.show(options).then(function (updatedCrianca) {
                angular.forEach(updatedCrianca, function (value, key) {
                    $timeout(function () {
                        $scope.$apply(function () {
                            crianca[key] = value;
                        });
                    }, 0);
                });
                MessagesService.showSuccessMessage('MSG7');
            });
        };

        $scope.deleteCrianca = function (crianca) {
            crianca.$delete({id:crianca.id}, function (deletedCrianca) {
                angular.forEach(deletedCrianca, function (value, key) {
                    $timeout(function () {
                        $scope.$apply(function () {
                            crianca[key] = value;
                        });
                    }, 0);
                });
            }, function (data) {
                MessagesService.showErrorMessage(data);
            });
        };

        $scope.restoreCrianca = function (crianca) {
            crianca.$restore(crianca.id, function (restoredCrianca) {
                angular.forEach(restoredCrianca, function (value, key) {
                    $timeout(function () {
                        $scope.$apply(function () {
                            crianca[key] = value;
                        });
                    }, 0);
                });
            }, function (data) {
                MessagesService.showErrorMessage(data);
            });
        };

        $scope.refresh();
    }])
    .controller('criancaFormCtrl', ['$scope', 'locals', '$filter', '$mdDialog', 'CriancaService', 'MessagesService', function ($scope, locals, $filter, $mdDialog, CriancaService, MessagesService) {

        if(locals.oldScope)
        {
            $scope.title = locals.oldScope.title;
            $scope.editMode = locals.oldScope.editMode;
            $scope.readonly = locals.oldScope.readonly;
            $scope.editCrianca = locals.oldScope.editCrianca;
            $scope.crianca = locals.oldScope.crianca;
            $scope.subimited = locals.oldScope.subimited;
            $scope.loading = locals.oldScope.loading;
        }
        else
        {
            $scope.title = locals.title || 'Formulário';
            $scope.editMode = locals.editMode || false;
            $scope.readonly = locals.readonly || false;
            $scope.editCrianca = locals.editCrianca || function () {};
            $scope.crianca = {}; if(locals.crianca) angular.copy(locals.crianca, $scope.crianca);
            $scope.subimited = false;
            $scope.loading = false;
        }

        var setFormError = function (errors) {
            angular.forEach(errors, function (value, key) {
                if($scope.criancaForm[key]){
                    $timeout(function () {
                        $scope.criancaForm[key].customError =  value.length ? value.join(', ') : value;
                        $scope.criancaForm[key].$validate();
                    }, 0);
                }
            });
        };

        var saveCrianca = function () {
            $scope.loading = true;
            $scope.crianca.$save(function (crianca) {
                crianca.datepicker = $filter('strToDate')(crianca.dt_nascimento);
                $scope.loading = false;
                $mdDialog.hide(crianca);
            }, function (errors) {
                $scope.loading = false;
                if(errors.status == 422){
                    setFormError(errors.data);
                }else
                    MessagesService.showErrorMessage(errors);
            });
        };

        var updateCrianca = function () {
            $scope.crianca = new CriancaService($scope.crianca);
            $scope.loading = true;
            $scope.crianca
                .$update({id:$scope.crianca.id},
                    function (crianca) {
                        crianca.datepicker = $filter('strToDate')(crianca.dt_nascimento);
                        $scope.loading = false;
                        $mdDialog.hide(crianca);
                    },
                    function (errors) {
                        $scope.loading = false;
                        if(errors.status == 422){
                            setFormError(errors.data);
                        }else
                            MessagesService.showErrorMessage(errors);
                    });
        };

        $scope.submit = function () {
            $scope.crianca.dt_nascimento = $filter('dateToStr')($scope.crianca.datepicker);
            if($scope.editMode){
                $mdDialog.cancel();
                MessagesService
                    .showConfirmDialog('MSG6')
                    .then(function () {
                        $scope.subimited = true;
                        $scope.editCrianca(locals.crianca, $scope);
                    }, function () {
                        $scope.editCrianca(locals.crianca, $scope);
                    });
            }
            else
                saveCrianca();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        if($scope.subimited) updateCrianca();
    }]);
