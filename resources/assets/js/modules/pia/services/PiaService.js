/**
 * Created by FG0003 on 24/05/2017.
 */

class Pia {}

export default class PiaService{

    constructor($http, OrphaUtilService) {
        this._util = OrphaUtilService;
        this._url = "/api/criancas";
        this._http = $http;
    }

    get(criancaId) {
        let $q = this._util.defer();

        this._http.get(this._url + '/' + criancaId + '/pia')
            .then((response)=> {
                let pia = response.data;
                this._util.extend(new Pia(), pia);
                $q.resolve(pia);
            }, (response) => $q.reject(response.data));

        return $q.promise;
    }
}

PiaService.$inject = ['$http', 'OrphaUtilService'];