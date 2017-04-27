<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\RepositoryInterface;
use App\Contracts\UnitOfWorkInterface;
use App\Repositories\AbstractRepository;
use App\Repositories\UnitOfWork;
use Faker\Generator as FakerGenerator;
use Faker\Factory as FakerFactory;


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
        $this->app->singleton(FakerGenerator::class, function () {
            return FakerFactory::create('pt_BR');
        });
        $this->app->bind(UnitOfWorkInterface::class, UnitOfWork::class);
        $this->app->bind(RepositoryInterface::class, AbstractRepository::class);
    }
}
