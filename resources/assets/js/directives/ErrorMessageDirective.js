
export let ErrorMessageDirective = {
    selector:'errorMessage',
    fn: ()=>{
        return {
            scope:{
                name: '@',
                message: '@',
                animation:'@'
            },
            template: '<div ng-message="{{ name }}" class="md-input-message-animation" style="opacity:1; margin-top: 0px;">{{ message }}</div>',
            link:(scope, element, attrs)=>{
                
            }
        }
    }
};