<?php

use Illuminate\Database\Seeder;

class CriancaTestSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Crianca::class, 10)->create(['orfanato_id' => '1']);
    }
}
