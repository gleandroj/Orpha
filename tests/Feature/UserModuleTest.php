<?php

namespace Tests\Feature;

use App\Modulos\User\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use TestCase;

class UserModuleTest extends TestCase
{
    use DatabaseMigrations;

    public function initialize(){
        $this->seed('OrphaDbSeed');

        $user = User::find(1);
        $this->be($user, 'api');
    }

    public function testCurrentUser(){
        $this->initialize();

        $this->json('GET', 'api/auth/current')
            ->assertStatus(200)
            ->assertSee('admin@orpha.com.br');
    }

    public function testGetAll(){
        $this->initialize();

        $this->json('GET', 'api/users')
            ->assertStatus(200)
            ->assertJsonStructure([
                '*' => [
                    'name', 'email', 'phone', 'avatar', 'orfanato_id',
                    'orfanato' => [
                        'nome'
                    ],
                    'permissions' => [
                        '*' => [
                            'name', 'slug', 'description'
                        ]
                    ]
                ]
            ]);
    }

    public function testCreateUpdateDelete()
    {
        $this->initialize();

        $newUser = $this->json('POST', 'api/users', factory(User::class)->make(['avatar' => '', 'password' => '12345678', 'password_confirmation' => '12345678'])->makeVisible('password')->toArray())
            ->assertStatus(201)
            ->assertJsonStructure([
                'name', 'email', 'phone', 'avatar', 'orfanato_id',
                'orfanato' => [
                    'nome'
                ],
                'permissions' => [
                    '*' => [
                        'name', 'slug', 'description'
                    ]
                ]
            ])->json();

        $getUser = $this->call('GET', 'api/users/' . $newUser['id'])
            ->assertStatus(200)
            ->assertJsonStructure([
                'name', 'email', 'phone', 'avatar', 'orfanato_id',
                'orfanato' => [
                    'nome'
                ],
                'permissions' => [
                    '*' => [
                        'name', 'slug', 'description'
                    ]
                ]
            ])->json();

        $this->assertEquals($newUser['id'], $getUser['id']);

        $getUser['name'] = 'Gabriel Siqueira';

        $this->json('PUT', 'api/users/' . $getUser['id'], $getUser)
            ->assertStatus(200)
            ->assertJsonStructure([
                'name', 'email', 'phone', 'avatar', 'orfanato_id',
                'orfanato' => [
                    'nome'
                ],
                'permissions' => [
                    '*' => [
                        'name', 'slug', 'description'
                    ]
                ]
            ])
            ->assertSee('Gabriel Siqueira');

        $deletedUser = $this->call('DELETE', 'api/users/' . $getUser['id'])
            ->assertStatus(200)
            ->assertJsonStructure([
                'name', 'email', 'phone', 'avatar', 'orfanato_id',
                'orfanato' => [
                    'nome'
                ],
                'permissions' => [
                    '*' => [
                        'name', 'slug', 'description'
                    ]
                ]
            ])->json();

        $this->assertTrue($deletedUser['deleted_at'] != null);

        $deletedUser = $this->call('GET', 'api/users/' . $deletedUser['id'])
            ->assertStatus(200)
            ->assertJsonStructure([
                'name', 'email', 'phone', 'avatar', 'orfanato_id',
                'orfanato' => [
                    'nome'
                ],
                'permissions' => [
                    '*' => [
                        'name', 'slug', 'description'
                    ]
                ]
            ])->json();

        $this->assertTrue($deletedUser['deleted_at'] != null);

        $restoredUser = $this->call('GET', 'api/users/restore/' . $deletedUser['id'])
            ->assertStatus(200)
            ->assertJsonStructure([
                'name', 'email', 'phone', 'avatar', 'orfanato_id',
                'orfanato' => [
                    'nome'
                ],
                'permissions' => [
                    '*' => [
                        'name', 'slug', 'description'
                    ]
                ]
            ])->json();

        $this->assertTrue($restoredUser['deleted_at'] == null);
    }
}
