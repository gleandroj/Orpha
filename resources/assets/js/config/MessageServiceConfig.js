
MessageServiceConfig.$inject = ['$urlRouterProvider'];

export default function MessageServiceConfig($urlRouterProvider) {

    $urlRouterProvider.deferIntercept();
}
