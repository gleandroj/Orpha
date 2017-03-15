/**
 * Created by FG0003 on 29/12/2016.
 */

import { TextInputComponent } from './components/TextInputComponent/TextInputComponent';
import { NumberInputComponent } from './components/NumberInputComponent/NumberInputComponent';
import { FileInputComponent } from './components/FileInputComponent/FileInputComponent';
import { SearchInputComponent } from './components/SearchInputComponent/SearchInputComponent';
import { PaginationComponent } from './components/PaginationComponent/PaginationComponent';
import { DateInputComponent } from './components/DateInputComponent/DateInputComponent';

angular.module('orpha.components')
    .component(TextInputComponent.selector, TextInputComponent)
    .component(NumberInputComponent.selector, NumberInputComponent)
    .component(FileInputComponent.selector, FileInputComponent)
    .component(SearchInputComponent.selector, SearchInputComponent)
    .component(PaginationComponent.selector, PaginationComponent)
    .component(DateInputComponent.selector, DateInputComponent);