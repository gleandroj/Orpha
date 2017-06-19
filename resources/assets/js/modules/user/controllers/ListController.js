/**
 * Created by FG0003 on 09/02/2017.
 */
import FallbackImg from './../../../../img/ic_account_circle_black_48dp_2x.png';
import UserDialogController from './UserDialogController';
import UserDialogTemplate from './../pages/dialog.tpl.html';

export default class ListController {

    constructor($state, DialogService, OrphaUtilService, AuthService, UserService, ToastService, MessageService, LogService) {
        this.state = $state;
        this.authService = AuthService;
        this.util = OrphaUtilService;
        this.dialogService = DialogService;
        this.userService = UserService;
        this.toastService = ToastService;
        this.messageService = MessageService;
        this.logService = LogService;
        this.fallbackImg = FallbackImg;
        this.users = [];
        this.search = '';
        this.loading = true;
        this.hideDisabledUsers = true;
        this.enabledUsersCurrentPage = this.disabledUsersCurrentPage = 1;
        this.enabledUsersItemsPerPage = this.disabledUsersItemsPerPage = 5;
        this.getAll();
    }

    getAll() {
        this.loading = true;
        this.users = [];
        this.userService.getAll().success((users) => {
            this.loading = false;
            this.users = users;
        })
        .error((error) => this.showError(error));
    }

    showUser(user) {
        if(this.authService.getCurrentUser().hasPermission('show-user')){
            this.loading = true;
            this.state.go('user.show', {id: user.id}).then(()=>{}, (error) => this.showError(error));
        }
    }

    editUser(user) {
        if(this.authService.getCurrentUser().hasPermission('edit-user')){
            this.loading = true;
            this.state.go('user.edit', {id: user.id}).then(()=>{}, (error) => this.showError(error));
        }
    }

    createUser() {
        if(this.authService.getCurrentUser().hasPermission('create-user')){
            this.loading = true;
            this.state.go('user.create').then(()=>{}, (error) => this.showError(error));
        }
    }

    disableUser(user) {
        if(!this.authService.getCurrentUser().hasPermission('disable-user') || this.authService.getCurrentUser().id === user.id) return;
        this.loading = true;
        this.userService.disable(user)
            .success((newUser)=> {
                this.util.extend(user, newUser);
                if (this.authService.getCurrentUser().id === newUser.id) {
                    this.authService.setCurrentUser(newUser);
                }
                this.loading = false;
            })
            .error((error) => this.showError(error));
    }

    enableUser(user) {
        if(!this.authService.getCurrentUser().hasPermission('active-user')) return;
        this.loading = true;
        this.userService.enable(user)
            .success((newUser)=> {
                this.util.extend(user, newUser);
                if (this.authService.getCurrentUser().id === newUser.id) {
                    this.authService.setCurrentUser(newUser);
                }
                this.loading = false;
            })
            .error((error) => this.showError(error));
    }

    showError(error){
        this.loading = false;
        let err = (error && error.detail) ? error.detail : error;
        this.logService.error(err && err.error ? err.error  +": "+err['message'] : this.messageService.get('MSG4'));
        this.toastService.showError(err && err.error ? err['message'] : this.messageService.get('MSG4'));
    }

    checkSecondaryBtnDisabled(user){
        return this.authService.getCurrentUser().id === user.id;
    }
}

ListController.$inject = ['$state','DialogService', 'OrphaUtilService', 'AuthService', 'UserService', 'ToastService', 'MessageService', 'LogService'];