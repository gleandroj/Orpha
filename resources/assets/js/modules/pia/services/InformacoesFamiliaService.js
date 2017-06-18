/**
 * Created by FG0003 on 24/05/2017.
 */

class InformacoesFamilia {}

export default class InformacoesFamiliaService{

    constructor($http, OrphaUtilService) {
        this._util = OrphaUtilService;
        this._url = "/api/criancas";
        this._http = $http;
    }

    get(criancaId) {
        let $q = this._util.defer();

        this._http.get(this._url + '/' + criancaId + '/pia/informacoesdafamilia')
            .then((response)=> {
                let atividadesSocioeducativas = response.data;
                this._util.extend(new InformacoesFamilia(), atividadesSocioeducativas);
                $q.resolve(atividadesSocioeducativas);
            }, (response) => $q.reject(response.data));

        return $q.promise;
    }

    save(criancaId, atividadesSocioeducativas, key) {
        let defer = this._util.defer();
        let url = this._url + '/' + criancaId + '/pia/informacoesdafamilia?key='+key;
        this._http.put(url, atividadesSocioeducativas).then((response)=> defer.resolve(this._util.extend(new InformacoesFamilia(), response.data)), (response)=> defer.reject(response.data));
        return defer.promise;
    }
}

InformacoesFamiliaService.$inject = ['$http', 'OrphaUtilService'];