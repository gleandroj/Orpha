<?php

namespace App\Modulos;

use App\Modulos\Auth\AuthServiceProvider;
use App\Modulos\Crianca\CriancaServiceProvider;
use App\Modulos\User\UserServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class ModulosServiceProvider extends ServiceProvider
{
    protected $providers = [
        UserServiceProvider::class,
        CriancaServiceProvider::class,
        AuthServiceProvider::class
    ];

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        foreach ($this->providers as $provider) {
            $this->registerPolicies($this->app->register($provider));
        }
    }

    /**
     * Register the application's policies.
     *
     * @return void
     */
    public function registerPolicies($provider)
    {
        foreach ($provider->policies as $key => $value) {
            Gate::policy($key, $value);
        }
    }
}
