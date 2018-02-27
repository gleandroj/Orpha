<?php

namespace Orpha\Domains\Auth\Models;

use Orpha\Domains\User\Models\User;
use Orpha\Support\Models\Model;

class Permission extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'modulo', 'slug', 'description'
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
     * 
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
