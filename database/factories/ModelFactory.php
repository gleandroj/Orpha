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
use App\Modulos\User\Models\User;

$factory->define(User::class, function (Faker\Generator $faker) {
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

$factory->define(Permission::class, function (Faker\Generator $faker) {

    return [
        'name' => $faker->name,
        'slug' => $faker->unique()->slug,
        'description' => $faker->text
    ];
});

$factory->define(Crianca::class, function (Faker\Generator $faker) {
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