/*
import PiaController from './../controllers/PiaController';
import PiaLayoutTemplate from './../pages/pia.layout.tpl.html';
*/

import PiaMenuController from './../controllers/PiaMenuController';
import PiaMenuTemplate from './../pages/pia.menu.tpl.html';

import DadosNecessidadesController from './../controllers/DadosNecessidadesController';
import DadosNecessidadesTemplate from './../pages/dadosenecessidades/layout.tpl.html';

import DocumentacaoTemplate from './../pages/dadosenecessidades/documentacaoapresentada.tpl.html';
import NecessidadesTemplate from './../pages/dadosenecessidades/necessidadedeatendimento.tpl.html';
import RedeApoioTemplate from './../pages/dadosenecessidades/rededeapoio.tpl.html';
import AtividadesTemplate from './../pages/dadosenecessidades/atividadequerealizava.tpl.html';
import TratamentosTemplate from './../pages/dadosenecessidades/tratamentosexternos.tpl.html';
import ReligiosidadeTemplate from './../pages/dadosenecessidades/religiosidade.tpl.html';

import CriancaResolver from './../../crianca/resolvers/CriancaResolve';

RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function RouteConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('crianca.pia', {
            abstract:true,
            url: '/:id/pia',
            template: '<ui-view ng-cloak/>'
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
            views:{
                '':{
                    controller: DadosNecessidadesController,
                    controllerAs: '$controller',
                    resolve: {
                        Crianca: CriancaResolver
                    },
                     template: DadosNecessidadesTemplate
                 },
                'documentacao@crianca.pia.dadosenecessidades':{ template: DocumentacaoTemplate },
                'necessidades@crianca.pia.dadosenecessidades':{ template: NecessidadesTemplate },
                'rededeapoio@crianca.pia.dadosenecessidades':{ template: RedeApoioTemplate },
                'atividades@crianca.pia.dadosenecessidades':{ template: AtividadesTemplate },
                'tratamentos@crianca.pia.dadosenecessidades':{ template: TratamentosTemplate },
                'religiosidade@crianca.pia.dadosenecessidades':{ template: ReligiosidadeTemplate },
            },
            data:{}
        })
}
