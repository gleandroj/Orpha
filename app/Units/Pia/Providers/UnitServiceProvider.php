<?php

namespace Orpha\Units\Pia\Providers;

use Orpha\Support\Units\ServiceProvider;
use Orpha\Units\Pia\Policies\PiaPolicy;
use Orpha\Domains\Pia\Models\Pia;
use Orpha\Units\Pia\Policies\DadosNecessidadesPolicy;
use Orpha\Domains\Pia\Models\DadosNecessidades;
use Orpha\Units\Pia\Policies\AtividadesSocioeducativasPolicy;
use Orpha\Domains\Pia\Models\AtividadesSocioeducativas;
use Orpha\Units\Pia\Policies\InformacoesFamiliaPolicy;
use Orpha\Domains\Pia\Models\InformacoesFamilia;

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
        DadosNecessidades::class => DadosNecessidadesPolicy::class,
        AtividadesSocioeducativas::class => AtividadesSocioeducativasPolicy::class,
        InformacoesFamilia::class => InformacoesFamiliaPolicy::class,
        Pia::class => PiaPolicy::class
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