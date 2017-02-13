<?php
/**
 * Created by PhpStorm.
 * User: hc
 * Date: 02/10/16
 * Time: 01:45
 */

namespace App\Exceptions;



use Illuminate\Contracts\Validation\Validator;

class ApiException extends \Exception
{
    const modelNotFound = 'model_not_found';
    const validation = 'validation';
    const unknown = 'unknown';
    const unauthorized = 'unauthorized';
    const unauthenticated = 'unauthenticated';
    const internal = 'internal';

    /**
     * @var int
     */
    private $httpStatusCode;

    /**
     * @var string
     */
    private $errorType;

    /**
     * @var array
     */
    private $errors;

    /**
     * ApiException constructor.
     * @param string $message
     * @param string $errorType
     * @param int $httpStatusCode
     * @param Validator $validator
     */
    public function __construct($message = null, $errorType = ApiException::unknown, $httpStatusCode = 500, Validator $validator = null)
    {
        if(!$message) $message = trans('messages.MSG18');

        parent::__construct($message);

        $this->httpStatusCode = $httpStatusCode;
        $this->errorType = $errorType;

        if($validator){
            $messages = $this->errors = $validator->errors()->messages();
            $this->errors = collect($messages)->map(function ($value, $key){
                return $value[0];
            });
        }
    }

    /**
     * @return int
     */
    public function getHttpStatusCode()
    {
        return $this->httpStatusCode;
    }

    /**
     * @return string
     */
    public function getErrorType()
    {
        return $this->errorType;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function getErrors()
    {
        return $this->errors;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getHttpResponse(){
        if($this->getErrorType() == ApiException::validation)
            return response()->json(['error' => $this->getErrorType(), 'message' => $this->getMessage(), 'errors' => $this->getErrors()], $this->getHttpStatusCode());
        else
            return response()->json(['error' => $this->getErrorType(), 'message' => $this->getMessage()], $this->getHttpStatusCode());
    }
}