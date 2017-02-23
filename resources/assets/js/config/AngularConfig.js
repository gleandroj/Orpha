
export default function AngularConfig($qProvider){
    'ngInject';

     //Default = False for production Environment, for debug use TRUE, to Prevent show Transition error on redirect user
    $qProvider.errorOnUnhandledRejections(true);
}

AngularConfig.$inject = ['$qProvider'];