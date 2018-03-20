<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 08/02/2017
 * Time: 08:43
 */


use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:api']], function () {

    Route::get('/auth/current', 'Controllers\AuthController@current');
    Route::resource('/auth/permissions', 'Controllers\PermissionController', ['only' => ['index']]);

});

Route::post('auth/password/email', 'Controllers\ForgotPasswordController@sendResetLinkEmail');

Route::post('auth/password/token', 'Controllers\ResetPasswordController@checkResetToken');
Route::post('auth/password/reset', 'Controllers\ResetPasswordController@reset');