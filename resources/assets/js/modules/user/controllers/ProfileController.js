import passwordDialogTemplate from './../pages/pw-dialog.tpl.html';

export default class ProfileController{

    constructor(AuthService, UserService, DialogService, ToastService, MessageService){

        this.user = AuthService.getCurrentUser();
        this.userService = UserService;
        this.selectedPage = 'dados';
        this.dialog = DialogService;
        this.toastService = ToastService;
        this.messageService = MessageService;
        this.loading = false;
    }

    showPasswordDialog(){
        this.dialog.showCustomDialog({
            controller: () => this,
            template: passwordDialogTemplate
        }).then(()=>
            this.user.password =
                this.user.password_confirmation = null, ()=>{});
    }

    submitPassword(){
        this.loading = true;
        this.userService.save(this.user)
        .then((scss)=>{
            this.cancelDialog();
            this.loading = false;
            this.toastService.showSuccess(this.messageService.get('MSG7'));
        }, (err)=>{
            this.loading = false;
            console.log(err);
            this.showError(err);
        });
    }

    showError(error){
        this.loading = false;
        let err = (error && error.detail) ? error.detail : error;
        this.logService.error(err && err.error ? err.error  +": "+err['message'] : this.messageService.get('MSG4'));
        this.toastService.showError(err && err.error ? err['message'] : this.messageService.get('MSG4'));
    }

    cancelDialog(){
        this.dialog.cancelDialog();
    }
}

ProfileController.$inject = ['AuthService', 'UserService', 'DialogService', 'ToastService', 'MessageService'];