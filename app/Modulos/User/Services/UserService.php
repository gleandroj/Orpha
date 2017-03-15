<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/09/2016
 * Time: 13:42
 */

namespace App\Modulos\User\Services;

use App\Modulos\User\Models\User;
use App\Modulos\User\Contracts\UserRepositoryInterface;
use App\Modulos\User\Contracts\UserServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Intervention\Image\Facades\Image;

class UserService implements UserServiceInterface
{
    /**
     * @var UserRepositoryInterface
     */
    private $userRepository;

    /**
     * UserService constructor.
     * @param UserRepositoryInterface $userRepository
     */
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @return User|\Illuminate\Contracts\Auth\Authenticatable
     */
    protected function getCurrentUser(){
        return Auth::user();
    }

    /**
     * @return Collection|User
     */
    public function getAll()
    {
        return $this->userRepository->getAll();
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @param $id
     * @return User|\Illuminate\Database\Eloquent\Model
     */
    public function getById($id)
    {
        if(!$user = $this->userRepository->getById($id)) throw (new ModelNotFoundException())->setModel(User::class);
        return $user;
    }

    /**
     * @param array $data
     * @return mixed
     * @throws \Exception
     */
    public function create(array $data)
    {
        $data = collect($data);

        if($data->has('avatar') && $data->get('avatar') != null){
            $data['avatar'] = $this->uploadBase64Img($data['avatar']);
        }

        $data->put('password', bcrypt($data['password']));
        $data->put('orfanato_id', $this->getCurrentUser()->orfanato_id);

        $user = $this->userRepository->create($data->all());

        if(!$user) throw new \Exception(trans('messages.MSG4'));
        else{
            $permissions = collect($data->get('permissions'));

            $permissions = $permissions->map(function ($item, $key){
                return $item['id'];
            });

            $user->permissions()->sync(collect($permissions)->all());

            return $user->fresh();
        }
    }

    /**
     * @param $id
     * @param array $data
     * @return User|\Illuminate\Database\Eloquent\Model
     * @throws \Exception
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

        if(!$user) throw new \Exception(trans('messages.MSG4'));
        else {
            $permissions = collect($data->get('permissions'));

            $permissions = $permissions->map(function ($item, $key){
                return $item['id'];
            });

            $user->permissions()->sync(collect($permissions)->all());

            return $user->fresh();
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Exception
     */
    public function delete($id)
    {
        if(!$deleted = $this->userRepository->delete($id)) throw new \Exception(trans('messages.MSG4'));
        return $deleted;
    }

    /**
     * @param $id
     * @return User
     * @throws \Exception
     */
    public function restore($id)
    {
        if(!$restored = $this->userRepository->restore($id)) throw new \Exception(trans('messages.MSG4'));
        return $restored;
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function checkEmail(array $data)
    {
        Validator::make($data, [
            'email' => [
                'required',
                Rule::unique('users')->ignore($data['user_id'], 'id')
            ]
        ])->validate();
    }

    /**
     * @param $base64
     * @return string
     */
    private function uploadBase64Img($base64){

        $image = Image::make($base64);

        $file_name = '\images\profile\\'.$this->newGuid().'.jpg';

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