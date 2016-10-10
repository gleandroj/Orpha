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

Route::get('/user', 'UserController@current')->middleware('auth:api');
Route::resource('/users', 'UserController', ['except' => ['create', 'edit']]);
Route::get('/users/restore/{user}', 'UserController@restore');
Route::post('/users/checkEmail', 'UserController@checkEmail');
Route::resource('/permissions', 'PermissionController', ['only' => ['index']]);

