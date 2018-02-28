/**
 * Created by FG0003 on 27/12/2016.
 */

export default class LogService{

    constructor($log){

        this.log = $log;
    }

    error(error){
        return this.log.error(error);
    }

    info(log){
        return this.log.info(log);
    }

}

LogService.$inject = ['$log'];