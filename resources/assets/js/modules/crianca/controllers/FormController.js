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
        this.title = this.state.current.data.Title || 'Formulário';
        if(this.state.current.data.EditMode){
            this.changeToEditMode();
        }
    }

    get form(){
        return this.scope.criancaForm;
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

    cancel() {
        if (this.crianca.id == '' || this.crianca.id == null) {
            this.state.go('crianca.list');
        } else {
            this.readOnly = true;
            this.title = 'Visualizar criança';
            if(!this.form.$submitted || !this.form.$valid){
                this.crianca = this.util.copy(this.originalCrianca);
            }
        }
    }

    save(){
        if (this.crianca.id == '' || this.crianca.id == null) {
            this.submitCrianca();
        } else {
            this.showConfirmation(()=>{
                this.submitCrianca();
            }, ()=>{});
        }
    }

    submitCrianca(){
        this.loading = true;
        this.criancaService.save(this.crianca)
            .success((newCrianca) => {

                this.toastService.showSuccess(this.messageService.get(this.crianca.id == '' || this.crianca.id == null ? 'MSG5' : 'MSG7'));

                this.loading = false;
                this.originalCrianca = this.util.copy(newCrianca);
                this.crianca = newCrianca;
                this.cancel();
            }).error((err)=> {

                this.loading = false;
                if(err.error === 'Unprocessable Entity')
                    this.showValidationErrors(err.errors);
                else
                    this.toastService.showError(err ? err['message'] : this.messageService.get('MSG4'));
            });
    }

    disableCrianca(){
        if(!this.authService.getCurrentCrianca().hasPermission('disable-crianca')  || this.authService.getCurrentCrianca().id == this.crianca.id) return;
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
        if(!this.authService.getCurrentCrianca().hasPermission('active-crianca')) return;
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

    showConfirmation(okCallback, cancelCallback){
        this.dialogService
            .showConfirmDialog({
                title: 'Confirmação',
                okBtn: 'Sim',
                cancelBtn: 'Não',
                message: this.messageService.get('MSG6')
            }).then(okCallback, cancelCallback);
    }
}

FormController.$inject = ['$state', '$scope', 'DialogService', 'OrphaUtilService', 'AuthService', 'CriancaService', 'ToastService', 'MessageService', 'LogService', 'Crianca'];