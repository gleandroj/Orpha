import OrphaController from './../controllers/OrphaController';
import OrphaTemplate from './../pages/orpha.tpl.html';

import DashboardController from './../controllers/DashboardController';
import DashboardTemplate from './../pages/dashboard.tpl.html';

export default function RouteConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('orpha', {
            abstract: true,
            url: '/orpha',
            controller: OrphaController,
            controllerAs: '$ctrl',
            template: OrphaTemplate,
        }).state('orpha.dashboard', {
            url: '/dashboard',
            controller: DashboardController,
            controllerAs: '$controller',
            template: DashboardTemplate,
            ncyBreadcrumb: {
                label: 'Dashboard'
            }
        });

}

RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];