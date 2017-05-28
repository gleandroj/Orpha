import ListController from './../controllers/ListController';
import ListTemplate from './../pages/list.tpl.html';

import FormController from './../controllers/FormController';
import FormTemplate from './../pages/form.tpl.html';

import CriancaResolver from './../resolvers/CriancaResolve';

RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function RouteConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('crianca', {
            parent:'orpha',
            abstract: true,
            url: '/crianca',
            template: '<ui-view/>'
        })
        .state('crianca.list', {
            url: '/list',
            controller: ListController,
            controllerAs: '$controller',
            template: ListTemplate,
            ncyBreadcrumb: {
                label: 'Crianças'
            }
        })
        .state('crianca.create', {
            url: '/create',
            resolve: {
                Crianca: ()=>{ return {}; },
            },
            data:{
                EditMode: true,
                Title: 'Cadastrar Criança'
            },
            controller: FormController,
            controllerAs: '$controller',
            template: FormTemplate,
            ncyBreadcrumb: {
                label: 'Cadastrar',
                parent: 'crianca.list'
            }
        })
        .state('crianca.show', {
            url: '/:id',
            resolve: {
                Crianca: CriancaResolver
            },
            data:{
                EditMode: false,
                Title: 'Visualizar Criança'
            },
            controller: FormController,
            controllerAs: '$controller',
            template: FormTemplate,
            ncyBreadcrumb: {
                label: '{{ $controller.crianca.nome }}',
                parent: 'crianca.list'
            }
        })
        .state('crianca.edit', {
            url: '/:id/edit',
            resolve: {
                Crianca: CriancaResolver
            },
            data:{
                EditMode: true,
                Title: 'Alterar Criança'
            },
            controller: FormController,
            controllerAs: '$controller',
            template: FormTemplate,
            ncyBreadcrumb: {
                label: '{{ $controller.crianca.nome }}',
                parent: 'crianca.list'
            }
        });
}
