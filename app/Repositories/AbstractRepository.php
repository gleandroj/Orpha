<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/09/2016
 * Time: 13:28
 */

namespace App\Repositories;


use App\Contracts\Repository;
use App\Contracts\UnitOfWork;
use App\Exceptions\ApiException;

class AbstractRepository implements Repository
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
     * @param UnitOfWork $uow
     */
    public function __construct($model, UnitOfWork $uow)
    {
        $this->model = $model;
        $this->uow = $uow;
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @param $id
     * @return \Illuminate\Database\Eloquent\Model
     * @throws ApiException
     */
    public function getById($id)
    {
        try{
            return $this->model->find($id);
        }catch (\Exception $e){
            throw new ApiException(trans('messages.MSG4'));
        }
    }


    /**
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     * @throws ApiException
     */
    public function getAll()
    {
        try{
            return $this->model->all();
        }catch (\Exception $e){
            throw new ApiException(trans('messages.MSG4'));
        }
    }

    /**
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Model
     * @throws ApiException
     */
    public function create(array $data)
    {
        $this->uow->begin();
        try{
            $newModel = $this->model->create($data);
            $this->uow->commit();
            return $newModel;
        }catch (\Exception $e){
            throw new ApiException(trans('messages.MSG4'));
        }
    }

    /**
     * @param $id
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Model
     * @throws ApiException
     */
    public function update($id, array $data)
    {
        $this->uow->begin();
        $user = $this->getById($id);
        $updated = false;
        try{
            $updated = $user->update($data);
        }catch (\Exception $e){
            throw new ApiException(trans('messages.MSG4'));
        }finally{
            if($updated){
                $this->uow->commit();
                return $user->fresh();
            }
            else{
                throw new ApiException(trans('messages.MSG4'));
            }
        }
    }

    /**
     * @param $id
     * @return bool|null
     * @throws ApiException
     */
    public function delete($id)
    {
        $this->uow->begin();
        $user = $this->getById($id);

        if($user->delete()){
            $this->uow->commit();
            return $user;
        }
        else{
            throw new ApiException(trans('messages.MSG4'));
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Database\Eloquent\Model
     * @throws ApiException
     */
    public function restore($id)
    {
        $this->uow->begin();

        if($this->model->withTrashed()->where('id', $id)->restore()){
            $this->uow->commit();
            return $this->getById($id);
        }
        else{
            throw new ApiException(trans('messages.MSG4'));
        }
    }
}