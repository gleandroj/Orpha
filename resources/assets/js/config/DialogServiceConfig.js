
DialogServiceConfig.$inject = ['DialogServiceProvider'];

export default function DialogServiceConfig(DialogServiceProvider) {

    //Note: Show Multiple Dialogs allow only 2 dialogs showing, the third will be hidden
    DialogServiceProvider.showMultipleDialogs(false);
}
