<?php

namespace Orpha\Domains\User\Contracts;

use Orpha\Domains\User\Models\User;

interface UserServiceContract
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