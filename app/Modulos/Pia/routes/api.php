<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('criancas/{crianca}/pia', 'Controllers\PiaController@show');

    Route::get('criancas/{crianca}/pia/dadosenecessidades', 'Controllers\DadosNecessidadesController@show');
    Route::put('criancas/{crianca}/pia/dadosenecessidades', 'Controllers\DadosNecessidadesController@update');

    Route::get('criancas/{crianca}/pia/atividadessocioeducativas', 'Controllers\AtividadesSocioeducativasController@show');
    Route::put('criancas/{crianca}/pia/atividadessocioeducativas', 'Controllers\AtividadesSocioeducativasController@update');
});

