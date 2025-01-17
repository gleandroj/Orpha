<?php

namespace App\Modulos\Crianca\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use App\Modulos\Orpha\Traits\OrfanatoQuery;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Modulos\Pia\Models\Pia;

class Crianca extends Model
{
    use SoftDeletes, OrfanatoQuery;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome', 'dt_nascimento', 'filiacao', 'responsavel', 'grau_parentesco', 'processo', 'comarca', 'orfanato_id'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $appends = [
        'idade'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'dt_nascimento',
        'deleted_at'
    ];

    /**
     *  Related Child Pia
     * @return \Illuminate\Database\Eloquent\Relations\HasOne|Pia
     */
    public function pia(){
        return $this->hasOne(Pia::class);
    }

    /**
     *  The Age Attribute
     * @return int
     */
    public function getIdadeAttribute()
    {
        return Carbon::now()->diffInYears($this->dt_nascimento);
    }
}
