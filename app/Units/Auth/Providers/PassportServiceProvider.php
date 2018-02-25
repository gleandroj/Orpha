<?php

namespace Orpha\Units\Auth\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Passport\RouteRegistrar;
use Laravel\Passport\Passport;
use Carbon\Carbon;

class PassportServiceProvider extends ServiceProvider
{
    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        Passport::tokensExpireIn(Carbon::now()->addDays(15));
        Passport::refreshTokensExpireIn(Carbon::now()->addDays(30));
        Passport::routes(function (RouteRegistrar $registrar) {
            $registrar->forAccessTokens();
        }, ['prefix' => env('API_PREFIX', 'api').'/oauth']);
    }

}