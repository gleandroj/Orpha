<?php

use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = App\Role::create(['name' => 'Diretor', 'slug' => 'diretor', 'description' =>  'Representa o papel do diretor no sistema']);

        $role->permissions()->create(['name' => 'Listar Usuários', 'slug' => 'list-user', 'description' =>  'Permissão de listar usuários no sistema']);
        $role->permissions()->create(['name' => 'Visualizar Usuário', 'slug' => 'show-user', 'description' =>  'Permissão de visualizar usuários no sistema']);
        $role->permissions()->create(['name' => 'Cadastrar Usuário', 'slug' => 'create-user', 'description' =>  'Permissão de cadastrar usuários no sistema']);
        $role->permissions()->create(['name' => 'Alterar Usuário', 'slug' => 'edit-user', 'description' =>  'Permissão de alterar usuários no sistema']);
        $role->permissions()->create(['name' => 'Inativar Usuário', 'slug' => 'delete-user', 'description' =>  'Permissão de inativar usuários no sistema']);
        $role->permissions()->create(['name' => 'Ativar Usuário', 'slug' => 'active-user', 'description' =>  'Permissão de ativar usuários no sistema']);
    }
}
