<?php

namespace Orpha\Domains\Pia\Models;

use Orpha\Domains\Crianca\Models\Crianca;
use Orpha\Support\Models\Model;

class Pia extends Model
{
    protected $table = 'pia';

    protected $fillable = [
        'completado'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasOne
     */
    public function informacoesFamilia(){
        return $this->hasOne(InformacoesFamilia::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasOne
     */
    public function dadosNecessidades(){
        return $this->hasOne(DadosNecessidades::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasOne
     */
    public function atividadesSocioeducativas(){
        return $this->hasOne(AtividadesSocioeducativas::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function crianca(){
        return $this->hasOne(Crianca::class);
    }

}