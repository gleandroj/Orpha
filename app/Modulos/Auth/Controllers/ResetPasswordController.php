<?php

namespace App\Modulos\Auth\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Exceptions\ApiException;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
use App\Modulos\Auth\Contracts\PasswordRepositoryInterface;

class ResetPasswordController extends Controller
{
    /**
     * @var PasswordRepositoryInterface
     */
    private $passwordRepository;

    /**
     * ResetPasswordController constructor.
     * @param PasswordRepositoryInterface $passwordRepository
     */
    public function __construct(PasswordRepositoryInterface $passwordRepository)
    {
        $this->passwordRepository = $passwordRepository;
    }

    /**
     * @param Request $request
     * @return array
     * @throws ApiException
     */
    public function sendResetLinkEmail(Request $request)
    {
        try{
            $this->apiValidate($request, $this->getRoles($request), [trans('messages.MSG12')]);

            $response = $this->broker()->sendResetLink(
                $request->only('email')
            );

            if ($response === Password::RESET_LINK_SENT) {
                return ['status' => trans($response, $request->only('email'))];
            }

            throw new ApiException(trans($response));

        }catch (\Exception $e){
            throw new ApiException(trans('messages.MSG12'));
        }
    }

    /**
     * @param Request $request
     * @return array
     * @throws ApiException
     */
    public function reset(Request $request)
    {
        $this->apiValidate($request, [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6',
        ]);

        $response = $this->broker()->reset(
            $request->only(
                'email', 'password', 'password_confirmation', 'token'
            ), function ($user, $password) {
                $this->passwordRepository->resetPassword($user, $password);
            }
        );

        if($response == Password::PASSWORD_RESET)
            return ['status' => trans($response)];

        throw new ApiException(trans($response));
    }

    /**
     * @param Request $request
     * @return array
     * @throws ApiException
     */
    public function checkResetToken(Request $request){
        $this->apiValidate($request, [
            'token' => 'required|exists:password_resets'
        ]);

        return ['email' => $this->passwordRepository->getEmailByResetToken($request->get('token')), 'token' => $request->get('token')];
    }

    /**
     * @param $request
     * @return array
     */
    protected function getRoles($request)
    {
        return [
            'email' => [
                'required',
                'email',
                'max:50',
                Rule::exists('users')->where(function ($query) use ($request) {
                    $query->where('email', $request->get('email'))->where('deleted_at', null);
                })
            ]
        ];
    }

    /**
     * @return mixed
     */
    protected function broker()
    {
        return Password::broker();
    }
}
