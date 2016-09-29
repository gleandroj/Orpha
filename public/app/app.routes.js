/**
 * Created by marcosnqs on 27/09/2016.
 */

angular.module('orpha.routes', [])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/orpha/dashboard');

    $stateProvider
        .state('login',{
            url: '/login',
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
            controller:'userCtrl',
            templateUrl: '../app/components/users/users-tpl.html'
        });
    });
