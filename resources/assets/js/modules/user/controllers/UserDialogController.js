/**
 * Created by FG0003 on 13/02/2017.
 */

export default class UserDialogController{

    constructor(DialogService, UserService){
        this.dialogService = DialogService;
        this.userSerice = UserService;
        this.loading = false;
    }

    close(){
        this.dialogService.cancelDialog({});
    }

    changeToEditMode(){
        this.readOnly = false;
    }

    submit(){
        this.userSerice.save(this.user)
        .success((newUser) => {
            this.dialogService.hideDialog(newUser);
        }).error((err)=>{
            console.log(err);
        });
    }
}