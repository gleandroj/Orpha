<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/09/2016
 * Time: 13:28
 */

namespace App\Repositories;


use App\Contracts\RepositoryInterface;
use App\Contracts\UnitOfWorkInterface;

class AbstractRepository implements RepositoryInterface
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;

    /**
     * @var UnitOfWork
     */
    private $uow;

    /**
     * AbstractRepository constructor.
     * @param $model
     * @param UnitOfWorkInterface $uow
     */
    public function __construct($model, UnitOfWorkInterface $uow)
    {
        $this->model = $model;
        $this->uow = $uow;
    }

    /**
     * @return mixed
     */
    public function getAll()
    {
        return $this->model->withTrashed()->get();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getById($id)
    {
        return $this->model->withTrashed()->where('id', $id)->first();
    }

    /**
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function create(array $data)
    {
        $this->uow->begin();
        $newModel = $this->model->create($data);
        $this->uow->commit();
        return $newModel;
    }

    /**
     * @param $id
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function update($id, array $data)
    {
        $this->uow->begin();
        $model = $this->getById($id);

        if($model->update($data)){
            $this->uow->commit();
            return $model;
        }
    }

    /**
     * @param $id
     * @return bool|null
     */
    public function delete($id)
    {
        $this->uow->begin();
        $user = $this->getById($id);

        if($user->delete()){
            $this->uow->commit();
            return $user;
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function restore($id)
    {
        $this->uow->begin();

        if($this->model->withTrashed()->where('id', $id)->restore()){
            $this->uow->commit();
            return $this->getById($id);
        }
    }
}