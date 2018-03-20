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
        Schema::create('atividadessocioeducativas', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('pia_id')->unsigned();
            $table->foreign('pia_id')->references('id')->on('pia');

            $table->boolean('educacaoecidadania_coletividade')->default(0)->nullable();
            $table->boolean('educacaoecidadania_constituicao_federal')->default(0)->nullable();
            $table->boolean('educacaoecidadania_eca_direitos_deveres')->default(0)->nullable();
            $table->boolean('educacaoecidadania_empreendedorismo')->default(0)->nullable();
            $table->boolean('educacaoecidadania_familia')->default(0)->nullable();
            $table->boolean('educacaoecidadania_orientacao_medidas_socioeducativas')->default(0)->nullable();
            $table->boolean('educacaoecidadania_orientacao_mundo_trabalho')->default(0)->nullable();
            $table->boolean('educacaoecidadania_orientacao_processo_escolarizacao')->default(0)->nullable();
            $table->boolean('educacaoecidadania_reflexao_ato_infracional')->default(0)->nullable();
            $table->string('educacaoecidadania_outros')->nullable();
            $table->boolean('educacaoecidadania_completado')->default(0)->nullable();

            $table->boolean('educacaoemeioambiente_material_reciclavel')->default(0)->nullable();
            $table->boolean('educacaoemeioambiente_poluicao_cuidados')->default(0)->nullable();
            $table->boolean('educacaoemeioambiente_sustentabilidade')->default(0)->nullable();
            $table->boolean('educacaoemeioambiente_completado')->default(0)->nullable();

            $table->boolean('educacaoesaude_alimentacao')->default(0)->nullable();
            $table->boolean('educacaoesaude_cuidado_higiene_pessoal')->default(0)->nullable();
            $table->boolean('educacaoesaude_exame_preventivo_periodico')->default(0)->nullable();
            $table->boolean('educacaoesaude_metodos_contraceptivos')->default(0)->nullable();
            $table->boolean('educacaoesaude_paternidade')->default(0)->nullable();
            $table->boolean('educacaoesaude_programa_hanseniase')->default(0)->nullable();
            $table->boolean('educacaoesaude_programa_tuberculose')->default(0)->nullable();
            $table->boolean('educacaoesaude_saude_bucal')->default(0)->nullable();
            $table->boolean('educacaoesaude_saude_mental')->default(0)->nullable();
            $table->boolean('educacaoesaude_sexualidade')->default(0)->nullable();
            $table->boolean('educacaoesaude_uso_abuso_alcool_drogas')->default(0)->nullable();
            $table->string('educacaoesaude_outros')->nullable();
            $table->boolean('educacaoesaude_completado')->default(0)->nullable();

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
        if(env('APP_ENV') === 'local' || env('APP_ENV') === 'testing') Schema::dropIfExists('atividadessocioeducativas');
    }
}
