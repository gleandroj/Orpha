/**
 * Created by FG0003 on 27/12/2016.
 */

import { ErrorMessageDirective } from './directives/ErrorMessageDirective';
import { CheckEmailDirective } from './directives/CheckEmailDirective';

angular.module('orpha.directives')
    .directive(CheckEmailDirective.selector, CheckEmailDirective.fn)
    .directive(ErrorMessageDirective.selector, ErrorMessageDirective.fn);