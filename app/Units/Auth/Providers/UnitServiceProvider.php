<?php

namespace Orpha\Units\Auth\Providers;

use Orpha\Support\Units\ServiceProvider;

class UnitServiceProvider extends ServiceProvider
{
    
    /**
     * @var array List of Unit Service Providers to Register
     */
    protected $providers = [
        RouteServiceProvider::class,
        PassportServiceProvider::class
    ];

    /**
     * The policy mappings for the application.
     * @var array
     */
    protected $policies = [];

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