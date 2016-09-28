/**
 * Created by marcosnqs on 27/09/2016.
 */

angular.module('orpha.routes', [])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/orpha/dashboard');

        $stateProvider.state('app',{
            abstract:true,
            template: '<ui-view></ui-view>'
        })
        .state('app.login',{
            url: '/login',
            templateUrl: '../app/components/login/login-tpl.html'
        })
        .state('app.orpha',{
            abstract:true,
            url: '/orpha',
            controller:'orphaCtrl',
            templateUrl: '../app/components/orpha/orpha-tpl.html'
        })
        .state('app.orpha.dashboard',{
            url: '/dashboard',
            templateUrl: '../app/components/dashboard/dashboard-tpl.html'
        })
        .state('app.orpha.users',{
            url: '/users',
            templateUrl: '../app/components/users/users-tpl.html'
        });
    });
