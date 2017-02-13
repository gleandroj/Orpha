/**
 * Created by FG0003 on 09/02/2017.
 */
import FallbackImg from './../../../../img/ic_account_circle_black_48dp_2x.png';
import UserDialogController from './UserDialogController';
import UserDialogTemplate from './../pages/dialog.tpl.html';

export default class ListController{

    constructor(DialogService, OrphaUtilService, UserService, ToastService){
        this.util = OrphaUtilService;
        this.dialogService = DialogService;
        this.userService = UserService;
        this.toastService = ToastService;
        this.fallbackImg = FallbackImg;
        this.users = [];
        this.search = '';
        this.loading = true;
        this.hideDisabledUsers = true;
        this.enabledUsersCurrentPage = this.disabledUsersCurrentPage = 1;
        this.enabledUsersItemsPerPage = this.disabledUsersItemsPerPage = 5;
        this.getAll();
    }

    showUser(user){
        this.showDialog(user, 'Visualizar Usuário', true);
    }

    editUser(user){
        this.showDialog(user, 'Alterar Usuário', false);
    }

    removeUser(user){

    }

    showDialog(user, title, readOnly){
        this.dialogService.showCustomDialog({
            controller:UserDialogController,
            clickOutsideToClose:true,
            fullscreen:true,
            templateUrl: UserDialogTemplate,
            locals:{
                title: title,
                user:this.util.copy(user),
                readOnly:readOnly
            }
        });
    }

    getAll(){
        this.loading = true;
        this.userService.getAll().success((users) => {
            this.loading = false;
            this.users = users;
        })
        .error((error) => {
            this.loading = false;
            this.toastService.showError(error['message']);
        });
    }
}