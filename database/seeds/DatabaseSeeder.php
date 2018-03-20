<?php

use Orpha\Support\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Deve retornar os ambientes que o Seeder deve ser executado
     * @return mixed
     */
    public function getEnvironments()
    {
        return ['local','testing','production'];
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(OrphaModuloSeeder::class);
        $this->call(CriancaModuloSeeder::class);
        $this->call(PiaModuloSeeder::class);
        $this->call(UserModuloSeeder::class);
    }
}
