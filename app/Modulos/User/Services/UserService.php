<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/09/2016
 * Time: 13:42
 */

namespace App\Modulos\User\Services;

use App\Modulos\User\Models\User;
use App\Exceptions\ApiException;
use App\Modulos\User\Contracts\UserRepositoryInterface;
use App\Modulos\User\Contracts\UserServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;

class UserService implements UserServiceInterface
{
    /**
     * @var UserRepositoryInterface
     */
    private $userRepository;

    /**
     * @var User
     */
    private $user;

    /**
     * UserService constructor.
     * @param UserRepositoryInterface $userRepository
     * @throws ApiException
     */
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->user = Auth::user();
    }

    /**
     * @return Collection|User
     */
    public function getAll()
    {
        return $this->userRepository->getAll()->load('permissions');
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @param $id
     * @return User|\Illuminate\Database\Eloquent\Model
     * @throws ApiException
     */
    public function getById($id)
    {
        if(!$user = $this->userRepository->getById($id)) throw new ApiException(trans('messages.MSG8'), ApiException::modelNotFound, 404);
        return $user->load('permissions');
    }

    /**
     * @param array $data
     * @return mixed
     * @throws ApiException
     */
    public function create(array $data)
    {
        $data = collect($data);

        if($data->has('avatar')){
            $data['avatar'] = $this->uploadBase64Img($data['avatar']);
        }

        $data->put('password', bcrypt($data['password']));
        $data->put('orfanato_id', $this->user->orfanato_id);

        $user = $this->userRepository->create($data->all());

        if(!$user) throw new ApiException(trans('messages.MSG4'));
        else{
            $permissions = collect($data->get('permissions'));

            $permissions = $permissions->map(function ($item, $key){
                return $item['id'];
            });

            $user->permissions()->sync(collect($permissions)->all());

            return $user->load('permissions');
        }
    }

    /**
     * @param $id
     * @param array $data
     * @return User|\Illuminate\Database\Eloquent\Model
     * @throws ApiException
     */
    public function update($id, array $data)
    {
        $data = collect($data);

        if($data->has('avatar') && $data->get('avatar') != null && $this->getById($id)->avatar != $data->get('avatar')){
            $data['avatar'] = $this->uploadBase64Img($data['avatar']);
        }

        if($data->has('password')){
            $data['password'] = bcrypt($data['password']);
        }

        $user = $this->userRepository->update($id, $data->all());

        if(!$user) throw new ApiException(trans('messages.MSG4'));
        else {
            $permissions = collect($data->get('permissions'));

            $permissions = $permissions->map(function ($item, $key){
                return $item['id'];
            });

            $user->permissions()->sync(collect($permissions)->all());

            return $user->load('permissions');
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Exception
     */
    public function delete($id)
    {
        if(!$deleted = $this->userRepository->delete($id)) throw new ApiException(trans('messages.MSG4'), ApiException::internal, 500);
        return $deleted;
    }

    /**
     * @param $id
     * @return User
     * @throws \Exception
     */
    public function restore($id)
    {
        if(!$restored = $this->userRepository->restore($id)) throw new ApiException(trans('messages.MSG4'), ApiException::internal, 500);
        return $restored;
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function checkEmail(array $data)
    {
        \validator::make($data, [
            'email' => 'required|email|unique:users,email'
        ])->validate();
    }

    /**
     * @param $base64
     * @return string
     */
    private function uploadBase64Img($base64){
        $image = Image::make($base64);

        $file_name = '/assets/profile/'.$this->newGuid().'.png';

        $image->save(public_path().$file_name);

        return $file_name;
    }

    /**
     * @return string
     */
    private function newGuid() {
        $s = strtoupper(md5(uniqid(rand(),true)));
        $guidText =
            substr($s,0,8) . '-' .
            substr($s,8,4) . '-' .
            substr($s,12,4). '-' .
            substr($s,16,4). '-' .
            substr($s,20);
        return $guidText;
    }

}