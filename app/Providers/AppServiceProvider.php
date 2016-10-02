<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        \Validator::extend('avatar', function($attribute, $value, $parameters, $validator) {
            $b64 = '/^(data:image\/(jpeg|png|jpg|gif|bmp);base64)/';
            $url = '/(http(s?):)|([\/|.|\w|\s])*\.(?:jpg|gif|png)/';

            if($value != null){
                return preg_match($b64, $value) || preg_match($url, $value);
            }else{
                return true;
            }
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(\App\Contracts\Repository::class, \App\Repositories\AbstractRepository::class);
        $this->app->bind(\App\Contracts\UserRepository::class, \App\Repositories\UserRepository::class);
        $this->app->bind(\App\Contracts\UserService::class, \App\Services\UserService::class);
    }
}
