<?php

namespace Orpha\Units\User\Providers;

use Orpha\Support\Units\ServiceProvider;
use Orpha\Units\User\Policies\UserPolicy;
use Orpha\Domains\User\Models\User;

class UnitServiceProvider extends ServiceProvider
{
    
    /**
     * @var array List of Unit Service Providers to Register
     */
    protected $providers = [
        RouteServiceProvider::class,
    ];

    /**
     * The policy mappings for the application.
     * @var array
     */
    protected $policies = [
        User::class => UserPolicy::class
    ];

    /**
     * The event handler mappings for the application.
     *
     * @var array
     */
    protected $listen = [];

    /**
     * The subscriber classes to register.
     *
     * @var array
     */
    protected $subscribe = [];

}