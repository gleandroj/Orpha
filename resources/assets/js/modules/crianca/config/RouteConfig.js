import CriancaController from './../controllers/CriancaController';
import LayoutTemplate from './../pages/layout.tpl.html';

import ListController from './../controllers/ListController';
import ListTemplate from './../pages/list.tpl.html';

export default function RouteConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
        .state('crianca', {
            parent:'orpha',
            abstract: true,
            url: '/crianca',
            controller: CriancaController,
            controllerAs: '$controller',
            template: LayoutTemplate
        })
        .state('crianca.list', {
            url: '/crianca',
            controller: ListController,
            controllerAs: '$controller',
            template: ListTemplate
        })
}

RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];