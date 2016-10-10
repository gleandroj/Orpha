/**
 * Created by FG0003 on 10/10/2016.
 */

angular.module('orpha.services')
    .constant("AuthEvents", {
        accessDenied : "auth.access_denied",
        userLogged : "auth.user_logged",
        userLogout:"auth.user_logout",
        sessionTimedOut:"auth.session_timed_out"
    })
    .factory('PromiseFactory', function($q) {
        return {
            decorate: function(promise) {
                promise.success = function(callback) {
                    promise.then(callback);

                    return promise;
                };
                promise.error = function(callback) {
                    promise.then(null, callback);

                    return promise;
                };
            },
            defer: function() {
                var deferred = $q.defer();
                this.decorate(deferred.promise);
                return deferred;
            }
        };
    })
    .service('AuthService', function($http, $q, AuthEvents, PromiseFactory, $rootScope){
        var self = this;
        var storeDate = true;
        var oauth = {
            "client_id": "1",
            "client_secret": "QEF2iLTFsN7qLzi51aYh7AA0j4Jl8Rw67GlAVN5U",
            "grant_type":"password"
        };
        var currentUser = localStorage.currentUser ? angular.fromJson(localStorage.currentUser) : null;
        localStorage.token = localStorage.token || angular.toJson({
            token_type:"",
            expires_in:"",
            access_token:"",
            refresh_token:""
        });
        localStorage.sessionStart = localStorage.sessionStart || angular.toJson(null);

        var getCurrentUser = function () {
            var deferred = PromiseFactory.defer();
            $http.get('api/user')
                .success(function (data) {deferred.resolve(data);})
                .error(function (data) {deferred.reject(data);});
            return deferred.promise;
        };

        this.isAuthorized = function(auth){

            auth = auth == null ? [] : auth;

            var roles = [];

            if(self.isAuthenticated()){
                roles = self.getCurrentUser().permissions;
            }
            else{
                return false;
            }

            if(typeof auth === "string"){
                auth = [auth];
            }

            if(typeof roles === "string"){
                roles = [roles];
            }

            var isAllowed = true;

            if(auth[0]){
                isAllowed = false;
                for(var i = 0; i < roles.length; i++){
                    if(auth.indexOf(roles[i].slug) !== -1){
                        isAllowed = true;
                        break;
                    }
                }
            }

            return isAllowed;
        };

        this.getToken = function () {
            return angular.fromJson(localStorage.token);
        };

        this.getSessionStart = function () {
            return angular.fromJson(localStorage.sessionStart);
        };

        this.getCurrentUser = function () {
            return currentUser;
        };

        this.isAuthenticated = function () {
            return this.getCurrentUser() != {} && this.getSessionStart() != null && this.getToken().access_token != "";
        };

        this.login = function (username, password) {
            var deferred = PromiseFactory.defer();
            $http.post('oauth/token', angular.extend(oauth, {username:username, password:password}))
                .success(function (data) {
                    localStorage.token = angular.toJson(angular.copy(data));
                    localStorage.sessionStart = angular.toJson(new Date());
                    getCurrentUser().success(function (user) {
                        self.setCurrentUser(user);
                        $rootScope.$broadcast(AuthEvents.userLogged);
                        deferred.resolve(user);
                    }).error(function (error) {
                        localStorage.clear();
                        $rootScope.$broadcast(AuthEvents.userLogout);
                        deferred.reject(error);
                    });
                })
                .error(function (data) {
                    localStorage.clear();
                    $rootScope.$broadcast(AuthEvents.userLogout);
                    deferred.reject(data);
                });

            return deferred.promise;
        };

        this.logout = function () {
            currentUser = null;
            localStorage.clear();
            $rootScope.$broadcast(AuthEvents.userLogout);
        };

        this.reconnect = function () {
            var deferred = PromiseFactory.defer();
            $http.post('oauth/token', angular.extend(oauth, {}))
                .success(function (data) {
                    localStorage.token = angular.toJson(angular.copy(data));
                    localStorage.sessionStart = angular.toJson(new Date());
                    getCurrentUser().success(function (user) {
                        self.setCurrentUser(user);
                        $rootScope.$broadcast(AuthEvents.userLogged);
                        deferred.resolve(user);
                    }).error(function (error) {
                        localStorage.clear();
                        $rootScope.$broadcast(AuthEvents.userLogout);
                        deferred.reject(error);
                    });
                })
                .error(function (data) {
                    localStorage.clear();
                    $rootScope.$broadcast(AuthEvents.userLogout);
                    deferred.reject(data);
                });
        };

        this.setCurrentUser = function (user){
            localStorage.currentUser = angular.toJson(currentUser = user);
        };

        if(!storeDate)
            localStorage.clear();
    })
    .factory('OAuthInterceptor', ['$q', '$injector', '$log', function($q, $injector, $log){

        var recoveryRequest = function (config, deferred) {
            var $http = $injector.get('$http');
            function successCallback(response){
                $log.info('Request Recovered with success.');
                deferred.resolve(response);
            }
            function errorCallback(response){
                $log.error('Request Recovered with error.')
                deferred.reject(response);
            }
            $http(config).then(successCallback, errorCallback);
        };

        var _requestFn = function (config) {
            var Auth = $injector.get('AuthService');

            if(Auth.isAuthenticated()){
                var token = Auth.getToken();
                if(token){
                    config.headers.Authorization = token.token_type + " " + token.access_token;
                }
            }

            return config;
        };

        var _responseErrorFn = function (response) {
            var deferred = $q.defer();
            var Auth = $injector.get('AuthService');

            if((response.config.url.indexOf('oauth/token') === -1) &&
                ((response.status == 400 || response.status  == 401) &&
                response.data.error == 'Unauthenticated.')){
                Auth.reconnect()
                    .success(function ()
                    {
                        $log.info('Trying recovery request.');
                        recoveryRequest(response.config, deferred);
                    })
                    .error(function () {
                        deferred.reject(response);
                        Auth.logout();
                    });
            }
            else {
                deferred.reject(response);
            }


            return deferred.promise;
        };

        return {
            request:_requestFn,
            responseError:_responseErrorFn
        }
    }])
    .service("AuthStateService", ["$rootScope", "$location", "$window", "AuthEvents", "$state", "AuthService", "$log", function ($rootScope, $location, $window, AuthEvents, $state, AuthService, $log){
        var back = {};
        var Auth = AuthService;

        this.onChange = function(event, next, prev){
            var auth = next['authorized'] ? next['authorized'] : [];
            var allowAnonymous = next['allowAnonymous'] ? next['allowAnonymous'] : false;

            if(allowAnonymous){
                return true;
            }
            else if(!allowAnonymous && !Auth.isAuthenticated()){
                event.preventDefault();
                self.deny(back, next);
            }
            else if(Auth.isAuthenticated() && !AuthService.isAuthorized(auth)){
                event.preventDefault();
                self.deny(back, next);
                return false;
            }
            else if(!Auth.isAuthenticated()) {
                event.preventDefault();
                self.deny(back, next);
            }
            else{
                return true;
            }
        };

        this.deny = function (back, next) {
            $rootScope.$broadcast(AuthEvents.accessDenied, next.name);
            $log.error("Access denied on unauthorized root:", next.name);
            if(back.name){
                $state.go(back.name);
            }else if(Auth.isAuthenticated()) {
                $state.go("orpha.dashboard");
            }else{
                $state.go("login");
            }
        };

    }])
    .directive("ngAuth", ["$interval", "AuthService", function ($interval, AuthService){
        return {
            restrict: "A",
            scope: {
                authorized: "=ngAuth"
            },
            link: function (scope, element, attrs){
                if(scope.authorized === undefined) return;
                var removed = false;
                function compile(){
                    if(!AuthService.isAuthorized(scope.authorized)){
                        if(!removed){
                            element.addClass("ng-hide");
                            removed = true;
                        }
                    }else{
                        if(removed){
                            element.removeClass("ng-hide");
                            removed = false;
                        }
                    }
                }
                compile();
                $interval(compile, 5000);
            }
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('OAuthInterceptor');
    }])
    .run(['$rootScope', 'AuthStateService', 'AuthEvents',function ($rootScope, AuthStateService, AuthEvents) {
        $rootScope.$on("$stateChangeStart", AuthStateService.onChange);
    }]);
