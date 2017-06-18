
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
                state: 'crianca.pia.dadosenecessidades',
                permission: ['show-dados-necessidades']
            },
            {
                title: 'Atividades Socioeducativas',
                state: 'crianca.pia.atividadessocioeducativas',
                permission: ['show-atividades-socioeducativas']
            },
            {
                title: 'Informações da Família',
                state: 'crianca.pia.informacoesdafamilia',
                permission: ['show-informacoes-familia']
            }
        ];
    }

    navigateTo(state){
        this.loading = true;
        this.state.go(state, {id: this.crianca.id }).then(()=>{}, (error) => this.showError(error));
    }

    goBack(){
        this.navigateTo('crianca.show');
    }

    showError(error){
        this.loading = false;
        let err = (error && error.detail) ? error.detail : error;
        this.logService.error(err && err.error ? err.error  +": "+err['message'] : this.messageService.get('MSG4'));
        this.toastService.showError(err && err.error ? err['message'] : this.messageService.get('MSG4'));
    }
}


PiaMenuController.$inject = ['$state', '$scope', 'DialogService', 'OrphaUtilService', 'AuthService', 'CriancaService', 'ToastService', 'MessageService', 'LogService', 'Crianca'];