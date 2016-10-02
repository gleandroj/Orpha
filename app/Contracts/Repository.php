<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/09/2016
 * Time: 13:27
 */

namespace App\Contracts;


interface Repository
{
    /**
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getAll();

    /**
     * The attributes that should be hidden for arrays.
     *
     * @param $id
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function getById($id);

    /**
     * @param array $data
     * @return $data
     */
    public function create(array $data);

    /**
     * @param $id
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function update($id, array $data);

    /**
     * @param $id
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function delete($id);

    /**
     * @param $id
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function restore($id);
}