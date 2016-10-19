/**
 * Created by FG0003 on 18/10/2016.
 */

angular.module('orpha.directives')

    .directive("messageBind", function($q, $timeout, MessagesService) {
        return {
            restrict: "EA",
            tranclude:true,
            template:'{{message}}',
            scope:{
                messageId:'@',
                attributeName:'@',
                message:'@'
            },
            link: function(scope, element, attributes) {
                $timeout(function () {
                    scope.$apply(function () {
                        scope.message = MessagesService.getMessage(scope.messageId);
                    });
                },0);
            }
        };
    })
    .directive("customError", function($q, $timeout) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope, element, attributes, ngModel) {
                if(attributes.setTouched == "true"){
                    $timeout(function () {
                        scope.$apply(function () {
                            ngModel.$setTouched();
                        });
                    }, 0);
                }

                var reset = function () {
                    if(ngModel.customError != null){
                        ngModel.customError = null;
                        ngModel.$validate();
                    }
                };

                ngModel.$validators.customError = function(modelValue) {
                    return ngModel.customError == null;
                };
                element.bind('focus', function () {
                    reset();
                });

            }
        };
    })
    .directive("checkEmail", function($q, $http, $timeout) {
        return {
            restrict: "A",
            priority:100,
            require: "ngModel",
            scope:{
                checkEmail: "=checkEmail"
            },
            link: function(scope, element, attributes, ngModel) {
                var allowValidate = false;
                element.on('blur', function () {
                    allowValidate = true;
                    ngModel.$validate();
                    allowValidate = false;
                });

                if(scope.checkEmail){
                    ngModel.checkEmailError = 'check-email-error';
                    ngModel.$asyncValidators.checkEmail = function(modelValue) {
                        var defer = $q.defer();
                        if(modelValue != null && allowValidate){
                            $http.post('/api/users/checkEmail', {email:modelValue})
                                .success(function (data) {
                                    defer.resolve();
                                })
                                .error(function (error) {
                                    ngModel.checkEmailError = error['email'][0];
                                    defer.reject();
                                });
                        }else{
                            defer.resolve();
                        }
                        return defer.promise;
                    };
                }
            }
        };
    })
    .directive("checkMatch", function($q, $http) {
        return {
            restrict: "A",
            require: "ngModel",
            scope:{
                checkMatch:'='
            },
            link: function(scope, element, attributes, ngModel) {

                scope.$watch('checkMatch', function () {
                    ngModel.$validate();
                });

                ngModel.$validators.checkMatch = function(modelValue) {
                    if((modelValue == null && scope.checkMatch == null ) || (modelValue == "" && scope.checkMatch == "")){
                        return true;
                    }
                    else
                        return modelValue === scope.checkMatch;
                }
            }
        };
    })
    .directive("onImage", function() {
        return {
            restrict: "A",
            scope:{
                onImageError:'&',
                onImageLoaded:'&'
            },
            link: function postLink(scope, iElement, iAttrs) {

                iElement.bind('load', function() {
                    scope.$apply(scope.onImageLoaded());
                });

                iElement.bind('error', function() {
                    scope.$apply(scope.onImageError());
                });
            }
        };
    })
    .directive("checkImage", function($q, $timeout) {
        return {
            restrict: "A",
            require: "ngModel",
            scope:{
                model: '=ngModel'
            },
            link: function (scope, iElement, iAttrs, ngModel) {
                var b64regex = new RegExp(/^(data:image\/(jpeg|png|jpg|gif|bmp);base64)/);
                var urlRegex = new RegExp(/(http(s?):)|([\/|.|\w|\s])*\.(?:jpg|gif|png)/);

                ngModel.$validators.checkImage = function (modelValue) {
                    return b64regex.test(modelValue) || urlRegex.test(modelValue) || modelValue == null || modelValue == "";
                };

                scope.$watch(function () {
                    return ngModel.$modelValue;
                }, function(newValue) {
                    if(ngModel.$invalid){
                        $timeout(function () {
                            scope.model = "";
                            scope.$apply();
                        }, 1500);
                    }
                });

                var readFile = function(file) {
                    var deferred = $q.defer();

                    var reader = new FileReader();
                    reader.onload = function(e) {
                        deferred.resolve(e.target.result);
                    };
                    reader.onerror = function(e) {
                        deferred.reject(e);
                    };

                    reader.readAsDataURL(file);
                    return deferred.promise;
                };

                iElement.on('change', function(e) {
                    readFile(e.target.files[0]).then(function (data) {

                        $timeout(function () {
                            scope.model = data;
                            scope.$apply();
                        }, 0);

                    });
                });
            }
        };
    })

    /*  Filters  */

    .filter('dateFormat', function() {
        return function(dateString) {
            return moment(dateString).format('DD/MM/YYYY');
        };
    })
    .filter('strToDate', function() {
        return function(dateString) {
            var m = moment(dateString, 'YYYY-MM-DD HH:mm:ss', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };
    })
    .filter('messageBind', function(MessagesService, $interpolate) {
        return function(msgId, attribute) {
            var msgService = MessagesService.getMessage(msgId);

            if(attribute){
                var scope = { attributeName:attribute };
                msgService = $interpolate(msgService)(scope);
            }

            return msgService;
        };
    });