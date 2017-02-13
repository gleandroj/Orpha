/**
 * Created by FG0003 on 09/02/2017.
 */
import FallbackImg from './../../../../img/ic_account_circle_black_48dp_2x.png';

export default class ListController{

    constructor(DialogService, OrphaUtilService, UserService, ToastService){
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