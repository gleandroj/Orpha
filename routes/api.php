<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/user', 'UserController@current');
    Route::get('/users/restore/{user}', 'UserController@restore');
    Route::post('/users/checkEmail', 'UserController@checkEmail');
    Route::resource('/users', 'UserController', ['except' => ['create', 'edit']]);
    Route::resource('/permissions', 'PermissionController', ['only' => ['index']]);

    Route::get('/criancas/restore/{crianca}', 'CriancaController@restore');
    Route::resource('/criancas', 'CriancaController', ['except' => ['create', 'edit']]);
});


Route::post('/password/email', 'Auth\ResetPasswordController@sendResetEmail');