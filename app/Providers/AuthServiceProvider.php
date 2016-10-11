<?php

namespace App\Providers;

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

        Passport::tokensExpireIn(Carbon::now()->addMinutes(10));

        Passport::refreshTokensExpireIn(Carbon::now()->addMinutes(10));
    }
}
