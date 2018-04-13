<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 31/05/2017
 * Time: 13:37
 */

namespace Orpha\Domains\Pia\Contracts;

use Orpha\Domains\Pia\Models\Pia;

interface PiaServiceContract
{
    /**
     * @param $criancaId
     * @return \Illuminate\Database\Eloquent\Model|Pia
     */
    public function getPiaByCriancaId($criancaId);
}