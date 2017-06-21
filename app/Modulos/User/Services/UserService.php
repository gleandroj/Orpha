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
use Illuminate\Support\Facades\Storage;
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

        $data->put('password', bcrypt($data['password']));
        $data->put('orfanato_id', $this->getCurrentUser()->orfanato_id);

        if(!$user = $this->userRepository->create($data->except('avatar')->all()))
            throw new \Exception(trans('messages.MSG4'));

        if($data->has('avatar') && $data->get('avatar') != null)
            $user->avatar = $this->uploadBase64Img($data['avatar'], 'users/avatars/'.$user->id);

        $permissions = collect($data->get('permissions'))->pluck('id');

        $user->permissions()->sync(collect($permissions)->all());

        $user->save();

        return $user->fresh();
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
        $oldUser = $this->getById($id);

        if($data->has('password'))
            $data['password'] = bcrypt($data['password']);

        if(!$user = $this->userRepository->update($id, $data->except('avatar')->all()))
            throw new \Exception(trans('messages.MSG4'));

        if($data->has('avatar') && $data->get('avatar') != null && $oldUser->avatar != $data->get('avatar'))
            $user->avatar = $this->uploadBase64Img($data['avatar'], 'users/avatars/'.$id);

        $permissions = collect($data->get('permissions'))->pluck('id');

        $user->permissions()->sync(collect($permissions)->all());

        $user->save();

        return $user->fresh();
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
     * @return User|\Illuminate\Database\Eloquent\Model
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
     * @param $fileName
     * @return string
     */
    private function uploadBase64Img($base64, $fileName){

        if($fileName == null) throw new \InvalidArgumentException("file name cannot be null");

        $image = Image::make($base64)->encode('jpg');

        Storage::put($fileName, $image->getEncoded(), 'public');

        return Storage::url($fileName).'?timestamp='.round(microtime(true) * 1000);
    }
}