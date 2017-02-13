<?php

namespace App\Http\Controllers;

use App\Exceptions\ApiException;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * @param Request $request
     * @param array $rules
     * @param array $messages
     * @param array $customAttributes
     * @throws ApiException
     */
    public function apiValidate(Request $request, array $rules, array $messages = [], array $customAttributes = [])
    {
        $validator = $this->getValidationFactory()->make($request->all(), $rules, $messages, $customAttributes);

        if ($validator->fails()) {
            throw new ApiException(ApiException::validation, ApiException::validation, 422, $validator);
        }
    }

    /**
     * @return \App\Modulos\User\Models\User
     */
    protected function getCurrentUser()
    {
        return Auth::user();
    }
}
