
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
                state: 'crianca.pia.dadosenecessidades'
            },
            {
                title: 'Atividades Socioeducativas',
                state: 'crianca.pia.menu'
            },
            {
                title: 'Informações da Família',
                state: 'crianca.pia.menu'
            }
        ];
    }

    navigateTo(state){
        this.loading = true;
        this.state.go(state, {id: this.crianca.id }).then(()=>{}, (error) => this.showError(error));
    }

    showError(error){
        this.loading = false;
        this.logService.error(error ? error.error  +": "+error['message'] : this.messageService.get('MSG4'));
        this.toastService.showError(error ? error['message'] : this.messageService.get('MSG4'));
    }
}


PiaMenuController.$inject = ['$state', '$scope', 'DialogService', 'OrphaUtilService', 'AuthService', 'CriancaService', 'ToastService', 'MessageService', 'LogService', 'Crianca'];