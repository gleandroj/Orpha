<?php

use App\Modulos\Auth\Models\Permission;
use App\Modulos\Crianca\Models\Crianca;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

class CriancaModuloSeeder extends Seeder
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
        factory(Crianca::class, 10)
            ->create(['orfanato_id' => 1])
            ->each(function($c) {
                $c->pia()->create([]);
                $c->pia->dadosNecessidades()->create([]);
            });;
    }
    
    public function moduloPermissionSeed()
    {
        Permission::create(['name' => 'Listar Crianças / Adolescentes', 'modulo' => 'Crianças / Adolescentes'  ,'slug' => 'list-crianca', 'description' =>  'Permissão de listar Criança / Adolescente no sistema']);
        Permission::create(['name' => 'Visualizar Crianças / Adolescente', 'modulo' => 'Crianças / Adolescentes'  ,'slug' => 'show-crianca', 'description' =>  'Permissão de visualizar Criança / Adolescente no sistema']);
        Permission::create(['name' => 'Cadastrar Crianças / Adolescente', 'modulo' => 'Crianças / Adolescentes'  ,'slug' => 'create-crianca', 'description' =>  'Permissão de cadastrar Criança / Adolescente no sistema']);
        Permission::create(['name' => 'Alterar Crianças / Adolescente', 'modulo' => 'Crianças / Adolescentes'  ,'slug' => 'edit-crianca', 'description' =>  'Permissão de alterar Criança / Adolescente no sistema']);
        Permission::create(['name' => 'Inativar Crianças / Adolescente', 'modulo' => 'Crianças / Adolescentes'  ,'slug' => 'disable-crianca', 'description' =>  'Permissão de inativar Criança / Adolescente no sistema']);
        Permission::create(['name' => 'Ativar Crianças / Adolescente', 'modulo' => 'Crianças / Adolescentes'  ,'slug' => 'active-crianca', 'description' =>  'Permissão de ativar Criança / Adolescente no sistema']);
    }
}
