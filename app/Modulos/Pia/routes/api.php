<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => []], function () {/*'auth:api'*/

    //Route::resource('/pia', 'Controllers\CriancaController', ['except' => ['create', 'edit']]);
    Route::get('criancas/{crianca}/pia', 'Controllers\PiaController@pia');

    Route::get('criancas/{crianca}/pia/dadosenecessidades', 'Controllers\DadosNecessidadesController@dadosNecessidades');
    Route::put('criancas/{crianca}/pia/dadosenecessidades', 'Controllers\DadosNecessidadesController@update');

});