/**
 * Created by FG0003 on 28/12/2016.
 */

export default class ToastService{

    constructor($mdToast){
        this.toast = $mdToast;
        this.time = 40000;
    }

    _show(options){
        return this.toast.show(options);
    }

    _defaultToast(time){
        let toast = this.toast.simple()
            .highlightAction(true)
            .highlightClass('md-accent')
            .position('top right')
            .hideDelay(time || this.time);
        return toast;
    }


    show(text, time){
        this._show(this._defaultToast(time)
            .textContent(text));
    }

    showWithAction(text, actionText, actionCallback, time){
        let toast = this._defaultToast(time)
             .textContent(text)
             .action(actionText);

        this._show(toast).then(function(response) {
            if ( response == 'ok' ) {
                actionCallback();
            }
        });
    }

    showSuccess(text, time){
        this._show(this._defaultToast(time)
            .textContent(text)
            .toastClass('success'));
    }

    showError(text, time){
        this._show(this._defaultToast(time)
            .textContent(text)
            .toastClass('error'));
    }

}