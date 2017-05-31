import LogoPath from './../../../../img/logo.png';

export default class LoginController {

    constructor(AuthService, ToastService, MessageService, LogService, $state) {
        this.logoPath = LogoPath;
        this.route = $state;
        this.auth = AuthService;
        this.toastService = ToastService;
        this.messageService = MessageService;
        this.logService = LogService;
        this.user = {
            email: '',
            password: ''
        };
        this.loading = false;
        this.authRoute = AuthService.OAuth.redirect_route;
    }

    tryLogin() {
        let self = this;
        self.loading = true;
        self.auth.login(self.user.email, self.user.password)
            .success((data) => {
                self.route.go(this.authRoute);
                self.loading = false;
            })
            .error((error) => this.showError(error));
    }

    showError(error){
        this.loading = false;
        let err = (error && error.detail) ? error.detail : error;
        this.logService.error(err && err.error ? err.error  +": "+err['message'] : this.messageService.get('MSG4'));
        this.toastService.showError(err && err.error ? err['message'] : this.messageService.get('MSG4'));
    }

}

LoginController.$inject = ['AuthService', 'ToastService', 'MessageService', 'LogService', '$state'];