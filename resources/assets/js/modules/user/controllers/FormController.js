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
        if(this.state.current.data.EditMode){
            this.changeToEditMode();
        }
        this.title = this.state.current.data.Title || 'Formulário';
    }

    get form(){
        return this.scope.userForm;
    }

    changeToEditMode(){
        this.readOnly = false;
        this.title = 'Alterar usuário';
    }

    goBack(){
        this.state.go('user.list').then(()=>{}, (err) => this.showError(err));
    }

    showError(error){
        this.loading = false;
        let err = (error && error.detail) ? error.detail : error;
        this.logService.error(err && err.error ? err.error  +": "+err['message'] : this.messageService.get('MSG4'));
        this.toastService.showError(err && err.error ? err['message'] : this.messageService.get('MSG4'));
    }

    showValidationErrors(errors){
        this.toastService.showError(Object.keys(errors).map((key) => errors[key]).join(", "));
    }

    cancel() {
        this.state.go('user.list');
    }

    save(){
        if(!this.authService.getCurrentUser().hasPermission(['create-user', 'edit-user'])) return;
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
                    this.showError(err);
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