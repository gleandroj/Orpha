<?php

namespace Orpha\Domains\Orfanato\Models;

use Orpha\Domains\Crianca\Models\Crianca;
use Orpha\Domains\User\Models\User;
use Orpha\Support\Models\Model;

class Orfanato extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome'
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
     * Crianças
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function criancas(){
        return $this->hasMany(Crianca::class);
    }

    /**
     * Usuários
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function users(){
        return $this->hasMany(User::class);
    }
}
