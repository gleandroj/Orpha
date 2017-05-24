/**
 * Created by FG0003 on 09/02/2017.
 */

class Pia {}

export default class PiaService{

    constructor($http, OrphaUtilService) {

        this._util = OrphaUtilService;
        this._url = "/api/pia";
        this._http = $http;
    }

    getAll() {
        let $q = this._util.defer();

        this._http.get(this._url)
        .then((response)=> {
            let items = response.data;
            items.map((pia) => this._util.extend(new Pia(), pia));
            $q.resolve(items);
        }, (response) => $q.reject(response.data));

        return $q.promise;
    }

    get(id) {
        let $q = this._util.defer();

        this._http.get(this._url + '/' + id).then((response)=> $q.resolve(this._util.extend(new Pia(), response.data)), (response) => $q.reject(response.data));

        return $q.promise;
    }

    save(pia) {
        let defer = this._util.defer();
        if (pia.id == null || pia.id == '') {
            this._http.post(this._url, pia).then((response)=> defer.resolve(this._util.extend(new Pia(), response.data)), (response)=> defer.reject(response.data));
        } else {
            this._http.put(this._url + '/' + pia.id, pia).then((response)=> defer.resolve(this._util.extend(new Pia(), response.data)), (response)=> defer.reject(response.data));
        }
        return defer.promise;
    }

    disable(pia) {
        let $q = this._util.defer();

        this._http.delete(this._url + '/' + pia.id).then((response)=> $q.resolve(this._util.extend(new Pia(), response.data)), (response) => $q.reject(response.data));

        return $q.promise;
    }

    enable(pia) {
        let $q = this._util.defer();

        this._http.get(this._url + '/restore/' + pia.id).then((response)=> $q.resolve(this._util.extend(new Pia(), response.data)), (response) => $q.reject(response.data));

        return $q.promise;
    }
}

PiaService.$inject = ['$http', 'OrphaUtilService'];