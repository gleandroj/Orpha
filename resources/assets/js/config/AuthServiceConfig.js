import { OAuthInterceptor } from './../services/AuthService';

AuthServiceConfig.$inject = ['AuthServiceProvider', '$httpProvider'];

export default function AuthServiceConfig(AuthServiceProvider, $httpProvider) {

    AuthServiceProvider.setSessionTTL(1000 * 60 * 10);

    AuthServiceProvider.setOAuthConfig({
        "client_id": "1",
        "client_secret": "iG7mXf3ZDiiOss4pmJA5zPb19kotpHyfLjyd2Xiz",
        "grant_type": "password",

        "api_oauth_url": "oauth/token",
        "api_permissions_url": "api/auth/permissions",
        "api_user_url": "api/auth/current",

        "redirect_route": "user.profile",
        "login_route": "auth.login"
    });

    $httpProvider.interceptors.push(OAuthInterceptor);
}
