<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrfanatoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orfanatos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome', 50)->unique();
            $table->string('endereco', 100);
            $table->string('cidade', 50);
            $table->string('estado', 50);
            $table->string('cep', 50);
            $table->string('cnpj', 50)->unique();
            $table->string('telefone', 50);
            $table->string('email', 50)->nullable()->unique();
            $table->string('responsavel', 50);
            $table->string('responsavel_email', 50);
            $table->string('responsavel_telefone', 50);
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
        if(env('APP_ENV') === 'local' || env('APP_ENV') === 'testing') Schema::dropIfExists('orfanatos');
    }
}
