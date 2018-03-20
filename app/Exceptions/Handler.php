<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        \League\OAuth2\Server\Exception\OAuthServerException::class,
        \Illuminate\Auth\AuthenticationException::class,
        \Illuminate\Auth\Access\AuthorizationException::class,
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
        \Illuminate\Database\Eloquent\ModelNotFoundException::class,
        \Illuminate\Session\TokenMismatchException::class,
        \Illuminate\Validation\ValidationException::class
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        $sendJson = (($request->wantsJson() || $request->ajax()) || str_contains($request->url(), 'api'));

        if($exception instanceof NotFoundHttpException && $sendJson){
            return (new ExceptionResponse(trans('messages.MSG19'), Response::HTTP_NOT_FOUND))->getHttpResponse();
        }elseif($exception instanceof ModelNotFoundException && $sendJson){
            return (new ExceptionResponse(trans('messages.MSG8'), Response::HTTP_NOT_FOUND))->getHttpResponse();
        }elseif($exception instanceof AuthorizationException && $sendJson){
            return (new ExceptionResponse(trans('messages.MSG17'), Response::HTTP_FORBIDDEN))->getHttpResponse();
        }elseif ($exception instanceof AuthenticationException) {
            return $this->unauthenticated($request, $exception, $sendJson);
        }elseif ($exception instanceof ValidationException) {
            return (new ExceptionResponse(trans('messages.MSG20'), Response::HTTP_UNPROCESSABLE_ENTITY, $exception->validator))->getHttpResponse();
        }elseif ($exception instanceof HttpResponseException && $sendJson){
            return (new ExceptionResponse($exception->getMessage(), $exception->getStatusCode()))->getHttpResponse();
        }elseif(!$sendJson){
            return response()->view('errors.404', ['exception' => $exception->getMessage()], Response::HTTP_NOT_FOUND);
        }

        return parent::render($request, $exception);
    }

    /**
     * Convert an authentication exception into an unauthenticated response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Illuminate\Http\JsonResponse
     */
    protected function unauthenticated($request, AuthenticationException $exception, $sendJson = false)
    {
        if ($sendJson) {
            return (new ExceptionResponse(trans('messages.MSG17'), 401))->getHttpResponse();
        }

        return redirect()->guest('/');
    }
}
