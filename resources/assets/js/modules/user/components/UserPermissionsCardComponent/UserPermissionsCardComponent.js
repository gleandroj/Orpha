/**
 * Created by FG0003 on 08/02/2017.
 */

import Template from './user-permissions.tpl.html';

class Controller {

    constructor(AuthService, DialogService, OrphaUtilService, $filter) {

        this.auth = AuthService;
        this.util = OrphaUtilService;
        this.dialog = DialogService;
        this.permissions = [];
        this.filter = $filter;
    }

    $onInit() {
        var self = this;
        this.model.$render = () => this.value = this.model.$viewValue || [];
        this.util.timeout(()=> this.initialize(), 1);
    }

    initialize(){
        this.auth.getPermissions().success((p) => this.permissions = p);
        this.isDisabled = this.isDisabled || false;
        this.isRequired = this.isRequired || false;
    }

    getUserPermissions(){
        return this.value;
    }

    $onChange(){
        this.validate();
    }

    onChange(){
        this.model.$setViewValue(this.value);
        this.validate();
    }

    validate(){
        this.model.$validate();
        /*this.form[this.name].$validate();*/
    }

    toggle ($panel) {
        if($panel.isOpen()){
            $panel.collapse();
        }else
            $panel.expand();
    }

    getPermissionBySlug (slug, array) {
        var itens = this.filter('filter')(array, {slug:slug});
        return itens[0] || null;
    }

    getPermissionByModule(module, array) {
        return this.filter('groupBy')(array, 'modulo')[module] || [];
    }

    isAllModuleSelected(module) {
        var isOk = true;
        var modulePermissions = this.getPermissionByModule(module, this.permissions);
        this.util.forEach(modulePermissions, (item) =>  isOk = (isOk && this.exists(item, this.getUserPermissions())));
        return isOk;
    }

    toggleAllPermissions(module) {
        var modulePermissions = this.getPermissionByModule(module, this.permissions);
        var userModulePermissions = this.getPermissionByModule(module, this.getUserPermissions());
        if(userModulePermissions.length === modulePermissions.length){
            this.util.forEach(modulePermissions, (item) =>  this.remove(item));
        }else{
            this.util.forEach(modulePermissions, (item) =>  this.add(item));
        }
        this.onChange();
    }

    togglePermission(item) {
        if(this.exists(item)){
            this.remove(item)
        }else {
            this.add(item);
        }
        this.onChange();
    }

    exists(item) {
        return this.getPermissionBySlug(item['slug'], this.getUserPermissions()) != null;
    }

    add(item) {
        var idx = this.getUserPermissions().indexOf(this.getPermissionBySlug(item['slug'], this.getUserPermissions()));
        if (!(idx > -1)){
            this.getUserPermissions().push(item);
        }
    }

    remove(item) {
        var idx = this.getUserPermissions().indexOf(this.getPermissionBySlug(item['slug'], this.getUserPermissions()));
        if (idx > -1) {
            this.getUserPermissions().splice(idx, 1);
        }
    }

    showDescription(description){
        this.dialog.showAlertDialog({
            title:"Descrição",
            message:description,
            okBtn:"Entendido"
        });
    }
}

Controller.$inject = ['AuthService', 'DialogService', 'OrphaUtilService', '$filter'];

export let UserPermissionsCardComponent = {
    selector: 'userPermissionsCard',
    require: {
        model: "ngModel"
    },
    bindings: {
        isDisabled: '<',
        isRequired: '<'
    },
    controller: Controller,
    controllerAs: '$component',
    template: Template
};