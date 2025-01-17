
export default class PasswordResetController {

    constructor(AuthService, ToastService, LogService, $state, Token) {
        this.route = $state;
        this.auth = AuthService;
        this.toast = ToastService;
        this.log = LogService;
        this.loading = false;
        this.credentials = {
            token: Token.token,
            email: Token.email,
            password: '',
            password_confirmation: ''
        };
    }

    submit() {
        let self = this;
        this.loading = true;
        this.auth.resetPassword(this.credentials)
            .success((response) => {
                self.auth.login(self.credentials.email, self.credentials.password)
                    .success(() => {
                        self.loading = false;
                        self.toast.showSuccess(response.status);
                        self.route.go(this.auth.OAuth.redirect_route);
                    })
                    .error((response) => {
                        self.loading = false;
                        self.log.error(response);
                        self.route.go('auth.login');
                    });
            })
            .error((error) => {
                self.toast.showError(response.email);
                self.loading = false;
            })
    }
}

PasswordResetController.$inject  = ['AuthService', 'ToastService', 'LogService', '$state', 'Token'];
