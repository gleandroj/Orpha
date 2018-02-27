<?php

namespace Orpha\Units\Crianca\Providers;

use Orpha\Support\Units\ServiceProvider;
use Orpha\Units\Crianca\Policies\CriancaPolicy;
use Orpha\Domains\Crianca\Models\Crianca;

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
        Crianca::class => CriancaPolicy::class
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