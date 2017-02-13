/**
 * Created by FG0003 on 27/12/2016.
 */

export default class StorageService{

    constructor(OrphaUtilService){
        'ngInject';
        this.util = OrphaUtilService;
    }

    hasKey(key) {
        let isOk = false;
        for(let i = 0 ; i < localStorage.length ; i++)
        {
            isOk = isOk || localStorage.key(i) == key;
        }
        return isOk;
    }

    get(key) {
        return this.util.fromJson(localStorage.getItem(key));
    }

    set(key, value) {
        localStorage.setItem(key, this.util.toJson(value));
    }

    all() {
        let self = this;
        let all = [];
        this.util.forEach(localStorage, (value, key) => {
            all[key] = self.get(key);
        });
        return all;
    }

    clear() {
        localStorage.clear();
    }

    remove(key) {
        localStorage.removeItem(key);
    }
}