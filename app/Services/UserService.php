<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/09/2016
 * Time: 13:42
 */

namespace App\Services;

use App\Contracts\UserRepository;
use App\Exceptions\ApiException;
use App\Mail\PasswordResetMail;
use App\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Mail;
use Intervention\Image\Facades\Image;

class UserService implements \App\Contracts\UserService
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * UserService constructor.
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection|\App\User
     */
    public function getAll()
    {
        return $this->userRepository->getAll()->load('permissions');
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @param $id
     * @return \App\User|\Illuminate\Database\Eloquent\Model
     */
    public function getById($id)
    {
        if(!$user = $this->userRepository->getById($id))
            throw (new ModelNotFoundException())->setModel('usuário', $id);
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

        validator($data->all(), [
            'name' => 'required|max:50',
            'email' => 'required|email|max:40|unique:users,email',
            'phone' => ['required','max:20', 'regex:/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/'],
            'password' => 'required|confirmed|min:8|max:14',
            'permissions.*.id' => 'required|exists:permissions,id',
            'avatar' => 'avatar',
        ])->validate();

        if($data->has('avatar')){
            $data['avatar'] = $this->uploadBase64Img($data['avatar']);
        }

        $data['password'] = bcrypt($data['password']);

        $user = $this->userRepository->create($data->all());

        if($user){

            $permissions = collect($data->get('permissions'));

            $permissions = $permissions->map(function ($item, $key){
                return $item['id'];
            });

            $user->permissions()->sync(collect($permissions)->all());

            return $user->load('permissions');
        }
        else{
            throw new ApiException(trans('messages.MSG4'));
        }
    }

    /**
     * @param $id
     * @param array $data
     * @return $this
     * @throws ApiException
     */
    public function update($id, array $data)
    {
        $data = collect($data);
        $data->put('id', $id);

        validator($data->all(), [
            'id' => 'required|exists:users,id',
            'name' => 'required|max:50',
            'email' => 'required|email|max:40|unique:users,email,'.$id,
            'phone' => ['required','max:20', 'regex:/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/'],
            'password' => 'confirmed|min:8|max:14',
            'permissions.*.id' => 'required|exists:permissions,id',
            'avatar' => 'avatar',
        ])->validate();

        if($data->has('avatar')
            && $data->get('avatar') != null
            && $this->getById($id)->avatar != $data->get('avatar')){
            $data['avatar'] = $this->uploadBase64Img($data['avatar']);
        }

        if($data->has('password')){
            $data['password'] = bcrypt($data['password']);
        }

        $user = $this->userRepository->update($id, $data->all());

        if($user){

            $permissions = collect($data->get('permissions'));

            $permissions = $permissions->map(function ($item, $key){
                return $item['id'];
            });

            $user->permissions()->sync(collect($permissions)->all());

            return $user->load('permissions');
        }else{
            throw new ApiException(trans('messages.MSG4'));
        }

    }

    /**
     * @param $id
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Exception
     */
    public function delete($id)
    {
        return $this->userRepository->delete($id);
    }

    /**
     * @param $id
     * @return \App\User
     * @throws \Exception
     */
    public function restore($id)
    {
        return $this->userRepository->restore($id);
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
     * @param array $data
     * @return mixed
     */
    public function sendRestEmail(array  $data)
    {
        $validator = validator($data, [
            'email' => [
                'required',
                'email',
                'max:50',
                Rule::exists('users')->where(function ($query) use ($data) {
                    $query->where('email', $data['email'])->where('deleted_at', null);
                })
            ]
        ]);

        if($validator->fails()){
            return response()->json(['error' => trans('messages.MSG14')], 422);
        }

        if(!$user = $this->userRepository->findByEmail($data['email'])){
            return response()->json(['error' => trans('messages.MSG14')], 422);
        }

        $password = str_random(14);
        $user->password =  bcrypt($password);
        $user->save();

        Mail::to($user)->queue(new PasswordResetMail($password));

        return response()->json(['status' => trans('messages.MSG15', ['email' => $user->email])]);
    }
}