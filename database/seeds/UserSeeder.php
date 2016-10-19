<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //factory(App\User::class, 5)->create();
        $adm = App\User::create(['name' => 'Admin', 'email' => 'admin@orpha.com.br', 'password' => Hash::make('123321'), 'phone' => '62994372288']);
        $adm->permissions()->create(['name' => 'Listar Usuários', 'slug' => 'list-user', 'description' =>  'Permissão de listar usuários no sistema']);
        $adm->permissions()->create(['name' => 'Visualizar Usuário', 'slug' => 'show-user', 'description' =>  'Permissão de visualizar usuários no sistema']);
        $adm->permissions()->create(['name' => 'Cadastrar Usuário', 'slug' => 'create-user', 'description' =>  'Permissão de cadastrar usuários no sistema']);
        $adm->permissions()->create(['name' => 'Alterar Usuário', 'slug' => 'edit-user', 'description' =>  'Permissão de alterar usuários no sistema']);
        $adm->permissions()->create(['name' => 'Inativar Usuário', 'slug' => 'delete-user', 'description' =>  'Permissão de inativar usuários no sistema']);
        $adm->permissions()->create(['name' => 'Ativar Usuário', 'slug' => 'active-user', 'description' =>  'Permissão de ativar usuários no sistema']);

        $adm->permissions()->create(['name' => 'Listar Criança / Adolescentes', 'slug' => 'list-crianca', 'description' =>  'Permissão de listar Criança / Adolescentes no sistema']);
        $adm->permissions()->create(['name' => 'Visualizar Criança / Adolescente', 'slug' => 'show-crianca', 'description' =>  'Permissão de visualizar Criança / Adolescentes no sistema']);
        $adm->permissions()->create(['name' => 'Cadastrar Criança / Adolescente', 'slug' => 'create-crianca', 'description' =>  'Permissão de cadastrar Criança / Adolescentes no sistema']);
        $adm->permissions()->create(['name' => 'Alterar Criança / Adolescente', 'slug' => 'edit-crianca', 'description' =>  'Permissão de alterar Criança / Adolescentes no sistema']);
        $adm->permissions()->create(['name' => 'Inativar Criança / Adolescente', 'slug' => 'delete-crianca', 'description' =>  'Permissão de inativar Criança / Adolescentes no sistema']);
        $adm->permissions()->create(['name' => 'Ativar Criança / Adolescente', 'slug' => 'active-crianca', 'description' =>  'Permissão de ativar Criança / Adolescentes no sistema']);
        //factory(App\Crianca::class, 10)->create();
    }
}
