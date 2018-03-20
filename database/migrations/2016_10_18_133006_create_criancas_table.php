<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCriancasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('criancas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome', 50);
            $table->dateTime('dt_nascimento');
            $table->string('filiacao', 50);
            $table->string('responsavel', 50);
            $table->string('grau_parentesco', 50);
            $table->string('processo', 20);
            $table->string('comarca', 50);

            $table->integer('orfanato_id')->unsigned();
            $table->foreign('orfanato_id')->references('id')->on('orfanatos');

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
        if(env('APP_ENV') === 'local' || env('APP_ENV') === 'testing') Schema::dropIfExists('criancas');
    }
}
