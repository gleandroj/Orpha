<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePiaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pia', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('crianca_id')->unsigned();
            $table->foreign('crianca_id')->references('id')->on('criancas');

            $table->boolean('completado')->default(0);

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if(env('APP_ENV') === 'local' || env('APP_ENV') === 'testing') Schema::dropIfExists('pia');
    }
}
