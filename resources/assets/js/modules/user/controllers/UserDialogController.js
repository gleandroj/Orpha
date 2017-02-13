/**
 * Created by FG0003 on 13/02/2017.
 */

export default class UserDialogController{

    constructor(DialogService){
        this.dialogService = DialogService;
        this.loading = false;
    }

    close(){
        this.dialogService.cancelDialog({});
    }

    changeToEditMode(){
        this.readOnly = false;
    }

}