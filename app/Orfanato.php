<?php

namespace App;

use App\Modulos\Crianca\Models\Crianca;
use App\Modulos\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Orfanato extends Model
{
    use SoftDeletes;

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
