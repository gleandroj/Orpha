import passwordDialogTemplate from './../pages/pw-dialog.tpl.html';

export default class ProfileController{

    constructor(AuthService, UserService, DialogService, ToastService, MessageService){
        'ngInject'
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
        }).then(()=>{}, ()=>{});
    }

    submitPassword(){
        this.loading = true;
        this.userService.save(this.user)
        .then((scss)=>{
            this.cancelDialog();
            this.loading = false;
        }, (err)=>{
            this.loading = false;
            console.log(err);
            this.toastService.showError(err ? err['message'] : this.messageService.get('MSG4'));
        });
    }

    cancelDialog(){
        this.dialog.cancelDialog();
    }
}