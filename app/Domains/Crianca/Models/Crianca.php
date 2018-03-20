<?php

namespace Orpha\Domains\Crianca\Models;

use Orpha\Support\Models\Model;
use Orpha\Infrastructure\Data\Traits\OrfanatoQuery;
use Orpha\Domains\Pia\Models\Pia;
use Carbon\Carbon;

class Crianca extends Model
{
    use OrfanatoQuery;

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
