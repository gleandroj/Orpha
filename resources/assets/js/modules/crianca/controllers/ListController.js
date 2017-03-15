/**
 * Created by FG0003 on 09/02/2017.
 */
import FallbackImg from './../../../../img/ic_account_circle_black_48dp_2x.png';

export default class ListController {

    constructor($state, DialogService, OrphaUtilService, AuthService, CriancaService, ToastService, MessageService, LogService) {
        this.state = $state;
        this.authService = AuthService;
        this.util = OrphaUtilService;
        this.dialogService = DialogService;
        this.criancaService = CriancaService;
        this.toastService = ToastService;
        this.messageService = MessageService;
        this.logService = LogService;
        this.fallbackImg = FallbackImg;
        this.criancas = [];
        this.search = '';
        this.loading = true;
        this.hideDisabledCriancas = true;
        this.enabledCriancasCurrentPage = this.disabledCriancasCurrentPage = 1;
        this.enabledCriancasItemsPerPage = this.disabledCriancasItemsPerPage = 5;
        this.getAll();
    }

    getAll() {
        this.loading = true;
        this.criancaService.getAll().success((criancas) => {
            this.loading = false;
            this.criancas = criancas;
        })
        .error((error) => this.showError(error));
    }

    showCrianca(crianca) {
        if(this.authService.getCurrentUser().hasPermission('show-crianca')){
            this.state.go('crianca.show', {id: crianca.id});
        }
    }

    editCrianca(crianca) {
        if(this.authService.getCurrentUser().hasPermission('edit-crianca')){
            this.state.go('crianca.edit', {id: crianca.id});
        }
    }

    createCrianca() {
        if(this.authService.getCurrentUser().hasPermission('create-crianca')){
            this.state.go('crianca.create');
        }
    }

    disableCrianca(crianca) {
        if(!this.authService.getCurrentUser().hasPermission('disable-crianca')) return;
        this.criancaService.disable(crianca)
            .success((newCrianca)=> {
                this.util.extend(crianca, newCrianca);
            })
            .error((error) => this.showError(error));
    }

    enableCrianca(crianca) {
        if(!this.authService.getCurrentUser().hasPermission('active-crianca')) return;
        this.criancaService.enable(crianca)
            .success((newCrianca)=> {
                this.util.extend(crianca, newCrianca);
            })
            .error((error) => this.showError(error));
    }

    showError(error){
        this.loading = false;
        this.logService.error(error ? error.error  +": "+error['message'] : this.messageService.get('MSG4'));
        this.toastService.showError(error ? error['message'] : this.messageService.get('MSG4'));
    }
}

ListController.$inject = ['$state','DialogService', 'OrphaUtilService', 'AuthService', 'CriancaService', 'ToastService', 'MessageService', 'LogService'];