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

import AtividadesSocioeducativasController from './../controllers/AtividadesSocioeducativasController';
import AtividadesSocioeducativasTemplate from './../pages/atividadessocioeducativas/layout.tpl.html';

import EducacaoCidadaniaTemplate from './../pages/atividadessocioeducativas/educacaoecidadania.tpl.html';
import EducacaoMeioAmbienteTemplate from './../pages/atividadessocioeducativas/educacaoemeioambiente.tpl.html';
import EducacaoSaudeTemplate from './../pages/atividadessocioeducativas/educacaoesaude.tpl.html';


import InformacoesFamiliaController from './../controllers/InformacoesFamiliaController';
import InformacoesFamiliaTemplate from './../pages/informacoesdafamilia/layout.tpl.html';

import CriancaResolver from './../../crianca/resolvers/CriancaResolve';
import PiaResolve from './../resolvers/PiaResolve';
import DadosNecessidadesResolve from './../resolvers/DadosNecessidadesResolve';
import AtividadesSocioeducativasResolve from './../resolvers/AtividadesSocioeducativasResolve';

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
        .state('crianca.pia.atividadessocioeducativas', {
            url: '/atividadessocioeducativas',
            views:{
                '':{
                    controller: AtividadesSocioeducativasController,
                     template: AtividadesSocioeducativasTemplate,
                    controllerAs: '$controller',
                 },
                'educacaoecidadania@crianca.pia.atividadessocioeducativas':{ template: EducacaoCidadaniaTemplate },
                'educacaoemeioambiente@crianca.pia.atividadessocioeducativas':{ template: EducacaoMeioAmbienteTemplate },
                'educacaoesaude@crianca.pia.atividadessocioeducativas':{ template: EducacaoSaudeTemplate }
            },
            data:{},
            resolve: {
                Crianca: CriancaResolver,
                Pia: PiaResolve,
                AtividadesSocioeducativas: AtividadesSocioeducativasResolve
            },
            authorized: ['show-atividades-socioeducativas'],
            ncyBreadcrumb: {
                label: 'Atividades Socioeducativas',
                parent: 'crianca.pia.menu'
            }
        })
        .state('crianca.pia.informacoesdafamilia', {
            url: '/informacoesdafamilia',
            views:{
                '':{
                    controller: InformacoesFamiliaController,
                     template: InformacoesFamiliaTemplate,
                    controllerAs: '$controller',
                 },
                'atendimentorealizado@crianca.pia.informacoesdafamilia':{ template: EducacaoCidadaniaTemplate },
                'rededeapoio@crianca.pia.informacoesdafamilia':{ template: EducacaoCidadaniaTemplate },
                'orientacaorealizada@crianca.pia.informacoesdafamilia':{ template: EducacaoCidadaniaTemplate },
                'rededeapoio2@crianca.pia.informacoesdafamilia':{ template: EducacaoCidadaniaTemplate }
            },
            data:{},
            resolve: {
                Crianca: CriancaResolver,
                Pia: PiaResolve,
                InformacoesFamilia: AtividadesSocioeducativasResolve
            },
            authorized: ['show-atividades-socioeducativas'],
            ncyBreadcrumb: {
                label: 'Atividades Socioeducativas',
                parent: 'crianca.pia.menu'
            }
        })
}
