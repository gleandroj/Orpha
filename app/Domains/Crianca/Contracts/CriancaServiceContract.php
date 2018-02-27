<?php

namespace Orpha\Domains\Crianca\Contracts;

use Orpha\Domains\Crianca\Models\Crianca;

interface CriancaServiceContract
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