<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

use App\Modulos\Auth\Models\Permission;
use App\Modulos\Crianca\Models\Crianca;
use App\Modulos\Orpha\Models\Orfanato;
use App\Modulos\User\Models\User;

$faker = Faker\Factory::create('pt_BR');

$factory->define(Orfanato::class, function () use ($faker) {
    return [
        'nome' => $faker->unique()->name,

        'endereco' => $faker->address,
        'cidade' => $faker->city,
        'estado' => $faker->state,
        'cep' => $faker->postcode,

        'cnpj' => $faker->unique()->cnpj,
        'telefone' => $faker->phoneNumber,
        'email' => $faker->unique()->companyEmail,

        'responsavel' => $faker->name,
        'responsavel_email' => $faker->email,
        'responsavel_telefone' => $faker->phoneNumber
    ];
});

$factory->define(User::class, function () use ($faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'phone' => '(62) 99999-9999',
        'avatar' => $faker->imageUrl,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(Permission::class, function () use ($faker) {

    return [
        'name' => $faker->name,
        'slug' => $faker->unique()->slug,
        'description' => $faker->text
    ];
});

$factory->define(Crianca::class, function () use ($faker) {
    return [
        'nome' => $faker->name,
        'dt_nascimento' => $faker->dateTimeBetween('-18 years', '-2 years'),
        'filiacao' => $faker->name,
        'responsavel' => $faker->name,
        'grau_parentesco' => $faker->word,
        'processo' => $faker->word,
        'comarca' => 'Anápolis-GO'
    ];
});