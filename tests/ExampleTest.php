<?php

use App\Contracts\CriancaRepository;
use App\Contracts\CriancaService;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ExampleTest extends TestCase
{
    use DatabaseMigrations;

    /**
     *
     */
    public function testBasicExample()
    {
        factory(\App\Crianca::class, 10)->create([]);
    }
}
