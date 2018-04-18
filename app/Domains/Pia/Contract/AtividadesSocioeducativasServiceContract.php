<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/05/2017
 * Time: 13:12
 */

namespace Orpha\Domains\Pia\Contracts;

use Orpha\Domains\Pia\Models\AtividadesSocioeducativas;

interface AtividadesSocioeducativasServiceContract
{
    /**
     * @param $criancaId
     * @return \Illuminate\Database\Eloquent\Model|AtividadesSocioeducativas
     */
    public function getByCriancaId($criancaId);

    /**
     * @param $criancaId
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Model|AtividadesSocioeducativas
     */
    public function update($criancaId, array $data);
}