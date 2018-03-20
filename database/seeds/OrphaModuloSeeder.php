<?php

use App\Modulos\Orpha\Models\Orfanato;
use Orpha\Support\Database\Seeder;
use Illuminate\Support\Facades\App;

class OrphaModuloSeeder extends Seeder
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

        Orfanato::create([
            'nome' => 'Inst. Cristão Evangélico de Goias',

            'endereco' => 'Av Bernado Sayão 300, Jd. Americas',
            'cidade' => 'Anápolis',
            'estado' => 'Goias',
            'cep' => '75070020',

            'cnpj' => '01.057.579/0001-91',
            'telefone' => '(62) 3318-1649',
            'email' => 'edivani.rhamparo@gmail.com',

            'responsavel' => 'Edivani Luiza',
            'responsavel_email' => 'edivani.rhamparo@gmail.com',
            'responsavel_telefone' => '(62) 98148-8807'
        ]);

        if(App::environment('local', 'testing')){
            $this->testDataSeed();
        }
    }

    public function testDataSeed()
    {
        factory(Orfanato::class, 5)->create();
    }

    public function moduloPermissionSeed()
    {
        /*Permission::create*/
    }
}
