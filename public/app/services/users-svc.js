/**
 * Created by FG0003 on 29/09/2016.
 */

angular.module('orpha.services')

.factory('UserService', ['$resource', function($resource) {
    return $resource('/api/users/:id');
}]);