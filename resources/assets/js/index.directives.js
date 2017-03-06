/**
 * Created by FG0003 on 27/12/2016.
 */

import { ErrorMessageDirective } from './directives/ErrorMessageDirective';
import { CheckEmailDirective } from './directives/CheckEmailDirective';
import { NgAuth } from './directives/NgAuth';

angular.module('orpha.directives')
    .directive(CheckEmailDirective.selector, CheckEmailDirective.fn)
    .directive(ErrorMessageDirective.selector, ErrorMessageDirective.fn)
    .directive(NgAuth.selector, NgAuth.fn);