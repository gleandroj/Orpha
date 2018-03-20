<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 02/03/2017
 * Time: 09:40
 */

namespace App\Exceptions;


use Illuminate\Http\Response;

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
     * @param $validator
     * @return array
     */
    private function formatValidatorErros($validator){
        return collect($validator->errors()->getMessages())->mapWithKeys(function ($value, $key){
                return [$key => $value[0]];
            })->all();
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getHttpResponse(){
        if($this->validator != null)
            return response()->json(['error' => Response::$statusTexts[$this->code] , 'message' => $this->message, 'errors' => $this->formatValidatorErros($this->validator)], $this->code);
        else
            return response()->json(['error' => Response::$statusTexts[$this->code] , 'message' => $this->message, 'errors' => null], $this->code);
    }
}