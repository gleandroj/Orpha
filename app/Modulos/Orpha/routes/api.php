<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('orpha/dashboard', 'Controllers\DashboardController@getData');
});