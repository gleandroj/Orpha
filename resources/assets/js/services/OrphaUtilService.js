/**
 * Created by FG0003 on 27/12/2016.
 */

export default class OrphaUtilService{

    constructor($rootScope, $timeout, $interval, $q){
        'ngInject';
        this.rootscope = $rootScope;
        this.$q = $q;
        this.$timeout = $timeout;
        this.$interval = $interval;
    }

    fromJson(json){
        return angular.fromJson(json);
    }

    toJson(obj){
        return angular.toJson(obj);
    }

    forEach(obj, callback){
        return angular.forEach(obj,  callback);
    }

    broadcast(event, args){
        return this.rootscope.$broadcast(event, args);
    }

    on(event, callback){
        return this.rootscope.$on(event, callback);
    }

    extend(dest, options){
        return angular.extend(dest, options);
    }

    copy(source, destination){
        return angular.copy(source, destination);
    }

    element(element){
        return angular.element(element);
    }

    timeout(callback, time){
        return this.$timeout(callback, time);
    }

    interval(callback, time){
        return this.$interval(callback, time);
    }

    cancelInterval(callback){
        return this.$interval.cancel(callback);
    }

    _decorate(promise){
        promise.success = (callback) => {
            promise.then(callback, ()=>{});
            return promise;
        };
        promise.error = (callback) =>{
            promise.then(()=>{}, callback);
            return promise;
        };
    }
    
    defer(){
        let deferred = this.$q.defer();
        this._decorate(deferred.promise);
        return deferred;
    }
}