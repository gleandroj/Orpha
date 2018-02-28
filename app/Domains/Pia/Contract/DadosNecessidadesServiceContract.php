<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/05/2017
 * Time: 13:12
 */

namespace Orpha\Domains\Pia\Contracts;

interface DadosNecessidadesServiceContract
{
    /**
     * @param $criancaId
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function getByCriancaId($criancaId);

    /**
     * @param $criancaId
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function update($criancaId, array $data);
}