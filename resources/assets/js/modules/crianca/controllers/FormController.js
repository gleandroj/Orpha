/**
 * Created by FG0003 on 09/02/2017.
 */

export default class FormController {

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
        this.loading = false;
        this.readOnly = true;
        this.originalCrianca = this.util.copy(Crianca);
        this.crianca = Crianca;
        if(this.state.current.data.EditMode){
            this.changeToEditMode();
        }
        this.title = this.state.current.data.Title || 'Formulário';
    }

    get form(){
        return this.scope.criancaForm;
    }

    get isNewCrianca(){
        return this.crianca.id === '' || this.crianca.id === null || this.util.isUndefined(this.crianca.id);
    }

    changeToEditMode(){
        this.readOnly = false;
        this.title = 'Alterar criança';
    }

    showError(error){
        this.loading = false;
        this.logService.error(error ? error.error  +": "+error['message'] : this.messageService.get('MSG4'));
        this.toastService.showError(error ? error['message'] : this.messageService.get('MSG4'));
    }

    showValidationErrors(errors){
        this.toastService.showError(Object.keys(errors).map((key) => errors[key]).join(", "));
    }

    showConfirmation(okCallback, cancelCallback){
        this.dialogService
            .showConfirmDialog({
                title: 'Confirmação',
                okBtn: 'Sim',
                cancelBtn: 'Não',
                message: this.messageService.get('MSG6')
            }).then(okCallback, cancelCallback);
    }

    showPia(){
        if(this.authService.getCurrentUser().hasPermission('show-crianca')){ // need validate the correct permission
            this.loading = true;
            this.state.go('crianca.pia.menu', {id: this.crianca.id}).then(()=>{}, (error) => this.showError(error));
        }
    }

    save(){
        if(!this.authService.getCurrentUser().hasPermission(['create-crianca', 'edit-crianca'])) return;
        if (this.isNewCrianca) {
            this.submitCrianca();
        } else {
            this.showConfirmation(()=>{
                this.submitCrianca();
            }, ()=>{});
        }
    }

    cancel() {
        this.state.go('crianca.list');
    }

    submitCrianca(){
        this.loading = true;
        this.criancaService.save(this.crianca)
            .success((newCrianca) => {
                this.toastService.showSuccess(this.messageService.get(this.isNewCrianca ? 'MSG5' : 'MSG7'));
                this.originalCrianca = this.util.copy(newCrianca);
                this.crianca = newCrianca;
                this.cancel();
                this.loading = false;
            }).error((err)=> {
                this.loading = false;
                if(err.error === 'Unprocessable Entity')
                    this.showValidationErrors(err.errors);
                else
                    this.toastService.showError(err ? err['message'] : this.messageService.get('MSG4'));
            });
    }

    disableCrianca(){
        if(!this.authService.getCurrentUser().hasPermission('disable-crianca')) return;
        this.loading = true;
        this.criancaService.disable(this.crianca)
            .success((newCrianca)=> {

                this.loading = false;
                this.originalCrianca = this.util.copy(newCrianca);
                this.crianca = newCrianca;
                this.cancel();
            })
            .error((error) => this.showError(error));
    }

    enableCrianca() {
        if(!this.authService.getCurrentUser().hasPermission('active-crianca')) return;
        this.loading = true;
        this.criancaService.enable(this.crianca)
            .success((newCrianca)=> {
                this.loading = false;
                this.originalCrianca = this.util.copy(newCrianca);
                this.crianca = newCrianca;
                this.cancel();
            })
            .error((error) => this.showError(error));
    }
}

FormController.$inject = ['$state', '$scope', 'DialogService', 'OrphaUtilService', 'AuthService', 'CriancaService', 'ToastService', 'MessageService', 'LogService', 'Crianca'];