<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/09/2016
 * Time: 13:38
 */

namespace App\Repositories;

use App\Contracts\UnitOfWork;
use App\Exceptions\ApiException;
use App\User;

class UserRepository extends AbstractRepository implements \App\Contracts\UserRepository
{
    public function __construct(User $model, UnitOfWork $uow)
    {
        parent::__construct($model, $uow);
    }

    /**
     * @return mixed
     * @throws ApiException
     */
    public function getAll()
    {
        try{
            return $this->model->withTrashed()->get();
        }catch (\Exception $e){
            throw new ApiException(trans('messages.MSG4'));
        }
    }

    /**
     * @param $id
     * @return mixed
     * @throws ApiException
     */
    public function getById($id)
    {
        try{
            return $this->model->withTrashed()->where('id', $id)->first();
        }catch (\Exception $e){
            throw new ApiException(trans('messages.MSG4'));
        }
    }
}