<?php

namespace App\Modulos\Pia;


use App\Modulos\Pia\Contracts\DadosNecessidadesRepositoryInterface;
use App\Modulos\Pia\Contracts\DadosNecessidadesServiceInterface;
use App\Modulos\Pia\Repositories\DadosNecessidadesRepository;
use App\Modulos\Pia\Services\DadosNecessidadesService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class PiaServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    public $policies = [

    ];

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->mapModuleRoutes();
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(DadosNecessidadesRepositoryInterface::class, DadosNecessidadesRepository::class);
        $this->app->bind(DadosNecessidadesServiceInterface::class, DadosNecessidadesService::class);
    }

    /**
     * Register routes of the module
     */
    protected function mapModuleRoutes()
    {
        Route::group([
            'middleware' => 'api',
            'namespace' => 'App\Modulos\Pia',
            'prefix' => 'api',
        ], function ($router) {
            require __DIR__.'/routes/api.php';
        });
    }
}
