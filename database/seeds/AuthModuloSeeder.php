<?php

use Orpha\Support\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AuthModuloSeeder extends Seeder
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
        $this->moduloPermissionSeed();

        if(App::environment('local', 'testing', 'production')){
            $this->testDataSeed();
        }
    }

    public function testDataSeed()
    {
        DB::table('oauth_clients')->insert([
            'id' => 1,
            'name' => 'Test Client',
            'secret' => 'iG7mXf3ZDiiOss4pmJA5zPb19kotpHyfLjyd2Xiz',
            'personal_access_client' => false,
            'password_client' => true,
            'revoked' => false,
            'redirect' => 'http://localhost'
        ]);

    }

    public function moduloPermissionSeed()
    {
        
    }
}
