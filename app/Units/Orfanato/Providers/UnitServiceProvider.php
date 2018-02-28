<?php

namespace Orpha\Units\Orfanato\Providers;

use Orpha\Support\Units\ServiceProvider;
#use Orpha\Units\Orfanato\Policies\OrfanatoPolicy;
use Orpha\Domains\Orfanato\Models\Orfanato;

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
        #Orfanato::class => OrfanatoPolicy::class
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