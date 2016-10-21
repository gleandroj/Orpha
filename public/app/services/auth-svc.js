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

    .factory('PromiseFactory', ['$q',
        function($q) {
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
    }])

    .service('AuthService', ['$http', '$q', '$window', 'AuthEvents', 'PromiseFactory', '$rootScope', '$interval', 'UserService', 'SESSION_TTL', 'OAUTH', 'ALLOW_STORE_DATE',
        function($http, $q, $window, AuthEvents, PromiseFactory, $rootScope, $interval, UserService, SESSION_TTL, OAUTH, ALLOW_STORE_DATE){
        var self = this;
        var storeDate = ALLOW_STORE_DATE || true;
        var oauth = OAUTH || {
                "client_id": "",
                "client_secret": "",
                "grant_type":"password"
            };
        var currentUser = localStorage.currentUser ? new UserService(angular.fromJson(localStorage.currentUser)) : null;
        var checkSession;
        var sessionTime = SESSION_TTL || 1000 * 60 * 10;

        var getCurrentUser = function () {
            var deferred = PromiseFactory.defer();
            $http.get('api/user')
                .success(function (data) {deferred.resolve(new UserService(data));})
                .error(function (data) {deferred.reject(data);});
            return deferred.promise;
        };

        this.isAuthorized = function(auth){

            auth = auth == null ? [] : auth;

            var roles = [];

            if(self.isAuthenticated() && currentUser){
                roles = currentUser.permissions;
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
            return angular.fromJson(localStorage.token) || {
                    token_type:"",
                    expires_in:"",
                    access_token:"",
                    refresh_token:""
                };
        };

        this.setToken = function (token) {
            localStorage.token = angular.toJson(token);
        };

        this.getCurrentUser = function () {
            return currentUser;
        };

        this.isAuthenticated = function () {
            try{
                return this.getCurrentUser() != {} && this.getToken() && this.getToken().access_token != "";
            }catch (err){
                self.logout();
                return false;
            }
        };

        this.logout = function () {
            currentUser = null;
            self.stopCheckSession();
            localStorage.clear();
            $rootScope.$broadcast(AuthEvents.userLogout);
        };

        this.login = function (username, password) {
            var deferred = PromiseFactory.defer();
            $http.post('oauth/token', angular.extend({username:username, password:password}, oauth))
                .success(function (data) {
                    self.startCheckSession();
                    self.setToken(data);
                    self.checkSession();
                    getCurrentUser().success(function (user) {
                        self.setCurrentUser(user);
                        $rootScope.$broadcast(AuthEvents.userLogged);
                        deferred.resolve(user);
                    }).error(function (error) {
                        self.logout();
                        deferred.reject(error);
                    });
                })
                .error(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        this.reconnect = function () {
            var deferred = PromiseFactory.defer();
            var config = angular.extend({refresh_token:this.getToken().refresh_token}, oauth);
            config.grant_type = "refresh_token";
            $http.post('oauth/token', config)
                .success(function (data) {
                    self.startCheckSession();
                    self.setToken(data);
                    getCurrentUser().success(function (user) {
                        self.setCurrentUser(user);
                        deferred.resolve(user);
                    }).error(function (error) {
                        self.logout();
                        deferred.reject(error);
                    });
                })
                .error(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        this.setLastActivity = function (lastActivity) {
            localStorage.lastAcitivity = angular.toJson(lastActivity);
        };

        this.getLastActivity = function () {
            return new Date(angular.fromJson(localStorage.lastAcitivity));
        };

        this.setCurrentUser = function (user){
            localStorage.currentUser = angular.toJson(currentUser = user);
        };

        this.isSessionExpired = function () {
            if(self.getLastActivity() != null)
                return ((new Date()).getTime() - self.getLastActivity().getTime()) >= sessionTime;
            return true;
        };

        this.checkSession = function () {
            if(self.isAuthenticated() && self.isSessionExpired()){
                $rootScope.$broadcast(AuthEvents.sessionTimedOut);
                localStorage.clear();
            }
        };

        this.startCheckSession = function () {
            self.checkSession();
            if(!self.getLastActivity()){
                self.setLastActivity(new Date());
            }
            if(!checkSession){
                checkSession = $interval(self.checkSession, 1000 );
            }
        };

        this.stopCheckSession = function () {
            $interval.cancel(checkSession);
        };

        this.recoveryPassword = function (email) {
            var deferred = PromiseFactory.defer();
            $http.post('api/password/email', {email:email})
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        if(!storeDate){
            localStorage.clear();
        }

        if(self.isAuthenticated()){
            self.startCheckSession();
        }
    }])

    .factory('OAuthInterceptor', ['$q', '$injector', '$log', function($q, $injector, $log){
        var recoveryRequest = function (config, deferred) {
            var $http = $injector.get('$http');
            function successCallback(response){
                $log.info('Request Recovered with success.');
                deferred.resolve(response);
            }
            function errorCallback(response){
                $log.error('Request Recovered with error.');
                deferred.reject(response);
            }
            $http(config).then(successCallback, errorCallback);
        };

        var _requestFn = function (config) {
            var Auth = $injector.get('AuthService');
            if(Auth.isAuthenticated()){
                var token = Auth.getToken();
                if(token && !Auth.isSessionExpired()){
                    Auth.setLastActivity(new Date());
                    config.headers.Authorization = token.token_type + " " + token.access_token;
                }
            }

            return config;
        };

        var _responseErrorFn = function (response) {
            var deferred = $q.defer();
            var Auth = $injector.get('AuthService');

            if((response.config.url.indexOf('oauth/token') === -1) && response.status  == 401){
                Auth.reconnect()
                    .success(function ()
                    {
                        $log.info('Trying recovery request.');
                        recoveryRequest(response.config, deferred);
                    })
                    .error(function () {
                        Auth.logout();
                        deferred.reject(response);
                    });
            }else {
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
        var self = this;
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
                if(Auth.isAuthenticated()) Auth.setLastActivity(new Date());
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
