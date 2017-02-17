/**
 * Created by FG0003 on 13/02/2017.
 */

export default class UserDialogController{

    constructor(DialogService, UserService, ToastService, MessageService){
        this.dialogService = DialogService;
        this.userSerice = UserService;
        this.toastService = ToastService;
        this.messageService = MessageService;
        this.loading = false;
    }

    close(){
        this.dialogService.cancelDialog({});
    }

    cancel(){
        if(this.user.id == '' || this.user.id == null){
            this.close();
        }else {
            this.readOnly = true;
        }
    }

    changeToEditMode(){
        this.readOnly = false;
    }

    submit(){
        this.loading = true;
        this.userSerice.save(this.user)
        .success((newUser) => {
            this.loading = false;
            this.dialogService.hideDialog(newUser);
        }).error((err)=>{
            this.loading = false;
            console.log(err);
            this.toastService.showError(err ? err['message'] : this.messageService.get('MSG4'));
        });
    }
}