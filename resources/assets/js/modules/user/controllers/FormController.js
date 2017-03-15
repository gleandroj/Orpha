/**
 * Created by FG0003 on 09/02/2017.
 */

export default class FormController {

    constructor($state, $scope, DialogService, OrphaUtilService, AuthService, UserService, ToastService, MessageService, LogService, User) {
        this.state = $state;
        this.scope = $scope;
        this.authService = AuthService;
        this.util = OrphaUtilService;
        this.dialogService = DialogService;
        this.userService = UserService;
        this.toastService = ToastService;
        this.messageService = MessageService;
        this.logService = LogService;
        this.loading = false;
        this.readOnly = true;
        this.originalUser = this.util.copy(User);
        this.user = User;
        this.title = this.state.current.data.Title || 'Formulário';
        if(this.state.current.data.EditMode){
            this.changeToEditMode();
        }
    }

    get form(){
        return this.scope.userForm;
    }

    changeToEditMode(){
        this.readOnly = false;
        this.title = 'Alterar usuário';
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
        if (this.user.id == '' || this.user.id == null) {
            this.state.go('user.list');
        } else {
            this.readOnly = true;
            this.title = 'Visualizar usuário';
            if(!this.form.$submitted || !this.form.$valid){
                this.user = this.util.copy(this.originalUser);
            }
        }
    }

    save(){
        if (this.user.id == '' || this.user.id == null) {
            this.submitUser();
        } else {
            this.showConfirmation(()=>{
                this.submitUser();
            }, ()=>{});
        }
    }

    submitUser(){
        this.loading = true;
        this.userService.save(this.user)
            .success((newUser) => {
                if (this.authService.getCurrentUser().id === newUser.id) {
                    this.authService.setCurrentUser(newUser);
                }

                this.toastService.showSuccess(this.messageService.get(this.user.id == '' || this.user.id == null ? 'MSG5' : 'MSG7'));

                this.loading = false;
                this.originalUser = this.util.copy(newUser);
                this.user = newUser;
                this.cancel();
            }).error((err)=> {

                this.loading = false;
                if(err.error === 'Unprocessable Entity')
                    this.showValidationErrors(err.errors);
                else
                    this.toastService.showError(err ? err['message'] : this.messageService.get('MSG4'));
            });
    }

    disableUser(){
        if(!this.authService.getCurrentUser().hasPermission('disable-user')  || this.authService.getCurrentUser().id == this.user.id) return;
        this.loading = true;
        this.userService.disable(this.user)
            .success((newUser)=> {
                if (this.authService.getCurrentUser().id === newUser.id) {
                    this.authService.setCurrentUser(newUser);
                }

                this.loading = false;
                this.originalUser = this.util.copy(newUser);
                this.user = newUser;
                this.cancel();
            })
            .error((error) => this.showError(error));
    }

    enableUser() {
        if(!this.authService.getCurrentUser().hasPermission('active-user')) return;
        this.loading = true;
        this.userService.enable(this.user)
            .success((newUser)=> {
                this.loading = false;
                this.originalUser = this.util.copy(newUser);
                this.user = newUser;
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

FormController.$inject = ['$state', '$scope', 'DialogService', 'OrphaUtilService', 'AuthService', 'UserService', 'ToastService', 'MessageService', 'LogService', 'User'];