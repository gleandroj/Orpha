<?php

namespace App\Providers;

use App\Crianca;
use App\Policies\CriancaPolicy;
use App\Policies\UserPolicy;
use App\User;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;
use Carbon\Carbon;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        User::class => UserPolicy::class,
        Crianca::class => CriancaPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::pruneRevokedTokens();

        Passport::tokensExpireIn(Carbon::now()->addDay(1));

        Passport::refreshTokensExpireIn(Carbon::now()->addDay(1));
    }
}
