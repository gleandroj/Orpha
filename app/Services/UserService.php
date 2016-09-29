<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/09/2016
 * Time: 13:42
 */

namespace App\Services;


class UserService implements \App\Contracts\UserService
{
    /**
     * @var \App\Contracts\UserRepository
     */
    private $userRepository;

    /**
     * UserService constructor.
     * @param \App\Contracts\UserRepository $userRepository
     */
    public function __construct(\App\Contracts\UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection|\App\User
     */
    public function getAll()
    {
        return $this->userRepository->getAll();
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @param $id
     * @return \App\User
     */
    public function getById($id)
    {
        return $this->userRepository->getById($id);
    }

    /**
     * @param array $data
     * @return \App\User
     */
    public function create(array $data)
    {
        return $this->userRepository->create($data);
    }

    /**
     * @param $id
     * @return bool|null
     * @throws \Exception
     */
    public function delete($id)
    {
        return $this->userRepository->delete($id);
    }

    /**
     * @param $id
     * @param array $data
     * @return bool
     */
    public function update($id, array $data)
    {
        return $this->userRepository->update($id, $data);
    }
}