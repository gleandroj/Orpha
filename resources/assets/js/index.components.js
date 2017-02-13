/**
 * Created by FG0003 on 29/12/2016.
 */

import { TextInputComponent, NumberInputComponent, FileInputComponent, SearchInputComponent } from './components/orpha/input/TextInputComponent';
import { MdPaginationComponent } from './components/orpha/pagination/MdPaginationComponent';

angular.module('orpha.components')
    .component(TextInputComponent.selector, TextInputComponent)
    .component(NumberInputComponent.selector, NumberInputComponent)
    .component(FileInputComponent.selector, FileInputComponent)
    .component(SearchInputComponent.selector, SearchInputComponent)
    .component(MdPaginationComponent.selector, MdPaginationComponent);