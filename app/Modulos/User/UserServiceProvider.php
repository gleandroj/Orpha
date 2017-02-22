<?php

namespace App\Modulos\User;

use App\Modulos\User\Contracts\UserRepositoryInterface;
use App\Modulos\User\Contracts\UserServiceInterface;
use App\Modulos\User\Models\User;
use App\Modulos\User\Policies\UserPolicy;
use App\Modulos\User\Repositories\UserRepository;
use App\Modulos\User\Services\UserService;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class UserServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    public $policies = [
        User::class => UserPolicy::class
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
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(UserServiceInterface::class, UserService::class);
    }

    /**
     * Register routes of the module
     */
    protected function mapModuleRoutes()
    {
        Route::group([
            'middleware' => 'api',
            'namespace' => 'App\Modulos\User',
            'prefix' => 'api',
        ], function ($router) {
            require __DIR__.'/routes/api.php';//app_path('modulos/user/routes/api.php');
        });
    }
}
