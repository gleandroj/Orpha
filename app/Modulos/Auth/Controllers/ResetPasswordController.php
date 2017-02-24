<?php

namespace App\Modulos\Auth\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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

        $this->apiValidate($request, $this->rules($request), [trans('messages.MSG12')]);

        $response = $this->broker()->sendResetLink(
            $request->only('email')
        );

        return $response == Password::RESET_LINK_SENT
            ? $this->sendResetLinkResponse($response, $request->only('email'))
            : $this->sendResetLinkFailedResponse($request, $response);
        /*
        try{
            $this->apiValidate($request, $this->getRoles($request), [trans('messages.MSG12')]);

            $response = $this->broker()->sendResetLink(
                $request->only('email')
            );

            if ($response === Password::RESET_LINK_SENT) {
                return ['status' => trans($response, $request->only('email'))];
            }

            throw new ApiException(trans($response));

        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            throw new ApiException(trans('messages.MSG12'));
        }*/
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
    protected function rules($request)
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

    private function sendResetLinkResponse($response, $email)
    {
        return ['status' => trans($response, $email)];
    }

    private function sendResetLinkFailedResponse($request, $response)
    {
        return (new ApiException(trans($response), ApiException::unknown, 404))->getHttpResponse();
    }
}
