
export default class PiaMenuController{

    constructor($state, $scope, DialogService, OrphaUtilService, AuthService, CriancaService, ToastService, MessageService, LogService, Crianca) {
        this.state = $state;
        this.scope = $scope;
        this.authService = AuthService;
        this.util = OrphaUtilService;
        this.dialogService = DialogService;
        this.criancaService = CriancaService;
        this.toastService = ToastService;
        this.messageService = MessageService;
        this.logService = LogService;
        this.crianca = Crianca;
        this.menus = [
            {
                title: 'Dados e Necessidades',
                state: 'crianca.pia.menu({id:'+this.crianca.id+'})'
            },
            {
                title: 'Atividades Socioeducativas',
                state: 'crianca.pia.menu({id:'+this.crianca.id+'})'
            },
            {
                title: 'Informações da Família',
                state: 'crianca.pia.menu({id:'+this.crianca.id+'})'
            }
        ];
    }
}


PiaMenuController.$inject = ['$state', '$scope', 'DialogService', 'OrphaUtilService', 'AuthService', 'CriancaService', 'ToastService', 'MessageService', 'LogService', 'Crianca'];