/**
 * Created by FG0003 on 27/12/2016.
 */

export default class MessageService{

    constructor($http, OrphaUtilService, LogService){
        'ngInject';
        this.http = $http;
        this.util = OrphaUtilService;
        this.log = LogService;
        this.dictionary = [];
        this.url = 'api/messages';
        this.resourceFileLoaded = false;
        this.initResources();
    }

    initResources(){

        this.http({ method:"GET", url:this.url, cache:false })
            .then(
                (response) => {
                    this.dictionary = response.data;
                    this.resourceFileLoaded = true;
                    this.util.broadcast('messageResourcesUpdated');
                },
                () => {
                    this.log.error("Error on load resource messages file");
                }
            );
    }

    getMessage(id, attributes){
        let result = '';

        if (this.dictionary !== null) {
            if(attributes == null || attributes == undefined){
                result = this.dictionary[id] || id;
            }
            else{
                result = this.dictionary[id] || id;
                this.util.forEach(attributes, (value, key) => {
                    result = result.replace(":"+key, value);
                });
            }
        }

        return result;
    }

}