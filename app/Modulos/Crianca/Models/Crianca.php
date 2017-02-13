<?php

namespace App\Modulos\Crianca\Models;

use App\Orfanato;
use App\Traits\OrfanatoQuery;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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

    public function getIdadeAttribute()
    {
        return  Carbon::now()->diffInYears($this->dt_nascimento);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function orfanato()
    {
        return $this->belongsTo(Orfanato::class);
    }
}
