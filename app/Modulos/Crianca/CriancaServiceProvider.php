<?php

namespace App\Modulos\Crianca;

use App\Modulos\Crianca\Contracts\CriancaRepositoryInterface;
use App\Modulos\Crianca\Contracts\CriancaServiceInterface;
use App\Modulos\Crianca\Models\Crianca;
use App\Modulos\Crianca\Policies\CriancaPolicy;
use App\Modulos\Crianca\Repositories\CriancaRepository;
use App\Modulos\Crianca\Services\CriancaService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class CriancaServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    public $policies = [
        Crianca::class => CriancaPolicy::class
    ];

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->mapModuleRoutes();
        Route::bind('crianca', function ($id){
            return Crianca::withTrashed()->find($id);
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(CriancaRepositoryInterface::class, CriancaRepository::class);
        $this->app->bind(CriancaServiceInterface::class, CriancaService::class);
    }

    /**
     * Register routes of the module
     */
    protected function mapModuleRoutes()
    {
        Route::group([
            'middleware' => 'api',
            'namespace' => 'App\Modulos\Crianca',
            'prefix' => 'api',
        ], function ($router) {
            require __DIR__.'/routes/api.php';//app_path('modulos/crianca/routes/api.php');
        });
    }
}
