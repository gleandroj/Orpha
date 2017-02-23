/**
 * Created by FG0003 on 09/02/2017.
 */

export default class CriancaService{

    constructor($http, OrphaUtilService) {
        'ngInject'
        this._util = OrphaUtilService;
        this._url = "/api/criancas";
        this._http = $http;
    }

    getAll() {
        let $q = this._util.defer();

        this._http.get(this._url).then((response)=> $q.resolve(response.data), (response) => $q.reject(response.data));

        return $q.promise;
    }

    get(id) {
        let $q = this._util.defer();

        this._http.get(this._url + '/' + id).then((response)=> $q.resolve(response.data), (response) => $q.reject(response.data));

        return $q.promise;
    }

    save(user) {
        let defer = this._util.defer();

        if (user.id == null || user.id == '') {
            this._http.post(this._url, user).then((response)=> defer.resolve(response.data), (response)=> defer.reject(response.data));
        } else {
            this._http.put(this._url + '/' + user.id, user).then((response)=> defer.resolve(response.data), (response)=> defer.reject(response.data));
        }
        return defer.promise;
    }

    disable(user) {
        let $q = this._util.defer();

        this._http.delete(this._url + '/' + user.id).then((response)=> $q.resolve(response.data), (response) => $q.reject(response.data));

        return $q.promise;
    }

    enable(user) {
        let $q = this._util.defer();

        this._http.get(this._url + '/restore/' + user.id).then((response)=> $q.resolve(response.data), (response) => $q.reject(response.data));

        return $q.promise;
    }
}