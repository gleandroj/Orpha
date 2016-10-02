/**
 * Created by FG0003 on 29/09/2016.
 */

angular.module('orpha.services')

.factory('UserService', ['$q', '$http', '$resource', function($q, $http, $resource) {
    var users = $resource('/api/users/:id', null, { 'update': { method:'PUT' } });

    users.prototype.$restore = function (id, success, error) {
        return $http.get('/api/users/restore/'+id).success(success).error(error);
    };

    return users;
}]);