<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:api']], function () {

    Route::get('/users/restore/{user}', 'Controllers\UserController@restore');
    Route::post('/users/checkEmail', 'Controllers\UserController@checkEmail');
    Route::resource('/users', 'Controllers\UserController', ['except' => ['create', 'edit']]);

});