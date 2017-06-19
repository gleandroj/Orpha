<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
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
