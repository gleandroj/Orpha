<?php

namespace App\Modulos\Pia;


use App\Modulos\Pia\Contracts\DadosNecessidadesRepositoryInterface;
use App\Modulos\Pia\Contracts\DadosNecessidadesServiceInterface;
use App\Modulos\Pia\Contracts\PiaServiceInterface;
use App\Modulos\Pia\Models\DadosNecessidades;
use App\Modulos\Pia\Models\Pia;
use App\Modulos\Pia\Policies\DadosNecessidadesPolicy;
use App\Modulos\Pia\Policies\PiaPolicy;
use App\Modulos\Pia\Repositories\DadosNecessidadesRepository;
use App\Modulos\Pia\Services\DadosNecessidadesService;
use App\Modulos\Pia\Services\PiaService;
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
        DadosNecessidades::class => DadosNecessidadesPolicy::class,
        Pia::class => PiaPolicy::class
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
        $this->app->bind(PiaServiceInterface::class, PiaService::class);
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
