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
        this.userService.getAll().success((users) => {
            this.loading = false;
            this.users = users;
        })
        .error((error) => this.showError(error));
    }

    showUser(user) {
        /*this.showDialog(user, 'Visualizar Usuário', true)
            .then((newUser)=> {
                this.util.extend(user, newUser);
                if (this.authService.getCurrentUser().id === newUser.id) {
                    this.authService.setCurrentUser(newUser);
                }
                this.toastService.showSuccess(this.messageService.get('MSG7'));
            }, () => {});*/
        if(this.authService.getCurrentUser().hasPermission('show-user')){
            this.state.go('user.show', {id: user.id});
        }
    }

    editUser(user) {
        /*this.showDialog(user, 'Alterar Usuário', false)
            .then((newUser)=> {
                this.util.extend(user, newUser);
                if (this.authService.getCurrentUser().id === newUser.id) {
                    this.authService.setCurrentUser(newUser);
                }
                this.toastService.showSuccess(this.messageService.get('MSG7'));
            }, () => {});*/
        if(this.authService.getCurrentUser().hasPermission('edit-user')){
            this.state.go('user.edit', {id: user.id});
        }
    }

    createUser() {
        /*this.showDialog({}, 'Inserir Usuário', false)
            .then((newUser)=> {
                console.log('teste');
                this.users.push(newUser);
                this.toastService.showSuccess(this.messageService.get('MSG5'));
            }, () => {});*/
        if(this.authService.getCurrentUser().hasPermission('create-user')){
            this.state.go('user.create');
        }
    }

    disableUser(user) {
        if(!this.authService.getCurrentUser().hasPermission('disable-user') || this.authService.getCurrentUser().id == user.id) return;
        this.userService.disable(user)
            .success((newUser)=> {
                this.util.extend(user, newUser);
                if (this.authService.getCurrentUser().id === newUser.id) {
                    this.authService.setCurrentUser(newUser);
                }
            })
            .error((error) => this.showError(error));
    }

    enableUser(user) {
        if(!this.authService.getCurrentUser().hasPermission('active-user')) return;
        this.userService.enable(user)
            .success((newUser)=> {
                this.util.extend(user, newUser);
                if (this.authService.getCurrentUser().id === newUser.id) {
                    this.authService.setCurrentUser(newUser);
                }
            })
            .error((error) => this.showError(error));
    }

    showError(error){
        this.loading = false;
        this.logService.error(error ? error.error  +": "+error['message'] : this.messageService.get('MSG4'));
        this.toastService.showError(error ? error['message'] : this.messageService.get('MSG4'));
    }

    checkSecondaryBtnDisabled(user){
        return this.authService.getCurrentUser().id == user.id;
    }

    /*
    showDialog(user, title, readOnly) {
        return this.dialogService.showCustomDialog({
            controller: UserDialogController,
            template: UserDialogTemplate,
            locals: {
                title: title,
                user: this.util.copy(user),
                readOnly: readOnly
            }
        });
    }
    */
}

ListController.$inject = ['$state','DialogService', 'OrphaUtilService', 'AuthService', 'UserService', 'ToastService', 'MessageService', 'LogService'];