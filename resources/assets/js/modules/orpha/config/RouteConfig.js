import OrphaController from './../controllers/OrphaController';
import OrphaTemplate from './../pages/orpha.tpl.html';

export default function RouteConfig($stateProvider, $urlRouterProvider) {
    'ngInject'
    $stateProvider
        .state('orpha', {
            abstract: true,
            url: '/orpha',
            controller: OrphaController,
            controllerAs: '$ctrl',
            template: OrphaTemplate
        });

}

RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];