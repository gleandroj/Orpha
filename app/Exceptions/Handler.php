<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exception\HttpResponseException;
use Illuminate\Validation\ValidationException;
use League\OAuth2\Server\Exception\OAuthServerException;

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
        $isApiRequest = str_contains($request->url(), 'api');

        if($exception instanceof ModelNotFoundException && ($request->wantsJson() || $isApiRequest)){
            return (new ApiException(trans('messages.MSG8'), ApiException::modelNotFound, 404))->getHttpResponse();
        }elseif($exception instanceof ApiException && ($request->wantsJson() || $isApiRequest)){
            return $exception->getHttpResponse();
        }elseif($exception instanceof AuthorizationException && ($request->wantsJson() || $isApiRequest)){
            return (new ApiException(trans('messages.MSG17'), ApiException::unauthorized, 403))->getHttpResponse();
        }elseif(!$request->wantsJson() || !$isApiRequest){
            return response()->view('errors.404', ['exception' => $exception->getMessage()], 404);
        }elseif ($exception instanceof HttpResponseException) {
            return $exception->getResponse();
        } elseif ($exception instanceof AuthenticationException) {
            return $this->unauthenticated($request, $exception);
        } elseif ($exception instanceof ValidationException) {
            return $this->convertValidationExceptionToResponse($exception, $request);
        }elseif($request->wantsJson() || $isApiRequest){
            return (new ApiException())->getHttpResponse();
        }

        return parent::render($request, $exception);
    }

    /**
     * Convert an authentication exception into an unauthenticated response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Illuminate\Http\Response
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson() || $request->ajax() || $request->wantsJson()) {
            return response()->json(['error' => 'unauthorized', 'message' => trans("messages.MSG17")], 401);
        }

        return redirect()->guest('/');
    }
}
