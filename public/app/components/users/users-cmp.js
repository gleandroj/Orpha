/**
 * Created by FG0003 on 29/09/2016.
 */
angular.module('orpha.components')
    .controller('userCtrl', ['$scope', 'UserService', function ($scope, UserService) {
        $scope.users = [];

        UserService.query(function (data) {
            $scope.users = data;
        });

    }]);