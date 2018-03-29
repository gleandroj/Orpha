<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAtividadessocioeducativasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('atividades_socio_educativas', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('pia_id')->unsigned();
            $table->foreign('pia_id')->references('id')->on('pia');

            $table->boolean('educacao_cidadania_coletividade')->default(0)->nullable();
            $table->boolean('educacao_cidadania_constituicao_federal')->default(0)->nullable();
            $table->boolean('educacao_cidadania_eca_direitos_deveres')->default(0)->nullable();
            $table->boolean('educacao_cidadania_empreendedorismo')->default(0)->nullable();
            $table->boolean('educacao_cidadania_familia')->default(0)->nullable();
            $table->boolean('educacao_cidadania_orientacao_medidas_socioeducativas')->default(0)->nullable();
            $table->boolean('educacao_cidadania_orientacao_mundo_trabalho')->default(0)->nullable();
            $table->boolean('educacao_cidadania_orientacao_processo_escolarizacao')->default(0)->nullable();
            $table->boolean('educacao_cidadania_reflexao_ato_infracional')->default(0)->nullable();
            $table->string('educacao_cidadania_outros')->nullable();
            $table->boolean('educacao_cidadania_completado')->default(0)->nullable();

            $table->boolean('educacao_meioambiente_material_reciclavel')->default(0)->nullable();
            $table->boolean('educacao_meioambiente_poluicao_cuidados')->default(0)->nullable();
            $table->boolean('educacao_meioambiente_sustentabilidade')->default(0)->nullable();
            $table->boolean('educacao_meioambiente_completado')->default(0)->nullable();

            $table->boolean('educacao_saude_alimentacao')->default(0)->nullable();
            $table->boolean('educacao_saude_cuidado_higiene_pessoal')->default(0)->nullable();
            $table->boolean('educacao_saude_exame_preventivo_periodico')->default(0)->nullable();
            $table->boolean('educacao_saude_metodos_contraceptivos')->default(0)->nullable();
            $table->boolean('educacao_saude_paternidade')->default(0)->nullable();
            $table->boolean('educacao_saude_programa_hanseniase')->default(0)->nullable();
            $table->boolean('educacao_saude_programa_tuberculose')->default(0)->nullable();
            $table->boolean('educacao_saude_saude_bucal')->default(0)->nullable();
            $table->boolean('educacao_saude_saude_mental')->default(0)->nullable();
            $table->boolean('educacao_saude_sexualidade')->default(0)->nullable();
            $table->boolean('educacao_saude_uso_abuso_alcool_drogas')->default(0)->nullable();
            $table->string('educacao_saude_outros')->nullable();
            $table->boolean('educacao_saude_completado')->default(0)->nullable();

            $table->boolean("completado")->default(0)->nullable();

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
        if(env('APP_ENV') === 'local' || env('APP_ENV') === 'testing') Schema::dropIfExists('atividades_socio_educativas');
    }
}
