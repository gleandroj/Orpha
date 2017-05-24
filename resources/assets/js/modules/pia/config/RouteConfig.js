
import PiaController from './../controllers/PiaController';
import PiaTemplate from './../pages/layout.tpl.html';

import PiaMenuController from './../controllers/PiaMenuController';
import PiaMenuTemplate from './../pages/pia.menu.tpl.html';

import DadosNecessidadesController from './../controllers/DadosNecessidadesController';
import DadosNecessidadesTemplate from './../pages/pia.dadosenecessidades.tpl.html';

import CriancaResolver from './../../crianca/resolvers/CriancaResolve';

RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function RouteConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('crianca.pia', {
            abstract:true,
            url: '/:id/pia',
            data:{},
            controller: PiaController,
            controllerAs: '$controller',
            template: PiaTemplate
        })
        .state('crianca.pia.menu', {
            url: '/menu',
            resolve: {
                Crianca: CriancaResolver
            },
            data:{},
            controller: PiaMenuController,
            controllerAs: '$controller',
            template: PiaMenuTemplate
        })
        .state('crianca.pia.dadosenecessidades', {
            url: '/dadosenecessidades',
            resolve: {
                Crianca: CriancaResolver
            },
            data:{},
            controller: DadosNecessidadesController,
            controllerAs: '$controller',
            template: DadosNecessidadesTemplate
        })


}
