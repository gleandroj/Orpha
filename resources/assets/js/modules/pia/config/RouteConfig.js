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
import PiaResolve from './../resolvers/PiaResolve';
import DadosNecessidadesResolve from './../resolvers/DadosNecessidadesResolve';

RouteConfig.$inject = ['$stateProvider'];

export default function RouteConfig($stateProvider) {

    $stateProvider
        .state('crianca.pia', {
            abstract:true,
            url: '/:id/pia',
            template: '<ui-view/>'
        })
        .state('crianca.pia.menu', {
            url: '/menu',
            resolve: {
                Crianca: CriancaResolver,
                Pia: PiaResolve
            },
            data:{},
            controller: PiaMenuController,
            controllerAs: '$controller',
            template: PiaMenuTemplate,
            authorized: ['show-pia'],
            ncyBreadcrumb: {
                label: 'PIA',
                parent: 'crianca.show'
            }
        })
        .state('crianca.pia.dadosenecessidades', {
            url: '/dadosenecessidades',
            views:{
                '':{
                    controller: DadosNecessidadesController,
                    controllerAs: '$controller',
                     template: DadosNecessidadesTemplate,
                 },
                'documentacao@crianca.pia.dadosenecessidades':{ template: DocumentacaoTemplate },
                'necessidades@crianca.pia.dadosenecessidades':{ template: NecessidadesTemplate },
                'rededeapoio@crianca.pia.dadosenecessidades':{ template: RedeApoioTemplate },
                'atividades@crianca.pia.dadosenecessidades':{ template: AtividadesTemplate },
                'tratamentos@crianca.pia.dadosenecessidades':{ template: TratamentosTemplate },
                'religiosidade@crianca.pia.dadosenecessidades':{ template: ReligiosidadeTemplate },
            },
            data:{},
            resolve: {
                Crianca: CriancaResolver,
                Pia: PiaResolve,
                DadosNecessidades: DadosNecessidadesResolve
            },
            authorized: ['show-dados-necessidades'],
            ncyBreadcrumb: {
                label: 'Dados e Necessidades',
                parent: 'crianca.pia.menu'
            }
        })
}
