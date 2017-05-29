<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/05/2017
 * Time: 13:12
 */

namespace App\Modulos\Pia\Contracts;


interface DadosNecessidadesServiceInterface
{
    /**
     * @param $id
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function update($criancaId, array $data);
}