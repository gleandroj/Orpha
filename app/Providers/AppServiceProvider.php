<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\RepositoryInterface;
use App\Contracts\UnitOfWorkInterface;
use App\Repositories\AbstractRepository;
use App\Repositories\UnitOfWork;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(UnitOfWorkInterface::class, UnitOfWork::class);
        $this->app->bind(RepositoryInterface::class, AbstractRepository::class);
    }
}
