/**
 * Created by FG0003 on 24/05/2017.
 */

class DadosNecessidades {}

export default class DadosNecessidadesService{

    constructor($http, OrphaUtilService) {
        this._util = OrphaUtilService;
        this._url = "/api/criancas";
        this._http = $http;
    }

    get(criancaId) {
        let $q = this._util.defer();

        this._http.get(this._url + '/' + criancaId + '/pia/dadosenecessidades')
            .then((response)=> {
                let items = response.data;
                items.map((pia) => this._util.extend(new Pia(), pia));
                $q.resolve(items);
            }, (response) => $q.reject(response.data));

        return $q.promise;
    }

    save(criancaId, dadosNecessidades, key) {
        let defer = this._util.defer();
        let url = this._url + '/' + criancaId + '/pia/dadosenecessidades?key='+key;

        if (dadosNecessidades.id == null || dadosNecessidades.id == '') {
            this._http.post(url, dadosNecessidades).then((response)=> defer.resolve(this._util.extend(new DadosNecessidades(), response.data)), (response)=> defer.reject(response.data));
        } else {
            this._http.put(url + '/' + dadosNecessidades.id, dadosNecessidades).then((response)=> defer.resolve(this._util.extend(new DadosNecessidades(), response.data)), (response)=> defer.reject(response.data));
        }
        return defer.promise;
    }
}

DadosNecessidadesService.inject = ['$http', 'OrphaUtilService'];