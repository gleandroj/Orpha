<?php
/**
 * Created by PhpStorm.
 * Crianca: FG0003
 * Date: 18/10/2016
 * Time: 13:39
 */

namespace App\Modulos\Crianca\Contracts;

use App\Modulos\Crianca\Models\Crianca;

interface CriancaServiceInterface
{
    /**
     * @return \Illuminate\Database\Eloquent\Collection|Crianca
     */
    public function getAll();

    /**
     * The attributes that should be hidden for arrays.
     *
     * @param $id
     * @return Crianca
     */
    public function getById($id);

    /**
     * @param array $data
     * @return Crianca
     */
    public function create(array $data);

    /**
     * @param $id
     * @param array $data
     * @return mixed
     */
    public function update($id, array $data);

    /**
     * @param $id
     * @return Crianca
     * @throws \Exception
     */
    public function delete($id);

    /**
     * @param $id
     * @return Crianca
     * @throws \Exception
     */
    public function restore($id);
}