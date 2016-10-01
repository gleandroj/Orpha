<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/09/2016
 * Time: 13:42
 */

namespace App\Services;

use Hash;
use Image;
use Validator;

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
     * @throws \Exception
     */
    public function create(array $data)
    {
        $data = collect($data);

        Validator($data->all(), [
            'name' => 'required|max:50',
            'email' => 'required|email|max:40|unique:users,email',
            'phone' => ['required','max:20', 'regex:/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/'],
            'password' => 'required|confirmed|min:8|max:14',
            'permissions.*.id' => 'required|exists:permissons,id',
            'avatar' => ['regex:/^(data:image\/(jpeg|png|jpg|gif|bmp);base64)/'],
        ])->validate();

        if($data->has('avatar')){
            $data['avatar'] = $this->uploadBase64Img($data['avatar']);
        }

        $data['password'] = Hash::make($data['password']);

        return $this->userRepository->create($data->all());
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

    private function uploadBase64Img($base64){
        $image = Image::make($base64);

        $file_name = '/assets/profile/'.$this->newGuid().'.png';

        $image->save(public_path().$file_name);

        return $file_name;
    }

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
        \Validator::make($data, [
            'email' => 'required|email|unique:users,email'
        ])->validate();
    }
}