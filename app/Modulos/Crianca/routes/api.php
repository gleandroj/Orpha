<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:api']], function () {

    Route::resource('/criancas', 'Controllers\CriancaController', ['except' => ['create', 'edit']]);
    Route::get('/criancas/restore/{crianca}', 'Controllers\CriancaController@restore');

});