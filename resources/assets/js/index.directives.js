/**
 * Created by FG0003 on 27/12/2016.
 */

import { CheckEmailDirective } from './directives/CheckEmailDirective';
import { NgAuth } from './directives/NgAuth';
import { ValidaCpfDirective } from './directives/ValidaCpfDirective';

angular.module('orpha.directives')
    .directive(CheckEmailDirective.selector, CheckEmailDirective.fn)
    .directive(NgAuth.selector, NgAuth.fn)
    .directive(ValidaCpfDirective.selector, ValidaCpfDirective.fn);