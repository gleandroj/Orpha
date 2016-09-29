/**
 * Created by FG0003 on 29/09/2016.
 */

angular.module('orpha.services')

.factory('UserService', ['$resource', function($resource) {
    var users = $resource('/api/users/:id', null, { 'update': { method:'PUT' } });

    return users;
}]);