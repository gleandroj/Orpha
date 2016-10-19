/**
 * Created by FG0003 on 18/10/2016.
 */

angular.module('orpha.components')
    .controller('criancaCtrl', ['$scope', '$timeout', 'CriancaService', '$filter', '$mdDialog', 'MessagesService', 'AuthService', 'AuthStateService', function ($scope, $timeout, CriancaService, $filter, $mdDialog, MessagesService, AuthService) {
        $scope.loading = false;
        $scope.search = '';
        $scope.criancas = [];

        $scope.refresh = function () {
            $scope.users = [];
            $scope.loading = true;
            CriancaService.query(function (data) {
                $scope.criancas = data;
                $scope.loading = false;
            }, function (data) {
                $scope.loading = false;
                if(data && data['data']['error']) MessagesService.showErrorMessage(data['data']['error']);
            });
        };

        $scope.showCrianca = function (crianca) {
            if(!AuthService.isAuthorized('')) return;

            $mdDialog.show({
                controller: 'criancaFormCtrl',
                parent: angular.element(document.body),
                templateUrl: '../app/components/criancas/criancas-form-tpl.html',
                clickOutsideToClose:true,
                fullscreen:true,
                locals:{
                    title:'Visualizar Criança',
                    crianca:crianca,
                    readonly:true
                }
            });
        };

        $scope.refresh();
    }])
    .controller('criancaFormCtrl', ['$scope', 'locals', '$mdDialog', function ($scope, locals, $mdDialog) {
        $scope.crianca = locals.crianca || {};
        $scope.readonly = locals.readonly || false;
        $scope.editMode = false;

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }]);
