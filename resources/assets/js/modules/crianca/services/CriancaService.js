/**
 * Created by FG0003 on 09/02/2017.
 */

class Crianca {}

export default class CriancaService{

    constructor($http, OrphaUtilService) {

        this._util = OrphaUtilService;
        this._url = "/api/criancas";
        this._http = $http;
    }

    getAll() {
        let $q = this._util.defer();

        this._http.get(this._url)
        .then((response)=> {
            let items = response.data;
            items.map((crianca) => this._util.extend(new Crianca(), crianca));
            $q.resolve(items);
        }, (response) => $q.reject(response.data));

        return $q.promise;
    }

    get(id) {
        let $q = this._util.defer();

        this._http.get(this._url + '/' + id).then((response)=> $q.resolve(this._util.extend(new Crianca(), response.data)), (response) => $q.reject(response.data));

        return $q.promise;
    }

    save(crianca) {
        let defer = this._util.defer();
        if (crianca.id == null || crianca.id == '') {
            this._http.post(this._url, crianca).then((response)=> defer.resolve(this._util.extend(new Crianca(), response.data)), (response)=> defer.reject(response.data));
        } else {
            this._http.put(this._url + '/' + crianca.id, crianca).then((response)=> defer.resolve(this._util.extend(new Crianca(), response.data)), (response)=> defer.reject(response.data));
        }
        return defer.promise;
    }

    disable(crianca) {
        let $q = this._util.defer();

        this._http.delete(this._url + '/' + crianca.id).then((response)=> $q.resolve(this._util.extend(new Crianca(), response.data)), (response) => $q.reject(response.data));

        return $q.promise;
    }

    enable(crianca) {
        let $q = this._util.defer();

        this._http.get(this._url + '/restore/' + crianca.id).then((response)=> $q.resolve(this._util.extend(new Crianca(), response.data)), (response) => $q.reject(response.data));

        return $q.promise;
    }
}

CriancaService.$inject = ['$http', 'OrphaUtilService'];