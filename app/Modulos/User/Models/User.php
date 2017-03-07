<?php

namespace App\Modulos\User\Models;

use App\Modulos\Auth\Models\Permission;
use App\Modulos\Auth\Notifications\ResetPasswordNotification;
use App\Modulos\Orpha\Traits\OrfanatoQuery;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens, SoftDeletes, OrfanatoQuery;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'phone', 'avatar', 'orfanato_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'pivot'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'deleted_at'
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
        'permissions',
        'orfanato'
    ];

    /**
     * User permissions
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class);
    }

    /**
     * @param $slugs
     * @return bool
     */
    public function hasPermission($slugs = []){
        if(!is_array($slugs)) $slugs = [$slugs];
        $permissions = collect($this->permissions)->map(function($value){
            return $value['slug'];
        });
        return $permissions->intersect($slugs)->count() > 0;
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($this->getEmailForPasswordReset(), $token));
    }
}
