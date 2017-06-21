<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 31/05/2017
 * Time: 13:37
 */

namespace App\Modulos\Pia\Contracts;

use App\Modulos\Pia\Models\Pia;

interface PiaServiceInterface
{
    /**
     * @param $criancaId
     * @return \Illuminate\Database\Eloquent\Model|Pia
     */
    public function getPiaByCriancaId($criancaId);
}