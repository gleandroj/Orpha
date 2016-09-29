<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(\App\Contracts\Repository::class, \App\Repositories\AbstractRepository::class);
        $this->app->bind(\App\Contracts\UserRepository::class, \App\Repositories\UserRepository::class);
        $this->app->bind(\App\Contracts\UserService::class, \App\Services\UserService::class);
    }
}
