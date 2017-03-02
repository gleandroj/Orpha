
AngularConfig.$inject = ['$qProvider', '$locationProvider'];

export default function AngularConfig($qProvider, $locationProvider){
     //Default = False for production Environment, for debug use TRUE, to Prevent show Transition error on redirect user
    $qProvider.errorOnUnhandledRejections(true);

    $locationProvider.html5Mode(true).hashPrefix('!');
}
