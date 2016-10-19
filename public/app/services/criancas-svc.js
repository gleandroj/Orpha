/**
 * Created by FG0003 on 29/09/2016.
 */

angular.module('orpha.services')

.factory('CriancaService', ['$q', '$http', '$resource', function($q, $http, $resource) {
    var criancas = $resource('/api/criancas/:id', null, { 'update': { method:'PUT' } });

    criancas.prototype.$restore = function (id, success, error) {
        success = success || function () {};
        error = error || function () {};
        return $http.get('/api/criancas/restore/'+id).success(function (data) { success(new CriancaService(data)); }).error(error);
    };

    return criancas;
}]);