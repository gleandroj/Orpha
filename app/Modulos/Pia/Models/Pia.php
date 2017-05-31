<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/05/2017
 * Time: 14:05
 */

namespace App\Modulos\Pia\Models;


use App\Modulos\Crianca\Models\Crianca;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pia extends Model
{
    use SoftDeletes;

    protected $table = 'pia';

    protected $fillable = [
        'completado'
    ];

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