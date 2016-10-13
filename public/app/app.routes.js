/**
 * Created by marcosnqs on 27/09/2016.
 */

angular.module('orpha.routes')
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login',{
                url: '/login',
                allowAnonymous:true,
                controller:'loginCtrl',
                templateUrl: '../app/components/login/login-tpl.html'
            })
            .state('forgetPassword',{
                url: '/recovery',
                allowAnonymous:true,
                controller:'forgetCtrl',
                templateUrl: '../app/components/login/forget-password-tpl.html'
            })
            .state('loginRecovery',{
                url: '/loginRecovery',
                allowAnonymous:true,
                controller:'loginRecoveryCtrl',
                templateUrl: '../app/components/login/login-tpl.html'
            })
            .state('orpha',{
                abstract:true,
                url: '/orpha',
                controller:'orphaCtrl',
                templateUrl: '../app/components/orpha/orpha-tpl.html'
            })
            .state('orpha.dashboard',{
                url: '/dashboard',
                templateUrl: '../app/components/dashboard/dashboard-tpl.html'
            })
            .state('orpha.users',{
                url: '/users',
                authorized:['list-user'],
                controller:'userCtrl',
                templateUrl: '../app/components/users/users-tpl.html'
            });
    })
    .run(function ($rootScope, AuthEvents, $state, AuthService, MessagesService) {
        $rootScope.$on(AuthEvents.userLogout, function () {
            $state.go('login');
        });
        $rootScope.$on(AuthEvents.sessionTimedOut, function ()   {
            AuthService.logout();
            MessagesService.showErrorMessage("MSG15");
        });
    });
