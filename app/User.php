<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'phone', 'avatar'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'pivot'
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function assignRole($role)
    {
        if(is_string($role))
        {
            return $this->roles()->save($role);

        }

        return $this->roles()->save(
            Role::whereName($role)->first()
        );
    }

    public function hasRole($role)
    {
        if(is_string($role))
        {
            return $this->roles->contains('slug', $role);
        }

        if(is_array($role))
        {
            return in_array($role, array_fetch($this->roles->toArray(), 'slug'));
        }

        return false;
    }
}
