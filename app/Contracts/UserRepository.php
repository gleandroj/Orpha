<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/09/2016
 * Time: 13:24
 */

namespace App\Contracts;


interface UserRepository extends Repository
{
    /**
     * @return \Illuminate\Database\Eloquent\Collection|\App\User
     */
    public function getAll();

    /**
     * The attributes that should be hidden for arrays.
     *
     * @param $id
     * @return \App\User
     */
    public function getById($id);

    /**
     * @param array $data
     * @return \App\User
     */
    public function create(array $data);

    /**
     * @param $id
     * @return bool|null
     * @throws \Exception
     */
    public function delete($id);

    /**
     * @param $id
     * @param array $data
     * @return bool
     */
    public function update($id, array $data);
}