<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/09/2016
 * Time: 13:42
 */

namespace App\Modulos\User\Contracts;


use App\Modulos\User\Models\User;

interface UserServiceInterface
{
    /**
     * @return \Illuminate\Database\Eloquent\Collection|User
     */
    public function getAll();

    /**
     * The attributes that should be hidden for arrays.
     *
     * @param $id
     * @return User
     */
    public function getById($id);

    /**
     * @param array $data
     * @return User
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
     * @return User
     * @throws \Exception
     */
    public function delete($id);

    /**
     * @param $id
     * @return User
     * @throws \Exception
     */
    public function restore($id);

    /**
     * @param array $data
     * @return mixed
     */
    public function checkEmail(array $data);
}