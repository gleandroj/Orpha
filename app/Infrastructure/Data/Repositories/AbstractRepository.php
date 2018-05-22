<?php

namespace Orpha\Infrastructure\Data\Repositories;

use Orpha\Support\Repositories\RepositoryContract;
use Orpha\Support\Repositories\UnitOfWorkContract;
use Illuminate\Database\Eloquent\Model;

class AbstractRepository implements RepositoryContract
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var Model
     */
    protected $model;

    /**
     * @var UnitOfWorkContract
     */
    private $uow;

    /**
     * AbstractRepository constructor.
     * @param User $model
     * @param UnitOfWorkContract $uow
     */
    public function __construct(Model $model, UnitOfWorkContract $uow)
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
     * @return Model
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
     * @return Model
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
     * @return Model
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