import ListController from './../controllers/ListController';
import ListTemplate from './../pages/list.tpl.html';

import ProfileController from './../controllers/ProfileController';
import ProfileTemplate from './../pages/profile.tpl.html';

import FormController from './../controllers/FormController';
import FormTemplate from './../pages/form.tpl.html';

import UserResolver from './../resolvers/UserResolve';

RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function RouteConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('user', {
            parent:'orpha',
            abstract: true,
            url: '/user',
            template: '<ui-view/>'
        })
        .state('user.profile', {
            url: '/profile',
            controller: ProfileController,
            controllerAs: '$controller',
            template: ProfileTemplate,
            ncyBreadcrumb: {
                label: 'Perfil'
            }
        })
        .state('user.list', {
            url: '/list',
            controller: ListController,
            controllerAs: '$controller',
            template: ListTemplate,
            ncyBreadcrumb: {
                label: 'Usuários'
            }
        })
        .state('user.create', {
            url: '/create',
            resolve: {
                User: ()=>{ return {}; },
            },
            data:{
                EditMode: true,
                Title: 'Cadastrar usuário'
            },
            controller: FormController,
            controllerAs: '$controller',
            template: FormTemplate,
            ncyBreadcrumb: {
                label: 'Cadastrar',
                parent: 'user.list'
            }
        })
        .state('user.show', {
            url: '/:id',
            resolve: {
                User: UserResolver
            },
            data:{
                EditMode: false,
                Title: 'Visualizar usuário'
            },
            controller: FormController,
            controllerAs: '$controller',
            template: FormTemplate,
            ncyBreadcrumb: {
                label: '{{ $controller.user.name }}',
                parent: 'user.list'
            }
        })
        .state('user.edit', {
            url: '/:id/edit',
            resolve: {
                User: UserResolver
            },
            data:{
                EditMode: true,
                Title: 'Alterar usuário'
            },
            controller: FormController,
            controllerAs: '$controller',
            template: FormTemplate,
            ncyBreadcrumb: {
                label: '{{ $controller.user.name }}',
                parent: 'user.list'
            }
        })
}
