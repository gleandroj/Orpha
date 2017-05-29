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
                let dadosNecessidades = response.data;
                this._util.extend(new DadosNecessidades(), dadosNecessidades);
                $q.resolve(dadosNecessidades);
            }, (response) => $q.reject(response.data));

        return $q.promise;
    }

    save(criancaId, dadosNecessidades, key) {
        let defer = this._util.defer();
        let url = this._url + '/' + criancaId + '/pia/dadosenecessidades?key='+key;
        this._http.put(url, dadosNecessidades).then((response)=> defer.resolve(this._util.extend(new DadosNecessidades(), response.data)), (response)=> defer.reject(response.data));
        return defer.promise;
    }
}

DadosNecessidadesService.inject = ['$http', 'OrphaUtilService'];