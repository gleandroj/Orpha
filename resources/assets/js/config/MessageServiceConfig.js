
export default function MessageServiceConfig($urlRouterProvider) {
    'ngInject'
    $urlRouterProvider.deferIntercept();
}

MessageServiceConfig.$inject = ['$urlRouterProvider'];