/**
 * Created by FG0003 on 23/12/2016.
 */
const elixir = require('laravel-elixir');
require('laravel-elixir-webpack-official');
require('laravel-elixir-browsersync-official');
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application as well as publishing vendor resources.
 |
 */

elixir((mix) => {
    mix.webpack('index.js');
    mix.browserSync({
        proxy: 'orpha.dev:8000'
    });
});