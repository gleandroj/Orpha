<?php

use App\Modulos\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class OrphaDbSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        //factory(User::class, 5)->create(['orfanato_id' => 1]);

        $orfanato = App\Orfanato::create(['nome' => 'Teste Orfanato']);
        $adm = $orfanato->users()->create(['name' => 'Admin', 'email' => 'admin@orpha.com.br', 'password' => Hash::make('123321123'), 'phone' => '62994372288']);

        $adm->permissions()->create(['name' => 'Listar Usuários', 'modulo' => 'Usuários'  ,'slug' => 'list-user', 'description' =>  'Permissão de listar usuários no sistema']);
        $adm->permissions()->create(['name' => 'Visualizar Usuário', 'modulo' => 'Usuários'  ,'slug' => 'show-user', 'description' =>  'Permissão de visualizar usuários no sistema']);
        $adm->permissions()->create(['name' => 'Cadastrar Usuário', 'modulo' => 'Usuários'  ,'slug' => 'create-user', 'description' =>  'Permissão de cadastrar usuários no sistema']);
        $adm->permissions()->create(['name' => 'Alterar Usuário', 'modulo' => 'Usuários'  ,'slug' => 'edit-user', 'description' =>  'Permissão de alterar usuários no sistema']);
        $adm->permissions()->create(['name' => 'Inativar Usuário', 'modulo' => 'Usuários'  ,'slug' => 'disable-user', 'description' =>  'Permissão de inativar usuários no sistema']);
        $adm->permissions()->create(['name' => 'Ativar Usuário', 'modulo' => 'Usuários'  ,'slug' => 'active-user', 'description' =>  'Permissão de ativar usuários no sistema']);

        $adm->permissions()->create(['name' => 'Listar Crianças / Adolescentes', 'modulo' => 'Crianças / Adolescentes'  ,'slug' => 'list-crianca', 'description' =>  'Permissão de listar Criança / Adolescente no sistema']);
        $adm->permissions()->create(['name' => 'Visualizar Crianças / Adolescente', 'modulo' => 'Crianças / Adolescentes'  ,'slug' => 'show-crianca', 'description' =>  'Permissão de visualizar Criança / Adolescente no sistema']);
        $adm->permissions()->create(['name' => 'Cadastrar Crianças / Adolescente', 'modulo' => 'Crianças / Adolescentes'  ,'slug' => 'create-crianca', 'description' =>  'Permissão de cadastrar Criança / Adolescente no sistema']);
        $adm->permissions()->create(['name' => 'Alterar Crianças / Adolescente', 'modulo' => 'Crianças / Adolescentes'  ,'slug' => 'edit-crianca', 'description' =>  'Permissão de alterar Criança / Adolescente no sistema']);
        $adm->permissions()->create(['name' => 'Inativar Crianças / Adolescente', 'modulo' => 'Crianças / Adolescentes'  ,'slug' => 'disable-crianca', 'description' =>  'Permissão de inativar Criança / Adolescente no sistema']);
        $adm->permissions()->create(['name' => 'Ativar Crianças / Adolescente', 'modulo' => 'Crianças / Adolescentes'  ,'slug' => 'active-crianca', 'description' =>  'Permissão de ativar Criança / Adolescente no sistema']);

        //factory(App\Crianca::class, 10)->create(['orfanato_id' => $orfanato->id]);
        Model::reguard();
    }
}
