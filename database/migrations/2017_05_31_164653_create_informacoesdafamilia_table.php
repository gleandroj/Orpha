<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInformacoesdafamiliaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('informacoes_familia', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('pia_id')->unsigned();
            $table->foreign('pia_id')->references('id')->on('pia');

            $table->boolean('atendimento_realizado_acolhimento')->default(0)->nullable();
            $table->boolean('atendimento_realizado_encaminhado_grupo_pais_responsaveis')->default(0)->nullable();
            $table->boolean('atendimento_realizado_esclarecimento_fluxo_processo')->default(0)->nullable();
            $table->boolean('atendimento_realizado_orientacao_sobre_medidas_socioeducativas')->default(0)->nullable();
            $table->string('atendimento_realizado_outros')->nullable();
            $table->boolean('atendimento_realizado_completado')->default(0)->nullable();

            $table->boolean('orientacao_realizada_direitos_legais')->default(0)->nullable();
            $table->boolean('orientacao_realizada_direitos_providenciario')->default(0)->nullable();
            $table->boolean('orientacao_realizada_direitos_sociai')->default(0)->nullable();
            $table->boolean('orientacao_realizada_educacao_formal')->default(0)->nullable();
            $table->boolean('orientacao_realizada_educacao_profissional')->default(0)->nullable();
            $table->string('orientacao_realizada_outros')->nullable();
            $table->boolean('orientacao_realizada_completado')->default(0)->nullable();

            $table->boolean('orientacao_realizada_planejamento_familiar')->default(0)->nullable();
            $table->boolean('orientacao_realizada_planejamento_orcamentario')->default(0)->nullable();

            $table->boolean('rede_apoio2_atendimento_social')->default(0)->nullable();
            $table->boolean('rede_apoio2_bolsa_familia')->default(0)->nullable();
            $table->boolean('rede_apoio2_cesta_basica')->default(0)->nullable();
            $table->boolean('rede_apoio2_custeio_transporte')->default(0)->nullable();
            $table->string('rede_apoio2_custo')->nullable();
            $table->boolean('rede_apoio2_equipamentos')->default(0)->nullable();
            $table->boolean('rede_apoio2_geracao_trabalho_renda')->default(0)->nullable();
            $table->string('rede_apoio2_local_residencia')->nullable();
            $table->string('rede_apoio2_numero_transporte')->nullable();
            $table->string('rede_apoio2_outros')->nullable();
            $table->boolean('rede_apoio2_programas_sociais')->default(0)->nullable();
            $table->boolean('rede_apoio2_completado')->default(0)->nullable();

            $table->boolean('rede_apoio_associacao_moradores')->default(0)->nullable();
            $table->boolean('rede_apoio_atendimento_juridico')->default(0)->nullable();
            $table->boolean('rede_apoio_atendimento_medic')->default(0)->nullable();
            $table->boolean('rede_apoio_atendimento_saude_mental_drogas')->default(0)->nullable();
            $table->boolean('rede_apoio_atendimento_saude_mental_transtorno')->default(0)->nullable();
            $table->boolean('rede_apoio_conselho_tutelar')->default(0)->nullable();
            $table->boolean('rede_apoio_programa_protecao')->default(0)->nullable();
            $table->boolean('rede_apoio_completado')->default(0)->nullable();
            $table->string('rede_apoio_outros')->nullable();

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
        if(env('APP_ENV') === 'local' || env('APP_ENV') === 'testing') Schema::dropIfExists('informacoes_familia');
    }
}
