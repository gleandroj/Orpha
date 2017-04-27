<?php

use App\Modulos\Auth\Models\Permission;
use App\Modulos\User\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;

class UserModuloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->moduloPermissionSeed();

        $adm = User::create(['name' => 'Admin', 'email' => 'admin@orpha.com.br', 'password' => Hash::make('123321123'), 'phone' => '62994372288', 'orfanato_id' => 1]);
        $adm->permissions()->syncWithoutDetaching(Permission::all(['id'])->pluck('id'));

        if(App::environment('local', 'testing')){
            $this->testDataSeed();
        }
    }

    public function testDataSeed()
    {
        factory(User::class, 5)->create(['orfanato_id' => 1]);
    }

    public function moduloPermissionSeed()
    {
        Permission::create(['name' => 'Listar Usuários', 'modulo' => 'Usuários'  ,'slug' => 'list-user', 'description' =>  'Permissão de listar usuários no sistema']);
        Permission::create(['name' => 'Visualizar Usuário', 'modulo' => 'Usuários'  ,'slug' => 'show-user', 'description' =>  'Permissão de visualizar usuários no sistema']);
        Permission::create(['name' => 'Cadastrar Usuário', 'modulo' => 'Usuários'  ,'slug' => 'create-user', 'description' =>  'Permissão de cadastrar usuários no sistema']);
        Permission::create(['name' => 'Alterar Usuário', 'modulo' => 'Usuários'  ,'slug' => 'edit-user', 'description' =>  'Permissão de alterar usuários no sistema']);
        Permission::create(['name' => 'Inativar Usuário', 'modulo' => 'Usuários'  ,'slug' => 'disable-user', 'description' =>  'Permissão de inativar usuários no sistema']);
        Permission::create(['name' => 'Ativar Usuário', 'modulo' => 'Usuários'  ,'slug' => 'active-user', 'description' =>  'Permissão de ativar usuários no sistema']);
    }
}
