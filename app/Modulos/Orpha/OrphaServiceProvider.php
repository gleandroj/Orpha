<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 07/03/2017
 * Time: 09:05
 */

namespace App\Modulos\Orpha;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class OrphaServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    public $policies = [];

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
        //$this->app->bind(OrphaRepositoryInterface::class, OrphaRepository::class);
    }

    /**
     * Register routes of the module
     */
    protected function mapModuleRoutes()
    {
        Route::group([
            'middleware' => 'api',
            'namespace' => 'App\Modulos\Orpha',
            'prefix' => 'api',
        ], function ($router) {
            require __DIR__.'/routes/api.php';
        });
    }
}
