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
        factory(App\User::class, 5)->create();
        $adm = App\User::create(['name' => 'Admin', 'email' => 'admin@orpha.com.br', 'password' => Hash::make('123321'), 'phone' => '+5562994372288']);
        $adm->roles()->attach(App\Role::find(1));
    }
}
