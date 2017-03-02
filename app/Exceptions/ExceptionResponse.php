<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 02/03/2017
 * Time: 09:40
 */

namespace App\Exceptions;


class ExceptionResponse
{
    /**
     * @var null
     */
    private $message;
    /**
     * @var int
     */
    private $code;
    /**
     * @var null
     */
    private $validator;

    /**
     * ExceptionResponse constructor.
     * @param null $message
     * @param int $code
     * @param null $validator
     */
    public function __construct($message = null, $code = 500, $validator = null)
    {
        $this->message = $message;
        $this->code = $code;
        $this->validator = $validator;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getHttpResponse(){
        if($this->validator != null)
            return response()->json(['error' => $this->code, 'message' => $this->message, 'errors' => $this->validator->errors()->getMessages()], $this->code);
        else
            return response()->json(['error' => $this->code, 'message' => $this->message, 'errors' => null], $this->code);
    }
}