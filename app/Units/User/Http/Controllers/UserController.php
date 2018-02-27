<?php

namespace Orpha\Units\User\Http\Controllers;

use Orpha\Domains\User\Models\User;
use Orpha\Domains\User\Contracts\UserServiceContract;
use Orpha\Support\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * @var UserServiceContract
     */
    private $userService;

    /**
     * UserController constructor.
     * @param UserServiceContract $userService
     */
    public function __construct(UserServiceContract $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return User|Collection|\Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorizeForUser($this->getCurrentUser(), 'index', User::class);
        return $this->userService->getAll();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return User|\Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorizeForUser($this->getCurrentUser(), 'create', User::class);
        $this->validate($request, [
            'name' => 'required|max:50',
            'email' => 'required|email|max:40|unique:users,email',
            'phone' => ['required','max:20', 'regex:/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/'],
            'password' => 'required|confirmed|min:8|max:14',
            'permissions.*.id' => 'required|exists:permissions,id',
            'avatar' => 'avatar',
        ]);

        return response()->json($this->userService->create($request->all())->toArray(), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return User|\Illuminate\Http\Response
     * @internal param int $id
     */
    public function show(User $user)
    {
        $this->authorizeForUser($this->getCurrentUser(), 'show', $user);
        return $this->userService->getById($user->id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param User $user
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function update(Request $request, User $user)
    {
        $this->authorizeForUser($this->getCurrentUser(), 'update',  $user);
        $this->validate($request, [
            'id' => 'required|exists:users,id',
            'name' => 'required|max:50',
            'email' => 'required|email|max:40|unique:users,email,'.$user->id,
            'phone' => ['required','max:20', 'regex:/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/'],
            'password' => 'confirmed|min:8|max:14',
            'permissions.*.id' => 'required|exists:permissions,id',
            'avatar' => 'avatar',
        ]);
        return $this->userService->update($user->id, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return User|\Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $this->authorizeForUser($this->getCurrentUser(), 'delete', $user);
        return $this->userService->delete($user->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return User|Response
     * @internal param $id
     */
    public function restore(User $user)
    {
        $this->authorizeForUser($this->getCurrentUser(), 'active', $user);
        return $this->userService->restore($user->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function checkEmail(Request $request)
    {
        return $this->userService->checkEmail($request->all());
    }
}
