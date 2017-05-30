import LogoPath from './../../../../img/logo.png';

export default class LoginController {

    constructor(AuthService, ToastService, MessageService, $state) {
        this.logoPath = LogoPath;
        this.route = $state;
        this.auth = AuthService;
        this.toast = ToastService;
        this.message = MessageService;
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
            .error((error) => {
                self.toast.showError(self.message.get('MSG14'));
                self.loading = false;
            });
    }

}

LoginController.$inject = ['AuthService', 'ToastService', 'MessageService', '$state'];