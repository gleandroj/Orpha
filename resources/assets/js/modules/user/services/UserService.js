/**
 * Created by FG0003 on 09/02/2017.
 */

export default class UserService{

    constructor($http, OrphaUtilService){
        this._util = OrphaUtilService;
        this._url = "/api/users";
        this._http = $http;
    }

    getAll(){
        let $q = this._util.defer();

        this._http.get(this._url).then((response)=> $q.resolve(response.data), (response) => $q.reject(response.data));

        return $q.promise;
    }

}