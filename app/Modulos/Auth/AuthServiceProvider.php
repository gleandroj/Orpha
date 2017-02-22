<?php

namespace App\Modulos\Auth;

use App\Modulos\Auth\Contracts\PasswordRepositoryInterface;
use App\Modulos\Auth\Repositories\PasswordRepository;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
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
        $this->app->bind(PasswordRepositoryInterface::class, PasswordRepository::class);
    }

    /**
     * Register routes of the module
     */
    protected function mapModuleRoutes()
    {
        Route::group([
            'middleware' => 'api',
            'namespace' => 'App\Modulos\Auth',
            'prefix' => 'api',
        ], function ($router) {
            require base_path('/app/modulos/auth/routes/api.php');
        });
    }
}
