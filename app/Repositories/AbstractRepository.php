<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/09/2016
 * Time: 13:28
 */

namespace App\Repositories;


use App\Contracts\Repository;

class AbstractRepository implements Repository
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;

    /**
     * AbstractRepository constructor.
     * @param $model
     */
    public function __construct($model)
    {
        $this->model = $model;
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @param $id
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function getById($id)
    {
        return $this->model->find($id);
    }


    /**
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getAll()
    {
        return $this->model->all();
    }

    /**
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function create(array $data)
    {
        return $this->model->create($data);
    }

    /**
     * @param $id
     * @return bool|null
     * @throws \Exception
     */
    public function delete($id)
    {
        return $this->getById($id)->delete();
    }

    /**
     * @param $id
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function update($id, array $data)
    {
        $user = $this->getById($id);
        if($user->update($data)){
            return $user->fresh();
        }
        else{
            return null;
        }
    }
}