/**
 * Created by FG0003 on 29/09/2016.
 */

angular.module('orpha.services')

.factory('UserService', ['$q', '$http', '$resource', function($q, $http, $resource) {
    var users = $resource('/api/users/:id', null, { 'update': { method:'PUT' } });

    users.prototype.$restore = function (id, success, error) {
        success = success || function () {};
        error = error || function () {};
        return $http.get('/api/users/restore/'+id).success(function (data) { success(new users(data)); }).error(error);
    };

    return users;
}]);