<?php

use App\Modulos\Auth\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

class PiaModuloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->moduloPermissionSeed();

        if(App::environment('local', 'testing')){
            $this->testDataSeed();
        }
    }

    public function testDataSeed()
    {

    }

    public function moduloPermissionSeed()
    {
        Permission::create(['name' => 'Acessar Menu PIA', 'modulo' => 'PIA'  ,'slug' => 'show-pia-menu', 'description' =>  'Permissão de acessar o menu PIA no sistema']);

        Permission::create(['name' => 'Visualizar Dados e Necessidades', 'modulo' => 'PIA'  ,'slug' => 'show-dados-necessidades', 'description' =>  'Permissão de visualizar os Dados e necessidades do PIA no sistema']);
        Permission::create(['name' => 'Cadastrar e Alterar Dados e Necessidades', 'modulo' => 'PIA'  ,'slug' => 'update-dados-necessidades', 'description' =>  'Permissão de cadastrar e Alterar os Dados e necessidades do PIA no sistema']);
    }
}
