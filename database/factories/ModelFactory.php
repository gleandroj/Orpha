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

$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'phone' => $faker->phoneNumber,
        'avatar' => $faker->imageUrl,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Permission::class, function (Faker\Generator $faker) {

    return [
        'name' => $faker->name,
        'slug' => $faker->unique()->slug,
        'description' => $faker->text
    ];
});

$factory->define(App\Crianca::class, function (Faker\Generator $faker) {
    return [
        'nome' => $faker->name,
        'dt_nascimento' => $faker->dateTime,
        'filiacao' => $faker->name,
        'responsavel' => $faker->name,
        'grau_parentesco' => $faker->word,
        'processo' => $faker->word,
        'comarca' => 'Anápolis-GO'
    ];
});